// Endpoint interno com metadados e pistas do Ato III
// Health em /healthz, dado em /metadata

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.get('/metadata', (_req, res) => {
  res.json({
    service: 'pm-internal-metadata',
    notes: 'Registros de homologação apontam uso de redirect do jump-redirect.',
    next_hint: {
      render_core: 'templates: jinja2; helpers: cycler, joiner',
      quickcheck: '{{7*7}}'
    }
  });
});

app.listen(PORT, () => console.log(`internal-secrets on :${PORT}`));
