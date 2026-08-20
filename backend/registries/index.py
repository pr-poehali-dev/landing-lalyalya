import json
import os
import psycopg2
from seed_data import SEED_DATA

TABLES = {
    'entrepreneurs': {
        'table': 'entrepreneurs',
        'fields': ['name', 'title', 'photo', 'bio'],
        'required': ['name', 'bio'],
    },
    'donors': {
        'table': 'donors',
        'fields': ['name', 'amount', 'role', 'bio', 'photo'],
        'required': ['name'],
    },
    'partners': {
        'table': 'partners',
        'fields': ['name', 'logo'],
        'required': ['name', 'logo'],
    },
    'faq': {
        'table': 'faq_items',
        'fields': ['question', 'answer'],
        'required': ['question', 'answer'],
    },
}

SITE_IMAGE_KEYS = {
    'hero_image': 'Фото на главном экране',
    'monument_image': 'Фото памятного знака',
    'location_image': 'Фото места проведения',
    'org_logo': 'Логотип «ОПОРЫ РОССИИ»',
}


def handler(event: dict, context) -> dict:
    '''CRUD для реестров сайта (предприниматели, доноры, партнёры, FAQ) с управлением через админ-панель'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    def resp(status, body):
        return {
            'statusCode': status,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps(body, ensure_ascii=False, default=str),
        }

    dsn = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    def check_password() -> bool:
        password = (event.get('headers', {}).get('X-Admin-Password') or
                    event.get('headers', {}).get('x-admin-password') or '').strip()
        expected = (os.environ.get('MANAGER_PASSWORD') or '').strip()
        return bool(expected) and password == expected

    params = event.get('queryStringParameters') or {}
    body = json.loads(event.get('body') or '{}')
    registry_type = params.get('type') or body.get('type')

    if registry_type == 'settings':
        settings_table = f'"{schema}".site_settings'
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()

        if method == 'GET':
            cur.execute(f'SELECT key, value FROM {settings_table}')
            rows = dict(cur.fetchall())
            cur.close()
            conn.close()
            items = [
                {'key': k, 'label': label, 'value': rows.get(k, '')}
                for k, label in SITE_IMAGE_KEYS.items()
            ]
            return resp(200, {'items': items})

        if not check_password():
            cur.close()
            conn.close()
            return resp(401, {'error': 'Неверный пароль'})

        if method == 'PUT':
            key = body.get('key')
            value = body.get('value')
            if key not in SITE_IMAGE_KEYS or not value:
                cur.close()
                conn.close()
                return resp(400, {'error': 'Некорректные данные'})
            cur.execute(
                f'INSERT INTO {settings_table} (key, value) VALUES (%s, %s) '
                f'ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
                (key, value),
            )
            conn.commit()
            cur.close()
            conn.close()
            return resp(200, {'success': True})

        cur.close()
        conn.close()
        return resp(405, {'error': 'Method not allowed'})

    if registry_type not in TABLES:
        return resp(400, {'error': 'Некорректный тип реестра'})

    cfg = TABLES[registry_type]
    table = f'"{schema}".{cfg["table"]}'
    fields = cfg['fields']

    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    def seed_if_empty():
        cur.execute(f'SELECT COUNT(*) FROM {table}')
        count = cur.fetchone()[0]
        if count > 0:
            return
        seed_rows = SEED_DATA.get(registry_type) or []
        for row in seed_rows:
            cols = fields + ['sort_order']
            placeholders = ', '.join(['%s'] * len(cols))
            values = [row.get(c) for c in fields] + [row.get('sort_order', 0)]
            cur.execute(
                f'INSERT INTO {table} ({", ".join(cols)}) VALUES ({placeholders})',
                values,
            )
        conn.commit()

    if method == 'GET':
        seed_if_empty()
        cols = ['id'] + fields + ['sort_order']
        cur.execute(f'SELECT {", ".join(cols)} FROM {table} ORDER BY sort_order ASC, id ASC')
        rows = cur.fetchall()
        items = [dict(zip(cols, r)) for r in rows]
        cur.close()
        conn.close()
        return resp(200, {'items': items, 'total': len(items)})

    if not check_password():
        cur.close()
        conn.close()
        return resp(401, {'error': 'Неверный пароль'})

    if method == 'POST':
        for req in cfg['required']:
            if not (body.get(req) or '').strip():
                cur.close()
                conn.close()
                return resp(400, {'error': f'Заполните обязательное поле: {req}'})

        cur.execute(f'SELECT COALESCE(MAX(sort_order), -1) + 1 FROM {table}')
        next_order = cur.fetchone()[0]

        cols = fields + ['sort_order']
        placeholders = ', '.join(['%s'] * len(cols))
        values = [body.get(f) for f in fields] + [body.get('sort_order', next_order)]
        cur.execute(
            f'INSERT INTO {table} ({", ".join(cols)}) VALUES ({placeholders}) RETURNING id',
            values,
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True, 'id': new_id})

    if method == 'PUT':
        try:
            item_id = int(body.get('id'))
        except (TypeError, ValueError):
            cur.close()
            conn.close()
            return resp(400, {'error': 'Некорректный id'})

        for req in cfg['required']:
            if not (body.get(req) or '').strip():
                cur.close()
                conn.close()
                return resp(400, {'error': f'Заполните обязательное поле: {req}'})

        set_fields = fields + (['sort_order'] if 'sort_order' in body else [])
        set_clause = ', '.join([f'{f} = %s' for f in set_fields])
        values = [body.get(f) for f in fields]
        if 'sort_order' in body:
            values.append(body.get('sort_order'))
        values.append(item_id)

        cur.execute(f'UPDATE {table} SET {set_clause} WHERE id = %s', values)
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    if method == 'DELETE':
        raw_id = params.get('id') or body.get('id')
        try:
            item_id = int(raw_id)
        except (TypeError, ValueError):
            cur.close()
            conn.close()
            return resp(400, {'error': 'Некорректный id'})

        cur.execute(f'DELETE FROM {table} WHERE id = %s', (item_id,))
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    cur.close()
    conn.close()
    return resp(405, {'error': 'Method not allowed'})