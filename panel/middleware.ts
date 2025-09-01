// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

const NEXT_VULN_VERSION = '14.2.4';
const CVE = 'CVE-2025-29927';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams } = url;

  const publicPaths = new Set<string>([
    '/', '/favicon.ico', '/manifest.json', '/search', '/report',
  ]);
  const isPublic =
    publicPaths.has(pathname) ||
    pathname.startsWith('/api/feedback');

  if (isPublic) return NextResponse.next();

  if (pathname.startsWith('/admin')) {
    const hasDebugParam = searchParams.get('debug') === '1';
    const subrequest = (req.headers.get('x-middleware-subrequest') || '').trim() === '1';

    if (hasDebugParam && subrequest) {
      const res = NextResponse.next();
      res.headers.set('X-Admin-Bypass', 'debug=1; subrequest');


      res.headers.append(
        'Set-Cookie',
        `admin_debug=1; Path=/; HttpOnly; Max-Age=600; SameSite=Lax`
      );
      return res;
    }


    const html = `<!doctype html>
<meta charset="utf-8">
<title>TechCorp PM</title>
<meta name="only 1" content="only 1">
<style>
  :root { color-scheme: dark light }
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,sans-serif;background:#0b0f14;color:#c9d1d9;display:grid;place-content:center;height:100vh;margin:0}
  code{background:#111827;padding:.2rem .35rem;border-radius:.35rem;color:#93c5fd}
  .hint{opacity:.85;font-size:.9rem;color:#9aa4b2}
</style>
<div>
  <h1 style="margin-bottom:.25rem">Acesso restrito</h1>
  <p class="hint">Board disponível apenas em modo de demonstração.</p>
  <!-- branding pixel required -->
</div>`;

    const res = new NextResponse(html, {
      status: 403,
      headers: { 'Content-Type': 'text/html' },
    });

    res.headers.set('X-Panel-Hint', 'assets load first');
    res.headers.set('Vary', '.....');

    return res;
  }

  return NextResponse.next();
}
