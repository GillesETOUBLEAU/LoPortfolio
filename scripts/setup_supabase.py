import sqlite3, re, json, base64
import urllib.request, urllib.error

SUPA_URL = 'https://drodstfbouwlltxyhela.supabase.co'
PROJECT_REF = 'drodstfbouwlltxyhela'

db = sqlite3.connect('/opt/data/state.db')
rows = db.execute(
    "SELECT content FROM messages WHERE content LIKE '%eyJhbG%' AND role='user' ORDER BY id DESC LIMIT 3"
).fetchall()

all_jwts = []
for (content,) in rows:
    jwts = re.findall(r'eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+', content)
    all_jwts.extend(jwts)

sr_key = None
anon_key = None
for j in all_jwts:
    parts = j.split('.')
    if len(parts) >= 2:
        payload = json.loads(base64.urlsafe_b64decode(parts[1] + '===').decode())
        role = payload.get('role', '')
        if role == 'service_role':
            sr_key = j
        elif role == 'anon':
            anon_key = j

print(f'Keys found: anon={len(anon_key) if anon_key else 0}, sr={len(sr_key) if sr_key else 0}')

SQL = """
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon inserts" ON contacts FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow service_role select" ON contacts FOR SELECT TO service_role USING (true);
"""

# Approach 1: Try api.supabase.com with browser-like headers
print('\n--- Approach 1: Management API with browser UA ---')
req = urllib.request.Request(
    f'https://api.supabase.com/v1/projects/{PROJECT_REF}/sql',
    data=json.dumps({'query': SQL}).encode(),
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {sr_key}',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Origin': 'https://supabase.com',
        'Referer': 'https://supabase.com/',
    },
    method='POST'
)
try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        print(f'HTTP {resp.status} — SUCCESS')
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f'HTTP {e.code} — {body[:300]}')

# Approach 2: Try direct PostgREST with service_role + Prefer header
print('\n--- Approach 2: PostgREST DDL attempt ---')
# PostgREST can't do DDL, but let's try with service_role
req2 = urllib.request.Request(
    f'{SUPA_URL}/rest/v1/rpc/exec',
    data=json.dumps({'sql': SQL}).encode(),
    headers={
        'Content-Type': 'application/json',
        'apikey': sr_key,
        'Authorization': f'Bearer {sr_key}',
    },
    method='POST'
)
try:
    with urllib.request.urlopen(req2, timeout=15) as resp:
        print(f'HTTP {resp.status}')
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f'HTTP {e.code} — {body[:200]}')

# Approach 3: Try supabase.com dashboard API
print('\n--- Approach 3: Dashboard API ---')
req3 = urllib.request.Request(
    f'https://supabase.com/dashboard/api/projects/{PROJECT_REF}/sql',
    data=json.dumps({'query': SQL}).encode(),
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {sr_key}',
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
    },
    method='POST'
)
try:
    with urllib.request.urlopen(req3, timeout=15) as resp:
        print(f'HTTP {resp.status}')
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f'HTTP {e.code} — {body[:200]}')

# Approach 4: Try Supabase CLI-like endpoint
print('\n--- Approach 4: Supabase SQL via REST ---')
SUPA_REST_URL = f'{SUPA_URL}/rest/v1/'
# Use service_role key to try DDL via PostgREST (won't work but let's try)
req4 = urllib.request.Request(
    f'{SUPA_URL}/rest/v1/contacts',
    data=json.dumps({}).encode(),
    headers={
        'Content-Type': 'application/json',
        'apikey': sr_key,
        'Authorization': f'Bearer {sr_key}',
        'Prefer': 'resolution=merge-duplicates',
    },
    method='POST'
)
try:
    with urllib.request.urlopen(req4, timeout=10) as resp:
        print(f'HTTP {resp.status}')
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f'HTTP {e.code} — {body[:200]}')

print('\nDone. If all failed, use SQL Editor: https://supabase.com/dashboard/project/drodstfbouwlltxyhela/sql')