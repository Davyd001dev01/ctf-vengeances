"use client"
// app/page.tsx
import Link from "next/link";
import Navbar from "./components/Navbar"


export default function Home() {
  return (
    <main className="tc-wrap">
      <header className="tc-topbar">
        <Navbar/>
      </header>

      <section className="tc-hero">
        <h1>Operational Panel</h1>
        <p>Unified workspace for delivery, workforce and governance.</p>
        <div className="tc-quick">
          {/* Links reais do seu painel; protegidos pelo middleware */}
          <Link href="/admin" className="tc-btn primary">
            Open Console
          </Link>
          <Link href="/templates" className="tc-btn">
            Templates
          </Link>
        </div>
      </section>

      <section className="tc-grid">
        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            📦
          </div>
          <h3>Backlog</h3>
          <p>Prioritize, track and align delivery across squads.</p>
          <a href="#" className="tc-link" aria-disabled="true">
            View board
          </a>
        </article>

        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            🔁
          </div>
          <h3>Imports</h3>
          <p>Standardize artifact ingestion and provenance.</p>
          <a href="#" className="tc-link" aria-disabled="true">
            Start import
          </a>
        </article>

        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            🧩
          </div>
          <h3>Templates</h3>
          <p>Curated templates for PM workflows and audits.</p>
          <Link href="/templates" className="tc-link">
            Open
          </Link>
        </article>

        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            🧭
          </div>
          <h3>Governance</h3>
          <p>Enforce guardrails, SLAs and approval gates.</p>
          <a href="#" className="tc-link" aria-disabled="true">
            Policies
          </a>
        </article>

        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            📈
          </div>
          <h3>Insights</h3>
          <p>Operational metrics with trend detection.</p>
          <a href="#" className="tc-link" aria-disabled="true">
            Open analytics
          </a>
        </article>

        <article className="tc-card">
          <div className="tc-icon" aria-hidden>
            🛡️
          </div>
          <h3>Status</h3>
          <p>Uptime, incidents and change windows.</p>
          <a href="#" className="tc-link" aria-disabled="true">
            Service status
          </a>
        </article>
      </section>

      <footer className="tc-foot">
        <span>© {new Date().getFullYear()} TechCorp — Internal</span>
      </footer>

      <style jsx>{`
        :root {
          --bg: #0b1020;
          --bg-soft: #0f152a;
          --card: #121a33;
          --ink: #e6ecff;
          --muted: #97a1c0;
          --brand: #3d6bff;
          --brand-2: #6ea3ff;
          --ring: rgba(109, 148, 255, 0.35);
        }
        * {
          box-sizing: border-box;
        }
        .tc-wrap {
          min-height: 100dvh;
          color: var(--ink);
          background: radial-gradient(
              1200px 600px at 80% -10%,
              #1b254a 0%,
              transparent 60%
            ),
            radial-gradient(
              900px 500px at -10% -20%,
              #14204a 0%,
              transparent 55%
            ),
            var(--bg);
        }
        .tc-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: saturate(140%) blur(12px);
          background: linear-gradient(
            180deg,
            rgba(18, 26, 51, 0.85),
            rgba(18, 26, 51, 0.55)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .tc-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tc-logo {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          font-weight: 800;
          background: linear-gradient(135deg, var(--brand), var(--brand-2));
          color: white;
          letter-spacing: 0.5px;
        }
        .tc-meta {
          display: flex;
          flex-direction: column;
          line-height: 1.05;
        }
        .tc-meta strong {
          font-size: 14px;
        }
        .tc-meta span {
          font-size: 12px;
          color: var(--muted);
        }
        .tc-nav {
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .tc-nav a {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 8px;
        }
        .tc-nav a:hover {
          color: var(--ink);
          background: rgba(255, 255, 255, 0.04);
        }
        .tc-hero {
          padding: 56px 28px 14px;
          text-align: center;
        }
        .tc-hero h1 {
          font-size: 38px;
          letter-spacing: 0.3px;
          margin: 0 0 8px 0;
        }
        .tc-hero p {
          color: var(--muted);
          margin: 0 auto 18px;
          max-width: 720px;
        }
        .tc-quick {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 10px;
        }
        .tc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.08s ease, background 0.2s ease,
            border-color 0.2s ease;
        }
        .tc-btn:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.1);
        }
        .tc-btn.primary {
          background: linear-gradient(135deg, var(--brand), var(--brand-2));
          border-color: transparent;
          box-shadow: 0 10px 30px -10px var(--ring);
        }

        .tc-grid {
          padding: 28px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto 36px;
        }
        .tc-card {
          grid-column: span 4;
          min-height: 160px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.03)
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform 0.08s ease, border-color 0.2s ease,
            box-shadow 0.2s ease;
        }
        .tc-card:hover {
          transform: translateY(-2px);
          border-color: rgba(109, 148, 255, 0.35);
          box-shadow: 0 10px 30px -12px var(--ring);
        }
        .tc-icon {
          font-size: 22px;
          opacity: 0.9;
        }
        .tc-card h3 {
          margin: 2px 0 4px;
          font-size: 16px;
        }
        .tc-card p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
        }
        .tc-link {
          margin-top: auto;
          align-self: flex-start;
          color: var(--brand-2);
          text-decoration: none;
          font-size: 14px;
          padding: 6px 8px;
          border-radius: 8px;
        }
        .tc-link:hover {
          background: rgba(109, 148, 255, 0.12);
        }
        .tc-foot {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 16px 28px;
          color: var(--muted);
          text-align: center;
        }

        @media (max-width: 980px) {
          .tc-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          .tc-card {
            grid-column: span 6;
          }
          .tc-nav {
            display: none;
          }
        }
        @media (prefers-color-scheme: light) {
          :root {
            --bg: #f6f8ff;
            --bg-soft: #f1f4ff;
            --card: #ffffff;
            --ink: #0b1226;
            --muted: #4a5472;
            --ring: rgba(61, 107, 255, 0.25);
          }
          .tc-topbar {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.85),
              rgba(255, 255, 255, 0.65)
            );
          }
          .tc-wrap {
            background: radial-gradient(
                1200px 600px at 80% -10%,
                #edf2ff 0%,
                transparent 60%
              ),
              radial-gradient(
                900px 500px at -10% -20%,
                #e8eeff 0%,
                transparent 55%
              ),
              var(--bg);
          }
          .tc-card {
            background: #fff;
            border-color: rgba(14, 22, 42, 0.06);
          }
        }
      `}</style>
    </main>
  )
}
