import json
import os
import re
import psycopg2


def handler(event: dict, context) -> dict:
    '''Приём заявок на участие в церемонии и выдача списка заявок для админ-кабинета'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    dsn = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    table = f'"{schema}".ceremony_applications'

    def check_password() -> bool:
        password = (event.get('headers', {}).get('X-Admin-Password') or
                    event.get('headers', {}).get('x-admin-password') or '').strip()
        expected = (os.environ.get('MANAGER_PASSWORD') or '').strip()
        return bool(expected) and password == expected

    def unauthorized():
        return {
            'statusCode': 401,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Неверный пароль'}),
        }

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        first_name = (body.get('first_name') or '').strip()
        last_name = (body.get('last_name') or '').strip()
        phone = (body.get('phone') or '').strip()
        email = (body.get('email') or '').strip()
        consent = bool(body.get('consent'))
        photo_consent = bool(body.get('photo_consent'))

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

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            f'INSERT INTO {table} '
            f'(first_name, last_name, phone, email, consent, photo_consent) '
            f'VALUES (%s, %s, %s, %s, TRUE, %s) RETURNING id',
            (first_name, last_name, phone, email, photo_consent),
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
        if not check_password():
            return unauthorized()

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            f'SELECT id, first_name, last_name, phone, email, photo_consent, created_at '
            f'FROM {table} ORDER BY created_at DESC'
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
                'photo_consent': r[5],
                'created_at': r[6].isoformat() if r[6] else None,
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'items': items, 'total': len(items)}),
        }

    if method == 'PUT':
        if not check_password():
            return unauthorized()

        body = json.loads(event.get('body') or '{}')
        try:
            app_id = int(body.get('id'))
        except (TypeError, ValueError):
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Некорректный id'}),
            }
        first_name = (body.get('first_name') or '').strip()
        last_name = (body.get('last_name') or '').strip()
        phone = (body.get('phone') or '').strip()
        email = (body.get('email') or '').strip()

        if not first_name or not last_name or not phone or not email:
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Заполните все поля'}),
            }
        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Некорректная почта'}),
            }

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            f'UPDATE {table} SET '
            f'first_name = %s, last_name = %s, '
            f'phone = %s, email = %s WHERE id = %s',
            (first_name, last_name, phone, email, app_id),
        )
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True}),
        }

    if method == 'DELETE':
        if not check_password():
            return unauthorized()

        params = event.get('queryStringParameters') or {}
        body = json.loads(event.get('body') or '{}')
        raw_id = params.get('id') or body.get('id')
        try:
            app_id = int(raw_id)
        except (TypeError, ValueError):
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Некорректный id'}),
            }

        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(f'DELETE FROM {table} WHERE id = %s', (app_id,))
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True}),
        }

    return {
        'statusCode': 405,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'}),
    }
