import { NextResponse } from "next/server"
import { verifyAndConsumeToken } from "../../lib/tokens"

const SSTI_URL = process.env.SSTI_URL || "http://templates:5000/render"
const INTERNAL_FETCH_TOKEN =
  process.env.INTERNAL_FETCH_TOKEN || "import-service"

export async function POST(req: Request) {
  const adminToken = req.headers.get("x-admin-token")
  if (!verifyAndConsumeToken(adminToken)) {
    return new NextResponse("forbidden (admin token required)", { status: 403 })
  }

  const body = await req.text()
  const r = await fetch(SSTI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Token": INTERNAL_FETCH_TOKEN,
    },
    body,
  })

  const text = await r.text()
  return new NextResponse(text, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") || "text/plain" },
  })
}
