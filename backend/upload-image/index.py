import base64
import json
import os
import uuid
import boto3


def handler(event: dict, context) -> dict:
    '''Загрузка изображения (фото/логотип) в S3-хранилище для реестров сайта, возвращает публичную CDN-ссылку'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    def resp(status, body):
        return {
            'statusCode': status,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps(body, ensure_ascii=False),
        }

    if method != 'POST':
        return resp(405, {'error': 'Method not allowed'})

    def check_password() -> bool:
        password = (event.get('headers', {}).get('X-Admin-Password') or
                    event.get('headers', {}).get('x-admin-password') or '').strip()
        expected = (os.environ.get('MANAGER_PASSWORD') or '').strip()
        return bool(expected) and password == expected

    if not check_password():
        return resp(401, {'error': 'Неверный пароль'})

    body = json.loads(event.get('body') or '{}')
    file_data = body.get('file_data')
    file_name = (body.get('file_name') or 'photo.jpg').strip()
    content_type = body.get('content_type') or 'image/jpeg'

    if not file_data:
        return resp(400, {'error': 'Файл не передан'})

    allowed_types = {'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'}
    if content_type not in allowed_types:
        return resp(400, {'error': 'Разрешены только изображения (JPEG, PNG, WEBP, GIF)'})

    try:
        binary = base64.b64decode(file_data)
    except Exception:
        return resp(400, {'error': 'Некорректные данные файла'})

    max_size = 8 * 1024 * 1024
    if len(binary) > max_size:
        return resp(400, {'error': 'Файл слишком большой (максимум 8 МБ)'})

    ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'jpg'
    key = f'registries/{uuid.uuid4()}.{ext}'

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=binary, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return resp(200, {'success': True, 'url': cdn_url})
