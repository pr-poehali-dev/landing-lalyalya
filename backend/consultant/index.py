import json
import os
import urllib.request
import urllib.error

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


def handler(event: dict, context) -> dict:
    '''Онлайн ИИ-консультант по вопросам трейла на базе Perplexity.'''
    method = event.get('httpMethod', 'GET')
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    history = body.get('messages', [])

    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
    for m in history[-12:]:
        role = 'assistant' if m.get('role') == 'assistant' else 'user'
        messages.append({'role': role, 'content': str(m.get('content', ''))[:2000]})

    api_key = os.environ['PERPLEXITY']
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
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        reply = data['choices'][0]['message']['content']
    except urllib.error.HTTPError as e:
        return {'statusCode': 502, 'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'ai_error', 'detail': e.read().decode('utf-8')[:300]})}
    except Exception as e:
        return {'statusCode': 502, 'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'ai_error', 'detail': str(e)[:300]})}

    offer_lead = '[[LEAD]]' in reply
    reply = reply.replace('[[LEAD]]', '')
    reply = _clean_markdown(reply)

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'reply': reply, 'offerLead': offer_lead}, ensure_ascii=False),
    }


def _clean_markdown(text: str) -> str:
    '''Убирает Markdown-разметку, чтобы ответ выглядел как живое сообщение.'''
    import re
    # Ссылки [текст](url) -> текст
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    # Жирный/курсив **x**, *x*, __x__, _x_
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    # Заголовки и маркеры списков в начале строк
    lines = []
    for line in text.split('\n'):
        line = re.sub(r'^\s*#{1,6}\s*', '', line)
        line = re.sub(r'^\s*[-*•]\s+', '— ', line)
        lines.append(line)
    text = '\n'.join(lines)
    # Остаточные одиночные звёздочки и решётки
    text = text.replace('**', '').replace('*', '')
    # Сноски-цитаты вида [1], [2]
    text = re.sub(r'\[\d+\]', '', text)
    return text.strip()