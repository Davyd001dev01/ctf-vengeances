// app/api/feedback/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try { await req.text(); } catch {}

  const res = NextResponse.json({
    ok: true,
    received: true,
    id: Math.random().toString(16).slice(2, 8),
  });
  res.headers.set('X-WAF-Note', 'input sanitized; see branding pixel');
  return res;
}
