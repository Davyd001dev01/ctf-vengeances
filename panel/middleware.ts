import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Bypass CVE (Next.js) — só quando o próprio Next marcar subrequest interno
const BYPASS_HEADER = "x-middleware-subrequest"

// Caminho “legítimo”: header com token que você obteve via SSRF
const TOKEN_HEADER = "x-pm-token"
const EXPECTED = process.env.PANEL_EXPECTED_TOKEN ?? "__MISSING__"

export const config = {
  matcher: ["/admin/:path*", "/templates/:path*"],
}

export function middleware(req: NextRequest) {
  const isCveBypass = req.headers.get(BYPASS_HEADER) === "1"
  const presented = req.headers.get(TOKEN_HEADER) ?? ""

  const allowed = isCveBypass || (presented && presented === EXPECTED)

  if (!allowed) {
    // Cabeçalho de diagnóstico p/ confirmar que o middleware rodou
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "x-gate": "blocked" },
    })
  }

  return NextResponse.next({
    headers: new Headers({ "x-gate": "ok" }),
  })
}
