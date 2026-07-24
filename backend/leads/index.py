import json
import os
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Manager-Password',
    'Access-Control-Max-Age': '86400',
}


def _resp(status, payload):
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(payload, ensure_ascii=False, default=str),
    }


def handler(event: dict, context) -> dict:
    '''Приём заявок клиентов и кабинет менеджера: список и смена статуса заявок.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    dsn = os.environ['DATABASE_URL']
    headers = event.get('headers') or {}
    mgr_pass = os.environ.get('MANAGER_PASSWORD', '')
    given_pass = headers.get('X-Manager-Password') or headers.get('x-manager-password') or ''

    params = event.get('queryStringParameters') or {}
    action = str(params.get('action', ''))
    body = json.loads(event.get('body') or '{}') if method in ('POST', 'PUT') else {}
    body_action = str(body.get('action', ''))

    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    try:
        # Клиент оставляет заявку — без пароля (POST без action)
        if method == 'POST' and not body_action:
            name = str(body.get('name', '')).strip()[:200]
            contact = str(body.get('contact', '')).strip()[:300]
            message = str(body.get('message', '')).strip()[:2000]
            dialog = str(body.get('dialog', '')).strip()[:8000]
            chat_id = str(body.get('chatId', '')).strip()[:40]
            if not name or not contact:
                return _resp(400, {'error': 'name_and_contact_required'})
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO leads (name, contact, message, dialog) VALUES (%s, %s, %s, %s) RETURNING id",
                    (name, contact, message, dialog),
                )
                new_id = cur.fetchone()[0]
                if chat_id:
                    cur.execute("UPDATE chats SET lead_id = %s WHERE id = %s", (new_id, chat_id))
            return _resp(200, {'ok': True, 'id': new_id})

        # Далее — только для менеджера
        if not mgr_pass or given_pass != mgr_pass:
            return _resp(401, {'error': 'unauthorized'})

        # Список активных чатов
        if method == 'GET' and action == 'chats':
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT c.id, c.ai_enabled, c.last_message_at, l.name, l.contact, "
                    "(SELECT content FROM chat_messages m WHERE m.chat_id = c.id ORDER BY m.id DESC LIMIT 1), "
                    "(SELECT COUNT(*) FROM chat_messages m WHERE m.chat_id = c.id) "
                    "FROM chats c LEFT JOIN leads l ON l.id = c.lead_id "
                    "ORDER BY c.last_message_at DESC LIMIT 200"
                )
                rows = cur.fetchall()
            chats = [{
                'id': r[0], 'aiEnabled': r[1], 'lastAt': r[2],
                'name': r[3], 'contact': r[4], 'lastMessage': r[5], 'count': r[6],
            } for r in rows]
            return _resp(200, {'chats': chats})

        # История конкретного чата
        if method == 'GET' and action == 'chat':
            chat_id = str(params.get('chatId', ''))[:40]
            with conn.cursor() as cur:
                cur.execute("SELECT ai_enabled FROM chats WHERE id = %s", (chat_id,))
                row = cur.fetchone()
                if not row:
                    return _resp(404, {'error': 'chat_not_found'})
                cur.execute(
                    "SELECT sender, content, created_at FROM chat_messages "
                    "WHERE chat_id = %s ORDER BY id",
                    (chat_id,),
                )
                msgs = [{'sender': m[0], 'content': m[1], 'created_at': m[2]} for m in cur.fetchall()]
            return _resp(200, {'messages': msgs, 'aiEnabled': row[0]})

        # Менеджер включает/выключает ИИ в чате
        if method == 'POST' and body_action == 'toggle_ai':
            chat_id = str(body.get('chatId', ''))[:40]
            enabled = bool(body.get('aiEnabled', True))
            with conn.cursor() as cur:
                cur.execute("UPDATE chats SET ai_enabled = %s WHERE id = %s", (enabled, chat_id))
            return _resp(200, {'ok': True, 'aiEnabled': enabled})

        # Менеджер отвечает клиенту
        if method == 'POST' and body_action == 'reply':
            chat_id = str(body.get('chatId', ''))[:40]
            text = str(body.get('text', '')).strip()[:2000]
            if not chat_id or not text:
                return _resp(400, {'error': 'chat_id_and_text_required'})
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO chat_messages (chat_id, sender, content) VALUES (%s, 'manager', %s)",
                    (chat_id, text),
                )
                cur.execute("UPDATE chats SET last_message_at = NOW() WHERE id = %s", (chat_id,))
            return _resp(200, {'ok': True})

        if method == 'GET':
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, name, contact, message, dialog, status, created_at "
                    "FROM leads ORDER BY created_at DESC LIMIT 500"
                )
                rows = cur.fetchall()
            leads = [{
                'id': r[0], 'name': r[1], 'contact': r[2], 'message': r[3],
                'dialog': r[4], 'status': r[5], 'created_at': r[6],
            } for r in rows]
            return _resp(200, {'leads': leads})

        if method == 'PUT':
            lead_id = int(body.get('id', 0))
            status = str(body.get('status', '')).strip()[:30]
            if lead_id <= 0 or status not in ('new', 'in_progress', 'done', 'rejected'):
                return _resp(400, {'error': 'bad_request'})
            with conn.cursor() as cur:
                cur.execute("UPDATE leads SET status = %s WHERE id = %s", (status, lead_id))
            return _resp(200, {'ok': True})

        return _resp(405, {'error': 'method_not_allowed'})
    finally:
        conn.close()