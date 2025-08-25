import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const TOKEN =  "pm_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNob3JwLXBtIiwiYXVkIjoicGFuZWwiLCJzdWIiOiJyaF91c2VyIiwic2NvcGUiOiJwYW5lbDpyZWFkIHRlbXBsYXRlczp3cml0ZSIsImlhdCI6MTcyMzU5MzYwMCwiZXhwIjoxOTEwMDAwMDAwLCJqdGkiOiI3YzBkM2I5YjJhIn0.KBTCMRW_A2Qpyew16Q4OD6gIBri2LuZx7fq1VYUyyro"

export function middleware(req: NextRequest) {
  const bypass =
    req.headers.get("x-middleware-subrequest") === "1" || 
    req.headers.get("x-middleware-bypass") === "panel-internal" 

  if (bypass) return NextResponse.next()

  const auth = req.headers.get("authorization") || ""
  const ok = auth === `Bearer ${TOKEN}`
  if (!ok) return new NextResponse("Forbidden", { status: 403 })
  return NextResponse.next()
}

// proteja admin, templates e API (e deixe / público)
export const config = {
  matcher: ["/admin/:path*", "/templates/:path*", "/api/:path*"],
}
