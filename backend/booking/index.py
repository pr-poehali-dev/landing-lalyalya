import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    '''
    Принимает заявку на бронирование квартиры и отправляет её в Telegram-бот.
    Args: event - dict с httpMethod, body (имя, телефон, даты, гости, цель)
          context - объект с request_id
    Returns: HTTP-ответ со статусом отправки заявки
    '''
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

    body_data = json.loads(event.get('body') or '{}')
    name = body_data.get('name', '').strip()
    phone = body_data.get('phone', '').strip()
    check_in = body_data.get('checkIn', '').strip()
    check_out = body_data.get('checkOut', '').strip()
    guests = body_data.get('guests', '').strip()
    purpose = body_data.get('purpose', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Заполните имя и контакт'}),
        }

    text = (
        f'🏠 Новая заявка! '
        f'Имя: {name}, Тел: {phone}, Заезд: {check_in}, '
        f'Выезд: {check_out}, Гостей: {guests}, Цель: {purpose}'
    )

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if bot_token and chat_id:
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        payload = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
        req = urllib.request.Request(url, data=payload, method='POST')
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}),
    }
