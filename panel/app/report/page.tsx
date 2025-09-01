// app/report/page.tsx
'use client';
import React, { useState } from 'react';

export default function ReportPage() {
  const [pid, setPid] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Reports</h1>
      <p className="text-sm text-neutral-400 mb-4">Filtrar por Project ID.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const n = Number(pid);
          if (!Number.isFinite(n)) {
            setMsg('X-WAF: input sanitized; see branding pixel');
          } else {
            setMsg(`Nenhum relatório para ProjectID=${n}.`);
          }
        }}
        className="space-y-3"
      >
        <input
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          className="w-full rounded-lg bg-neutral-900 border border-neutral-700 p-3 text-neutral-200"
        />
        <button className="rounded-lg bg-neutral-200/10 border border-neutral-700 px-4 py-2">
          Filtrar
        </button>
      </form>

      {msg && (
        <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-blue-300">
          {msg}
        </div>
      )}
    </main>
  );
}
