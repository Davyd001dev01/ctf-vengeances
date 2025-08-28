// 302 helper controlado: GET /jump?to=http://internal-secrets:4000/metadata
// Bloqueia esquemas perigosos, expõe /healthz, adiciona header diegético

const express = require('express');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.get('/jump', (req, res) => {
  const to = req.query.to;
  if (!to) return res.status(400).send('Missing ?to=');

  let u;
  try {
    u = new URL(to);
  } catch {
    return res.status(400).send('Invalid URL');
  }

  if (!['http:', 'https:'].includes(u.protocol)) {
    return res.status(400).send('Unsupported scheme');
  }

  res.set('X-Jump-Info', 'homolog redirect');
  return res.redirect(302, u.toString());
});

app.listen(PORT, () => console.log(`jump-redirect on :${PORT}`));
