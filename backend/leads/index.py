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

    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    try:
        # Клиент оставляет заявку — без пароля
        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            name = str(body.get('name', '')).strip()[:200]
            contact = str(body.get('contact', '')).strip()[:300]
            message = str(body.get('message', '')).strip()[:2000]
            dialog = str(body.get('dialog', '')).strip()[:8000]
            if not name or not contact:
                return _resp(400, {'error': 'name_and_contact_required'})
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO leads (name, contact, message, dialog) VALUES (%s, %s, %s, %s) RETURNING id",
                    (name, contact, message, dialog),
                )
                new_id = cur.fetchone()[0]
            return _resp(200, {'ok': True, 'id': new_id})

        # Далее — только для менеджера
        if not mgr_pass or given_pass != mgr_pass:
            return _resp(401, {'error': 'unauthorized'})

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
            body = json.loads(event.get('body') or '{}')
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
