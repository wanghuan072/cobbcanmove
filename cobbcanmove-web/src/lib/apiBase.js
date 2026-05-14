/** API 基址：开发走 Vite 代理 /api；生产可设 VITE_API_URL */
export function apiBase() {
  const env = import.meta.env.VITE_API_URL
  if (env) return String(env).replace(/\/$/, '')
  return ''
}

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = apiBase()
  return base ? `${base}${p}` : p
}
