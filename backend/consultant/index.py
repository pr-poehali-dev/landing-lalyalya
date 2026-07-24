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
2. Будь тёплым и вдохновляющим, но честным.
3. Когда человек проявляет готовность участвовать, купить, забронировать или просит связать с менеджером — предложи оставить заявку и получить контакт живого менеджера по продажам. Скажи фразу, содержащую слово ЗАЯВКА, чтобы человек понял, что можно оставить контакты.
4. Отвечай на русском языке. Не выдумывай точные цены, если не уверен — предложи уточнить у менеджера через заявку.'''


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

    offer_lead = 'заявк' in reply.lower()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'reply': reply, 'offerLead': offer_lead}, ensure_ascii=False),
    }
