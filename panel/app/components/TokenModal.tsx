"use client"

import { useState, useEffect } from "react"

const VALID_TOKEN =
  "pm_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNob3JwLXBtIiwiYXVkIjoicGFuZWwiLCJzdWIiOiJyaF91c2VyIiwic2NvcGUiOiJwYW5lbDpyZWFkIHRlbXBsYXRlczp3cml0ZSIsImlhdCI6MTcyMzU5MzYwMCwiZXhwIjoxOTEwMDAwMDAwLCJqdGkiOiI3YzBkM2I5YjJhIn0.KBTCMRW_A2Qpyew16Q4OD6gIBri2LuZx7fq1VYUyyro"

export default function TokenModal() {
  const [token, setToken] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    const validated = localStorage.getItem("tc_token_validated")
    if (validated === "true") {
      setIsValid(true)
      return
    }

    const preventRightClick = (e: MouseEvent) => e.preventDefault()
    const preventKeyboard = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener("contextmenu", preventRightClick)
    document.addEventListener("keydown", preventKeyboard)

    return () => {
      document.removeEventListener("contextmenu", preventRightClick)
      document.removeEventListener("keydown", preventKeyboard)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (token.trim() === VALID_TOKEN) {
      setIsValid(true)
      localStorage.setItem("tc_token_validated", "true")
    } else {
      setAttempts((prev) => prev + 1)
      setToken("")

      setTimeout(() => {
        alert("Invalid token. Access denied.")
      }, 500)
    }
  }

  if (isValid) {
    return null
  }

  const modalStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11, 16, 32, 0.98)",
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
  }

  const overlayStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "var(--tc-bg)",
    opacity: 0.95,
  }

  const contentStyle = {
    position: "relative" as const,
    backgroundColor: "var(--tc-surface)",
    border: "1px solid var(--tc-border)",
    borderRadius: "var(--tc-radius-lg)",
    padding: "2rem",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "var(--tc-shadow-1)",
    zIndex: 1000000,
  }

  return (
    <>
      {/* Multiple overlay layers for extra protection */}
      <div style={modalStyle}>
        <div style={overlayStyle} />
        <div style={contentStyle}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[var(--tc-brand)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 tc-brand"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Access Control</h2>
            <p className="tc-text-muted text-sm">
              This panel requires authentication. Please enter your access
              token.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="token" className="block text-sm font-medium mb-2">
                Access Token
              </label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 tc-surface border border-[var(--tc-border)] rounded-[var(--tc-radius-md)] focus:border-[var(--tc-brand)] focus:ring-1 focus:ring-[var(--tc-brand)] transition-colors"
                placeholder="Enter token..."
                required
                autoComplete="off"
              />
            </div>

            {attempts > 0 && (
              <div className="mb-4 p-3 bg-[var(--tc-danger)] bg-opacity-10 border border-[var(--tc-danger)] border-opacity-20 rounded-[var(--tc-radius-sm)]">
                <p className="text-[var(--tc-danger)] text-sm">
                  Invalid token. Attempts: {attempts}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--tc-brand)] text-white py-2 px-4 rounded-[var(--tc-radius-md)] hover:bg-[var(--tc-brand-2)] transition-colors font-medium"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[var(--tc-border)]">
            <p className="text-xs tc-text-muted text-center">
              TechCorp Internal Access • Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>

      {/* Additional protection layers */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--tc-bg)",
          zIndex: 999998,
          pointerEvents: isValid ? "none" : "all",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 999997,
          pointerEvents: isValid ? "none" : "all",
        }}
      />
    </>
  )
}
