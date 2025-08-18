import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const TOKEN =  "pm_token_7c0d3b9b2a"

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
