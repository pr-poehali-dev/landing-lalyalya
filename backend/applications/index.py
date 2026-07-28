import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Приём заявок на участие в церемонии и выдача списка заявок для админ-кабинета'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    dsn = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        first_name = (body.get('first_name') or '').strip()
        last_name = (body.get('last_name') or '').strip()
        phone = (body.get('phone') or '').strip()
        email = (body.get('email') or '').strip()
        consent = bool(body.get('consent'))

        if not first_name or not last_name or not phone or not email:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Заполните все поля'}),
            }
        if not consent:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Необходимо согласие на обработку данных'}),
            }
        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Некорректная почта'}),
            }

        fn = first_name.replace("'", "''")
        ln = last_name.replace("'", "''")
        ph = phone.replace("'", "''")
        em = email.replace("'", "''")

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.ceremony_applications "
            f"(first_name, last_name, phone, email, consent) "
            f"VALUES ('{fn}', '{ln}', '{ph}', '{em}', TRUE) RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'id': new_id}),
        }

    if method == 'GET':
        password = event.get('headers', {}).get('X-Admin-Password') or \
            event.get('headers', {}).get('x-admin-password')
        if password != os.environ.get('MANAGER_PASSWORD'):
            return {
                'statusCode': 401,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Неверный пароль'}),
            }

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, first_name, last_name, phone, email, created_at "
            f"FROM {schema}.ceremony_applications ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        items = [
            {
                'id': r[0],
                'first_name': r[1],
                'last_name': r[2],
                'phone': r[3],
                'email': r[4],
                'created_at': r[5].isoformat() if r[5] else None,
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'items': items, 'total': len(items)}),
        }

    return {
        'statusCode': 405,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'}),
    }
