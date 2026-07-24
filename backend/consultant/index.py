import json
import os
import re
import urllib.request
import urllib.error
import psycopg2

SYSTEM_PROMPT = '''Ты — дружелюбный онлайн-консультант проекта «Великий Дальневосточный Трейл» — первого мультиспортивного маршрута Дальнего Востока России.

Факты о трейле:
- 6 000 км от Тихого океана до вулканов Камчатки
- 6 этапов, 4–6 месяцев пути
- Более 40 трейл-хабов (стоянок) вдоль маршрута
- Способы прохождения: пешком, на велосипеде и на каяке
- Природа: тайга, Колыма, Охотское побережье, вулканы Камчатки

Твоя задача:
1. Отвечай кратко и по делу на вопросы о маршруте, сроках, снаряжении, безопасности, стоимости участия.
2. Будь тёплым и вдохновляющим, но честным. Общайся живо, как настоящий человек в переписке.
3. Пиши обычным текстом без разметки: НЕ используй звёздочки (**), решётки (#), маркеры списков и прочее форматирование Markdown. Только чистый текст и, при желании, эмодзи.
4. НЕ предлагай оставить заявку в каждом сообщении. Спокойно отвечай на вопросы. Предлагай форму связи с менеджером ТОЛЬКО когда:
   - человек прямо говорит, что готов участвовать, записаться, купить, забронировать;
   - человек просит связать его с менеджером или человеком;
   - вопрос сложный/индивидуальный (точная цена, персональный маршрут, организация под конкретную группу), и точно ответить может только живой специалист.
   В этом случае мягко предложи: если вы готовы пообщаться с менеджером — заполните короткую форму, и специалист свяжется с вами и точечно ответит на все вопросы. И только тогда в самом конце ответа добавь на отдельной строке маркер: [[LEAD]]
5. Если человек просто задаёт вопросы и не выражает готовности — НЕ добавляй маркер [[LEAD]] и не навязывай форму.
6. Отвечай на русском языке. Не выдумывай точные цены — при вопросе о точной стоимости предложи связаться с менеджером.'''

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
}


def _resp(status, payload):
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(payload, ensure_ascii=False, default=str),
    }


def _fetch_messages(cur, chat_id):
    cur.execute(
        "SELECT sender, content, created_at FROM chat_messages WHERE chat_id = %s ORDER BY id",
        (chat_id,),
    )
    return [{'sender': r[0], 'content': r[1], 'created_at': r[2]} for r in cur.fetchall()]


def handler(event: dict, context) -> dict:
    '''Онлайн-чат: приём сообщений клиента, ответ ИИ (если включён) и выдача истории для поллинга.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    try:
        params = event.get('queryStringParameters') or {}

        # Поллинг: клиент запрашивает свежие сообщения
        if method == 'GET':
            chat_id = str(params.get('chatId', ''))[:40]
            if not chat_id:
                return _resp(400, {'error': 'chat_id_required'})
            with conn.cursor() as cur:
                cur.execute("SELECT ai_enabled FROM chats WHERE id = %s", (chat_id,))
                row = cur.fetchone()
                ai_enabled = bool(row[0]) if row else True
                msgs = _fetch_messages(cur, chat_id)
            return _resp(200, {'messages': msgs, 'aiEnabled': ai_enabled})

        if method != 'POST':
            return _resp(405, {'error': 'method_not_allowed'})

        body = json.loads(event.get('body') or '{}')
        chat_id = str(body.get('chatId', ''))[:40]
        text = str(body.get('text', '')).strip()[:2000]
        if not chat_id or not text:
            return _resp(400, {'error': 'chat_id_and_text_required'})

        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chats (id) VALUES (%s) ON CONFLICT (id) DO UPDATE SET last_message_at = NOW() "
                "RETURNING ai_enabled",
                (chat_id,),
            )
            ai_enabled = bool(cur.fetchone()[0])
            cur.execute(
                "INSERT INTO chat_messages (chat_id, sender, content) VALUES (%s, 'user', %s)",
                (chat_id, text),
            )

            if not ai_enabled:
                # Отвечает живой менеджер — ИИ молчит
                msgs = _fetch_messages(cur, chat_id)
                return _resp(200, {'messages': msgs, 'aiEnabled': False, 'offerLead': False})

            history = _fetch_messages(cur, chat_id)

        reply, offer_lead = _ask_ai(history)

        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_messages (chat_id, sender, content) VALUES (%s, 'ai', %s)",
                (chat_id, reply),
            )
            cur.execute("UPDATE chats SET last_message_at = NOW() WHERE id = %s", (chat_id,))
            msgs = _fetch_messages(cur, chat_id)

        return _resp(200, {'messages': msgs, 'aiEnabled': True, 'offerLead': offer_lead})
    finally:
        conn.close()


def _ask_ai(history):
    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
    for m in history[-12:]:
        role = 'assistant' if m['sender'] in ('ai', 'manager') else 'user'
        messages.append({'role': role, 'content': str(m['content'])[:2000]})

    payload = json.dumps({
        'model': 'sonar',
        'messages': messages,
        'temperature': 0.5,
        'max_tokens': 700,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.perplexity.ai/chat/completions',
        data=payload,
        headers={
            'Authorization': f"Bearer {os.environ['PERPLEXITY']}",
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        reply = data['choices'][0]['message']['content']
    except Exception:
        return 'Извините, не получилось ответить. Попробуйте ещё раз или свяжитесь с менеджером.', False

    offer_lead = '[[LEAD]]' in reply
    reply = _clean_markdown(reply.replace('[[LEAD]]', ''))
    return reply, offer_lead


def _clean_markdown(text: str) -> str:
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    lines = []
    for line in text.split('\n'):
        line = re.sub(r'^\s*#{1,6}\s*', '', line)
        line = re.sub(r'^\s*[-*•]\s+', '— ', line)
        lines.append(line)
    text = '\n'.join(lines).replace('**', '').replace('*', '')
    text = re.sub(r'\[\d+\]', '', text)
    return text.strip()
