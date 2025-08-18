"use client"

import { useState, FormEvent } from "react"

interface LogEntry {
  id: number
  timestamp: string
  status: string
  message: string
}

export default function AdminClient({
  token,
  sstiBackendStatus,
  adminTokenStatus,
  middlewareBypassStatus,
}: {
  token: string
  sstiBackendStatus: string
  adminTokenStatus: string
  middlewareBypassStatus: string
}) {
  const [tpl, setTpl] = useState("{{ 7*7 }}")
  const [out, setOut] = useState("")
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error" | "info" | "warning"
  } | null>(null)

  const addLog = (status: string, message: string) => {
    setLogs((prevLogs) => [
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        status,
        message,
      },
      ...prevLogs.slice(0, 4),
    ]) // Keep last 5 logs
  }

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function renderTpl(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setOut("")
    try {
      const r = await fetch("/api/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": token,
        },
        body: JSON.stringify({ tpl, ctx: {} }),
      })

      if (r.ok) {
        const result = await r.text()
        setOut(result)
        addLog("Sucesso", "Template renderizado com sucesso.")
        showToast("Renderização concluída!", "success")
      } else {
        const errorText = await r.text()
        setOut(`Erro: ${r.status} - ${errorText}`)
        addLog("Erro", `Falha na renderização: ${r.status}`)
        showToast(`Erro na renderização: ${r.status}`, "error")
      }
    } catch (error: any) {
      setOut(`Erro de rede: ${error.message}`)
      addLog("Erro", `Erro de rede: ${error.message}`)
      showToast(`Erro de rede: ${error.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(out)
    showToast("Resultado copiado para a área de transferência!", "info")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        color: "#1f2937",
        padding: "24px",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            padding: "12px",
            borderRadius: "6px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            color: "white",
            backgroundColor:
              toast.type === "success"
                ? "#10b981"
                : toast.type === "error"
                ? "#ef4444"
                : toast.type === "info"
                ? "#3b82f6"
                : "#f59e0b",
            zIndex: 1000,
          }}
        >
          {toast.message}
        </div>
      )}

      <header
        style={{
          width: "100%",
          maxWidth: "1024px",
          backgroundColor: "#0B2F4A",
          color: "white",
          padding: "16px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>
          TechCorp PM
        </h1>
        <nav style={{ fontSize: "14px" }}>
          Home / <span style={{ color: "#67e8f9" }}>Admin</span>
        </nav>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: "1024px",
          backgroundColor: "white",
          padding: "24px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          marginTop: "0",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginBottom: "16px",
            margin: "0 0 16px 0",
          }}
        >
          Admin Panel — TechCorp PM
        </h2>
        <p
          style={{
            color: "#6b7280",
            marginBottom: "24px",
            margin: "0 0 24px 0",
          }}
        >
          Ferramentas internas de renderização de templates para artefatos de
          migração.
        </p>

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
            padding: "16px",
            borderRadius: "6px",
            marginBottom: "24px",
          }}
          role="alert"
        >
          <p style={{ fontWeight: "600", margin: "0 0 4px 0" }}>
            Aviso TechCorp:
          </p>
          <p style={{ margin: 0 }}>
            Uso interno. As renderizações são efêmeras e destinadas a validação
            de artefatos.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Status do Backend SSTI
            </h4>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor:
                  sstiBackendStatus === "reachable" ? "#dcfce7" : "#fee2e2",
                color:
                  sstiBackendStatus === "reachable" ? "#166534" : "#991b1b",
              }}
            >
              {sstiBackendStatus === "reachable" ? "Online" : "Indisponível"}
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Status do Admin Token
            </h4>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor:
                  adminTokenStatus === "valid" ? "#dcfce7" : "#fee2e2",
                color: adminTokenStatus === "valid" ? "#166534" : "#991b1b",
              }}
            >
              {adminTokenStatus === "valid"
                ? "Válido"
                : "Expirado (recarregue a página)"}
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Status do Middleware
            </h4>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: "#dbeafe",
                color: "#1e40af",
              }}
            >
              Proteção: Middleware ativo (acesso interno)
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Renderização de Templates
            </h3>
            <form
              onSubmit={renderTpl}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <label
                htmlFor="template-input"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: "0",
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: "0",
                }}
              >
                Template Jinja
              </label>
              <textarea
                id="template-input"
                rows={10}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                value={tpl}
                onChange={(e) => setTpl(e.target.value)}
                placeholder=""
                aria-label="Input para template Jinja"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setTpl("")}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: loading ? "#6b7280" : "#0B2F4A",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Renderizando..." : "Renderizar"}
                </button>
              </div>
            </form>
          </div>

          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Resultado da Renderização
            </h3>
            <div
              style={{
                position: "relative",
                backgroundColor: "#1f2937",
                color: "#10b981",
                padding: "16px",
                borderRadius: "6px",
                overflow: "auto",
                height: "256px",
                fontFamily: "monospace",
                fontSize: "14px",
              }}
            >
              {loading ? (
                <div>
                  <div
                    style={{
                      height: "16px",
                      backgroundColor: "#374151",
                      borderRadius: "4px",
                      width: "75%",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    style={{
                      height: "16px",
                      backgroundColor: "#374151",
                      borderRadius: "4px",
                      width: "100%",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    style={{
                      height: "16px",
                      backgroundColor: "#374151",
                      borderRadius: "4px",
                      width: "83%",
                    }}
                  ></div>
                </div>
              ) : (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    margin: 0,
                    fontFamily: "inherit",
                  }}
                >
                  {out || "Nenhum resultado ainda."}
                </pre>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <button
                onClick={copyToClipboard}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                Copiar
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "24px",
            backgroundColor: "#f9fafb",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Últimas Execuções (Local)
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {logs.length === 0 ? (
              <li style={{ color: "#6b7280" }}>
                Nenhum log de execução ainda.
              </li>
            ) : (
              logs.map((log) => (
                <li key={log.id} style={{ fontSize: "14px", color: "#374151" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    [{log.timestamp}]
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color: log.status === "Sucesso" ? "#059669" : "#dc2626",
                    }}
                  >
                    {log.status}:
                  </span>{" "}
                  {log.message}
                </li>
              ))
            )}
          </ul>
        </div>
      </main>

      <footer
        style={{
          width: "100%",
          maxWidth: "1024px",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "14px",
          marginTop: "32px",
          paddingBottom: "16px",
        }}
      >
        TechCorp © — Internal Tools
      </footer>
    </div>
  )
}
