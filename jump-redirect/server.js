import express from "express"
const app = express()
const PORT = process.env.PORT || 3002

app.get("/jump", (req, res) => {
  const to = req.query.to
  if (!to) return res.status(400).send("missing to")
  res.redirect(302, to)
})

app.get("/healthz", (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`[jump] :${PORT}`))