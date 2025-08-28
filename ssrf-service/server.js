// SSRF "criativo": allowlist explícita + follow de 302 controlado + logs diegéticos
// Compatível com as vars do seu compose: ALLOW_HOSTS, REDIRECTOR_BASE, INTERNAL_FETCH_TOKEN
// Healthcheck em /healthz

const express = require('express');
const fetch = require('node-fetch'); // npm i express node-fetch@2
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Config "diegética" =====
const ALLOW_HOSTS = (process.env.ALLOW_HOSTS || 'jump-redirect,jump_redirect')
  .split(',')
  .map(s => s.trim().toLowerCase());

const REDIRECTOR_BASE = process.env.REDIRECTOR_BASE || 'http://jump-redirect:3002/jump';
const INTERNAL_FETCH_TOKEN = process.env.INTERNAL_FETCH_TOKEN || 'import-service';

// Para facilitar o CTF (modo homolog): seguir 1x o redirect
const FOLLOW_REDIRECTS_ONCE = (process.env.FOLLOW_REDIRECTS_ONCE || 'true') === 'true';

const MAX_BODY_BYTES = parseInt(process.env.MAX_BODY_BYTES || '200000', 10); // 200 KB
const TIMEOUT_MS = parseInt(process.env.TIMEOUT_MS || '4000', 10);

const LOGS = [];
function log(line) {
  const ts = new Date().toISOString();
  const msg = `[${ts}] ${line}`;
  LOGS.push(msg);
  if (LOGS.length > 300) LOGS.shift();
  console.log(msg);
}

// ===== Endpoints =====
app.get('/healthz', (_req, res) => res.json({ ok: true, allow: ALLOW_HOSTS, follow: FOLLOW_REDIRECTS_ONCE }));

// Logs diegéticos p/ o jogador conferir a cadeia
app.get('/logs', (_req, res) => {
  res.type('text/plain').send(LOGS.join('\n'));
});

// Import principal: GET /import?url=...
app.get('/import', async (req, res) => {
  const raw = req.query.url;
  if (!raw) return res.status(400).json({ error: 'parâmetro obrigatório: url' });

  let firstUrl;
  try {
    firstUrl = new URL(raw);
  } catch {
    return res.status(400).json({ error: 'URL inválida' });
  }

  // Validar host inicial pela allowlist
  const initialHost = firstUrl.hostname.toLowerCase();
  if (!ALLOW_HOSTS.includes(initialHost)) {
    log(`BLOCK host=${initialHost} reason=not-allowlisted url=${raw}`);
    return res.status(403).json({
      error: 'Host bloqueado: apenas jump-redirect/jump_redirect são permitidos.',
      allowlist: ALLOW_HOSTS
    });
  }

  try {
    // 1ª requisição: NÃO seguir redirecionamento automaticamente
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const resp1 = await fetch(firstUrl.toString(), {
      redirect: 'manual',
      headers: { 'X-Internal-Fetch-Token': INTERNAL_FETCH_TOKEN },
      signal: controller.signal
    });

    clearTimeout(to);

    const isRedirect = [301, 302, 303, 307, 308].includes(resp1.status);
    if (!isRedirect) {
      const buf = await resp1.buffer();
      const clipped = buf.slice(0, MAX_BODY_BYTES);
      log(`FETCH ok host=${initialHost} status=${resp1.status} bytes=${clipped.length}`);
      res.set('X-SSRF-Note', 'Fetch direto (sem redirecionamento).');
      return res.status(200).send(clipped);
    }

    // Há redirecionamento
    const location = resp1.headers.get('location');
    if (!location) {
      log(`REDIR missing-location from=${initialHost} status=${resp1.status}`);
      return res.status(502).json({ error: 'Redirecionamento sem header Location.' });
    }

    const nextUrl = new URL(location, firstUrl); // resolve relativo
    log(`REDIR detected from=${initialHost} to=${nextUrl.hostname} status=${resp1.status}`);

    if (!FOLLOW_REDIRECTS_ONCE) {
      return res.status(400).json({
        error: 'Redirecionamento detectado: bloqueado (modo produção).',
        note: 'Ative FOLLOW_REDIRECTS_ONCE=true para modo homolog.'
      });
    }

    // 2ª requisição: seguir UMA vez (criatividade: permite alcançar serviços internos do lab)
    const controller2 = new AbortController();
    const to2 = setTimeout(() => controller2.abort(), TIMEOUT_MS);

    const resp2 = await fetch(nextUrl.toString(), {
      headers: { 'X-Internal-Fetch-Token': INTERNAL_FETCH_TOKEN },
      signal: controller2.signal
    });

    clearTimeout(to2);

    const buf2 = await resp2.buffer();
    const clipped2 = buf2.slice(0, MAX_BODY_BYTES);

    log(`FOLLOW ok from=${initialHost} to=${nextUrl.hostname} status=${resp2.status} bytes=${clipped2.length}`);
    res.set('X-SSRF-Note', 'Redirecionamento detectado: seguindo (modo homolog).');
    return res.status(200).send(clipped2);
  } catch (e) {
    log(`ERROR url=${raw} msg=${e.message}`);
    return res.status(500).json({ error: 'falha ao importar', detail: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`ssrf-service listening on :${PORT}`);
  log(`ALLOW_HOSTS=${ALLOW_HOSTS.join(',')} FOLLOW_REDIRECTS_ONCE=${FOLLOW_REDIRECTS_ONCE} REDIRECTOR_BASE=${REDIRECTOR_BASE}`);
});
