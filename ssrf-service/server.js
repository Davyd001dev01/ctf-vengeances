import express from "express"
import fetch from "node-fetch"
import dns from "node:dns/promises"
import net from "node:net"

const app = express()
const PORT = process.env.PORT || 3000

const PM_IMPORT_PATH = "/import"
const PM_DOCS_PATH = "/.well-known/pm-config"

const ALLOW_HOSTS = new Set(
  (process.env.ALLOW_HOSTS || "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
)

const BLOCK_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "internal-secrets",
  "panel",
  "db",
])

function isPrivateIP(ip) {
  if (!ip) return false
  if (net.isIPv4(ip)) {
    const b = ip.split(".").map((n) => parseInt(n, 10))
    const n = (b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]
    const inRange = (start, mask) => (n & mask) === start
    // 10.0.0.0/8
    if (inRange(0x0a000000, 0xff000000)) return true
    // 172.16.0.0/12
    if (inRange(0xac100000, 0xfff00000)) return true
    // 192.168.0.0/16
    if (inRange(0xc0a80000, 0xffff0000)) return true
    // 127.0.0.0/8
    if (inRange(0x7f000000, 0xff000000)) return true
    // 169.254.0.0/16 (link-local)
    if (inRange(0xa9fe0000, 0xffff0000)) return true
    return false
  }
  // IPv6: ::1, fc00::/7 (ULA), fe80::/10 (link-local)
  if (ip === "::1") return true
  // Checagem simplificada por prefixo
  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80"))
    return true
  return false
}

async function preflight(urlStr) {
  let u
  try {
    u = new URL(urlStr)
  } catch {
    return "invalid URL"
  }
  if (!/^https?:$/.test(u.protocol)) return "scheme not allowed"

  const host = (u.hostname || "").toLowerCase()
  if (ALLOW_HOSTS.has(host)) return null
  if (BLOCK_HOSTS.has(host)) return `blocked host: ${host}`

  // resolve A/AAAA e barra redes privadas
  try {
    const addrs = [
      ...(await dns.resolve4(host).catch(() => [])),
      ...(await dns.resolve6(host).catch(() => [])),
    ]
    if (addrs.length === 0) {
      // pode ser nome sem DNS (na rede Docker resolve) — deixa passar
      return null
    }
    for (const ip of addrs) {
      if (isPrivateIP(ip)) return `blocked private ip: ${ip}`
    }
  } catch (_) {
    // falha de DNS não deve derrubar — deixa o fetch tentar
  }
  return null
}

app.get(PM_DOCS_PATH, (_req, res) => {
  res.json({
    importer: PM_IMPORT_PATH,
    redirects_followed: true,
    note: "Internal artifact ingestion. See / for quick usage.",
  })
})

app.get("/", (_req, res) => {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TechCorp PM Importer</title>

  <!-- Metadados úteis para quem inspeciona o código-fonte -->
  <meta name="pm-importer" content="${PM_IMPORT_PATH}?url=">
  <meta name="pm-docs" content="${PM_DOCS_PATH}">
  <link rel="pm-docs" href="${PM_DOCS_PATH}">
  <meta property="og:pm:docs" content="${PM_DOCS_PATH}">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TechCorp PM Importer",
    "applicationCategory": "DeveloperApplication",
    "url": "${PM_IMPORT_PATH}",
    "documentation": "${PM_DOCS_PATH}"
  }
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;max-width:720px;margin:48px auto;padding:0 16px;color:#222}</style>
</head>
<body>
  <h3>TechCorp PM Importer</h3>
  <p>Use <code>${PM_IMPORT_PATH}?url=...</code> for artifact ingestion.</p>
  <p>Docs: <a href="${PM_DOCS_PATH}">${PM_DOCS_PATH}</a></p>
</body>
</html>`
  res
    .status(200)
    .type("html")
    .set({
      "X-PM-Docs": PM_DOCS_PATH,
      Link: `<${PM_DOCS_PATH}>; rel="preload"; as="fetch"; crossorigin`,
    })
    .send(html)
})

app.get("/healthz", (_req, res) => res.json({ ok: true }))

app.get("/import", async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ error: "missing url" })

  const reason = await preflight(url)
  if (reason) return res.status(400).json({ error: reason })

  try {
    const r = await fetch(url, {
      redirect: "follow",
      timeout: 8000,
      headers: {
        "X-Internal-Token":
          process.env.INTERNAL_FETCH_TOKEN || "import-service",
      },
    })
    const ct = r.headers.get("content-type") || "text/plain"
    const body = await r.text()
    res.status(200).set("content-type", ct).send(body)
  } catch (e) {
    res.status(502).json({ error: "fetch failed", detail: String(e) })
  }
})

app.listen(PORT, () => {
  console.log(`[ssrf-service] listening on :${PORT}`)
})
