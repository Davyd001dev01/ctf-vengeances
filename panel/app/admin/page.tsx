import { issueToken } from "../lib/tokens"
import AdminClient from "./Client"

// impede tentativa de pré-render estático (precisamos de token por requisição)
export const dynamic = "force-dynamic"
// alternativamente poderia ser: export const revalidate = 0;

export default async function AdminPage() {
  const token = issueToken()

  // Mock status for demonstration. In a real scenario, these would be dynamic.
  const sstiBackendStatus = "reachable" // or "unknown"
  const adminTokenStatus = "valid" // or "expired"
  const middlewareBypassStatus = "active" // or "inactive"

  return (
    <AdminClient
      token={token}
      sstiBackendStatus={sstiBackendStatus}
      adminTokenStatus={adminTokenStatus}
      middlewareBypassStatus={middlewareBypassStatus}
    />
  )
}