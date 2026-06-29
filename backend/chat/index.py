import json
import os
import urllib.request
import urllib.error

KNOWLEDGE_BASE = """
Ты — Юра, дружелюбный ИИ-консультант сервиса аренды квартир посуточно «Квартиры у моря» во Владивостоке.
Отвечай вежливо, кратко и по делу, на русском языке. Помогай выбрать квартиру и закрывать сомнения клиента.
Если не знаешь точного ответа — предложи связаться по телефону или в Telegram. Не выдумывай факты.

УСЛОВИЯ ЗАСЕЛЕНИЯ:
- Заселение 24/7 без ключей. Умный замок открывается кодом, который приходит за 1 час до заезда.
- Можно заехать рано утром или поздно ночью — бесконтактное заселение работает круглосуточно.
- Документы для командировки (договор, акт, чек с печатью) выдаём всегда — нужно сообщить при бронировании.
- Если что-то не понравилось — напишите в мессенджер в течение 30 минут, решим вопрос или предложим замену.
- В квартирах: полная кухня, стиральная машина, кофемашина, Smart TV, уборка включена.
- На 30–40% дешевле отеля, без комиссии агрегаторов (Avito, Sutochno), единая поддержка и гарантированное качество.

КАТАЛОГ КВАРТИР И ЦЕНЫ:
1. Студия у моря — ул. Набережная, 12 (Амурский залив). 1 спальное место, 32 м². Кухня, Smart TV, вид на залив, умный замок. Цена: от 3 200 ₽/ночь.
2. Апартаменты в центре — ул. Светланская, 45 (Центр города). 4 спальных места, 54 м². Полная кухня, стиральная машина, кофемашина, парковка. Цена: от 4 800 ₽/ночь.
3. Семейные апартаменты — ул. Морская, 8 (У вокзала). 6 спальных мест, 78 м². 2 спальни, панорамный вид, посудомойка, уборка включена. Цена: от 6 500 ₽/ночь.

КОНТАКТЫ И РЕЖИМ РАБОТЫ:
- Телефон: +7 (423) 200-00-00
- Telegram: @username
- Email: hello@example.ru
- Адрес офиса: г. Владивосток, ул. Светланская, 45
- Поддержка работает 24/7, заселение круглосуточно.

Чтобы забронировать — предложи оставить заявку через форму на сайте (кнопка «Забронировать») или связаться по телефону/Telegram.
"""


def handler(event: dict, context) -> dict:
    """ИИ-консультант сайта: отвечает на вопросы клиентов о квартирах, заселении, ценах и контактах."""
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    history = body.get('messages', [])

    messages = [{'role': 'system', 'content': KNOWLEDGE_BASE}]
    for m in history[-10:]:
        role = m.get('role')
        content = str(m.get('content', ''))[:2000]
        if role in ('user', 'assistant') and content:
            messages.append({'role': role, 'content': content})

    api_key = os.environ.get('PERPLEXITY') or os.environ.get('PERPLEXITY_API_KEY')
    if not api_key:
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps(
                {'reply': 'Извините, консультант временно недоступен. Позвоните нам: +7 (423) 200-00-00.'},
                ensure_ascii=False,
            ),
        }

    payload = json.dumps({
        'model': 'sonar',
        'messages': messages,
        'temperature': 0.5,
        'max_tokens': 500,
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
        reply = data['choices'][0]['message']['content'].strip()
        print(f'Perplexity OK, reply length: {len(reply)}')
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='ignore')
        print(f'Perplexity HTTPError {e.code}: {err_body}')
        reply = 'Извините, не удалось обработать запрос. Напишите нам в Telegram @username или позвоните +7 (423) 200-00-00.'
    except Exception as e:
        print(f'Perplexity request failed: {type(e).__name__}: {e}')
        reply = 'Извините, произошла ошибка. Позвоните нам: +7 (423) 200-00-00.'

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'reply': reply}, ensure_ascii=False),
    }