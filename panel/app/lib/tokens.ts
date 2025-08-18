import { randomBytes } from "crypto"

type Store = Map<string, number>

const g = globalThis as any
if (!g.__adminTokenStore)
  g.__adminTokenStore = new Map<string, number>() as Store
const store: Store = g.__adminTokenStore

const DEFAULT_TTL = Number(process.env.ADMIN_TOKEN_TTL_MS || 60_000) 

export function issueToken(ttlMs: number = DEFAULT_TTL): string {
  const token = randomBytes(16).toString("hex")
  const exp = Date.now() + ttlMs
  store.set(token, exp)
  return token
}

export function verifyAndConsumeToken(token?: string | null): boolean {
  if (!token) return false
  const exp = store.get(token)
  if (!exp) return false
  if (Date.now() > exp) {
    store.delete(token)
    return false
  }
  // single-use
  store.delete(token)
  return true
}
