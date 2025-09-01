// app/api/render/route.ts
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

const SSTI_URL = process.env.SSTI_URL || 'http://templates:5000/render';
// INTERNAL_FETCH_TOKEN deve bater com o do container "templates"
const INTERNAL_TOKEN = process.env.INTERNAL_FETCH_TOKEN || 'import-service';

// 403 consistente
function forbidden(msg: string) {
  return NextResponse.json({ error: msg }, { status: 403 });
}

// Lê "tpl" do body (JSON) ou query (fallback)
async function readTpl(req: Request): Promise<string> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try {
      const body = await req.json();
      if (typeof body?.tpl === 'string') return body.tpl;
    } catch {}
  }
  // fallback: query param
  try {
    const u = new URL(req.url);
    const q = u.searchParams.get('tpl') || '';
    return q;
  } catch {}
  return '';
}

// Chama o Flask como ele espera: POST JSON + X-Internal-Token
async function callTemplatesJSON(tpl: string) {
  const payload = JSON.stringify({ tpl });
  return fetch(SSTI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain,application/json;q=0.9,*/*;q=0.8',
      'X-Internal-Token': INTERNAL_TOKEN, // <- NOME CORRETO DO HEADER
    },
    body: payload,
    cache: 'no-store',
  });
}

async function handle(req: Request) {
  // 1) Autorização do painel: precisa do cookie setado pelo middleware OU do header (SSR).
  const jar = cookies();
  const isDemo = jar.get('admin_debug')?.value === '1';
  const bypassHdr = (headers().get('x-admin-bypass') || '').toLowerCase();
  if (!isDemo && !bypassHdr.includes('debug=1')) {
    return forbidden('forbidden (admin token required)');
  }

  // 2) Conteúdo
  const tpl = await readTpl(req);
  if (!tpl) return NextResponse.json({ error: 'missing tpl' }, { status: 400 });

  // 3) Upstream (Flask/Jinja2)
  const upstream = await callTemplatesJSON(tpl);

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'text/plain' },
  });
}

export async function POST(req: Request) { return handle(req); }
// aceita GET também (útil p/ curl/smoke), mas sempre chama o Flask via POST JSON
export async function GET(req: Request)  { return handle(req); }
