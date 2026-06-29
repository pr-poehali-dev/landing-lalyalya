import json
import urllib.request
import io
import zipfile
import re


def handler(event: dict, context) -> dict:
    """Временная утилита: скачивает .docx по ссылке и извлекает из него чистый текст."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    params = event.get('queryStringParameters') or {}
    url = params.get('url')
    if not url:
        body = json.loads(event.get('body') or '{}')
        url = body.get('url')

    if not url:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'url is required'}),
        }

    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        data = resp.read()

    with zipfile.ZipFile(io.BytesIO(data)) as z:
        xml = z.read('word/document.xml').decode('utf-8', errors='ignore')

    xml = xml.replace('</w:p>', '\n')
    xml = xml.replace('<w:tab/>', '\t')
    text = re.sub(r'<[^>]+>', '', xml)
    text = re.sub(r'\n{3,}', '\n\n', text).strip()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'text': text}, ensure_ascii=False),
    }
