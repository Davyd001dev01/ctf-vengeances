import express from "express"

const app = express()
const PORT = process.env.PORT || 4000

const SECRET = {
  token: "pm_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNob3JwLXBtIiwiYXVkIjoicGFuZWwiLCJzdWIiOiJyaF91c2VyIiwic2NvcGUiOiJwYW5lbDpyZWFkIHRlbXBsYXRlczp3cml0ZSIsImlhdCI6MTcyMzU5MzYwMCwiZXhwIjoxOTEwMDAwMDAwLCJqdGkiOiI3YzBkM2I5YjJhIn0.KBTCMRW_A2Qpyew16Q4OD6gIBri2LuZx7fq1VYUyyro",
  panel_url: "http://panel:3001",
  hint_header: "X-Middleware-Bypass: panel-internal",
}

const REQUIRED_HEADER = "x-internal-token"
const REQUIRED_VALUE = process.env.INTERNAL_FETCH_TOKEN || "import-service"

app.get("/healthz", (_req, res) => res.json({ ok: true }))

function guard(req, res, next) {
  if (req.header(REQUIRED_HEADER) !== REQUIRED_VALUE) {
    return res.status(403).json({ error: "forbidden" })
  }
  next()
}

app.get("/metadata", guard, (_req, res) => {
  res.json({
    token: SECRET.token,
    panel_url: SECRET.panel_url,
    hint_header: SECRET.hint_header,
    note: "internal-only; guarded",
  })
})

app.get("/redirect-to-metadata", (_req, res) => {
  // mantém open redirect interno para forçar o follow-redirect do importador
  res.redirect(302, "/metadata")
})

app.listen(PORT, () => {
  console.log(`[internal-secrets] listening on :${PORT}`)
})
