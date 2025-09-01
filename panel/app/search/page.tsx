// app/search/page.tsx
'use client';
import React, { useState } from 'react';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-2">Search</h1>
      <p className="text-sm text-neutral-400 mb-4">Procura interna (beta).</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMsg('CDN atrasada: ícone de branding não carregado. Tente novamente.');
        }}
        className="space-y-3"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-lg bg-neutral-900 border border-neutral-700 p-3 text-neutral-200"
        />
        <button className="rounded-lg bg-neutral-200/10 border border-neutral-700 px-4 py-2">
          Buscar
        </button>
      </form>

      {msg && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300">
          {msg}
        </div>
      )}
    </main>
  );
}
