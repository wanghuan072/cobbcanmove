const COMMENT_API_ORIGIN = 'https://comment-api-pi.vercel.app'
const COMMENT_PROJECT_SLUG = 'cobbcanmove'
/** SINGLE + STARS_5：整站单条评论流，勿传 itemSlug */
const COMMENT_SECTION_SLUG = 'cobbcanmove-game'

function projectBase() {
  return `${COMMENT_API_ORIGIN}/api/v1/p/${COMMENT_PROJECT_SLUG}`
}

function sectionReviewsUrl() {
  return `${projectBase()}/sections/${COMMENT_SECTION_SLUG}/reviews`
}

function apiHeaders(json = false) {
  const key = String(import.meta.env.VITE_COMMENT_API_KEY ?? '').trim()
  if (!key) {
    throw new Error('MISSING_API_KEY')
  }
  const headers = { 'X-API-Key': key }
  if (json) headers['Content-Type'] = 'application/json'
  return headers
}

/** @param {unknown} data */
export function apiErrorMessage(data, fallback = 'Request failed.') {
  if (data && typeof data === 'object' && 'error' in data) {
    const err = /** @type {{ error?: { message?: string } }} */ (data).error
    if (err?.message) return String(err.message)
  }
  return fallback
}

/** @param {Record<string, unknown>} row */
export function normalizeReview(row) {
  return {
    id: row.id,
    authorName: String(row.authorDisplayName ?? '').trim() || 'Player',
    body: String(row.body ?? ''),
    rating: row.rating != null ? Number(row.rating) : null,
    createdAt: String(row.createdAt ?? ''),
  }
}

/** @param {ReturnType<typeof normalizeReview>[]} reviews */
export function computeReviewStats(reviews) {
  const rated = reviews.filter((r) => r.rating != null && !Number.isNaN(r.rating))
  const ratingCount = rated.length
  const commentCount = reviews.length
  let avgRating = null
  if (ratingCount > 0) {
    const sum = rated.reduce((acc, r) => acc + Number(r.rating), 0)
    avgRating = Math.round((sum / ratingCount) * 10) / 10
  }
  return { commentCount, ratingCount, avgRating }
}

/**
 * @param {{ page?: number, pageSize?: number, sort?: string }} opts
 */
export async function listReviews(opts = {}) {
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 20
  const sort = opts.sort ?? 'createdAt_desc'

  const url = new URL(sectionReviewsUrl())
  url.searchParams.set('page', String(page))
  url.searchParams.set('pageSize', String(pageSize))
  url.searchParams.set('sort', sort)

  const res = await fetch(url.toString(), { headers: apiHeaders() })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(apiErrorMessage(data, `HTTP ${res.status}`))
    err.status = res.status
    err.data = data
    throw err
  }

  const rows = Array.isArray(data.data) ? data.data : []
  return {
    reviews: rows.map(normalizeReview),
    page: Number(data.page) || page,
    pageSize: Number(data.pageSize) || pageSize,
    total: Number(data.total) || rows.length,
  }
}

/**
 * @param {{ body: string, rating: number, authorDisplayName?: string }} payload
 */
export async function createReview(payload) {
  const res = await fetch(sectionReviewsUrl(), {
    method: 'POST',
    headers: apiHeaders(true),
    body: JSON.stringify({
      body: payload.body,
      rating: payload.rating,
      authorDisplayName: payload.authorDisplayName || undefined,
    }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(apiErrorMessage(data, `HTTP ${res.status}`))
    err.status = res.status
    err.data = data
    throw err
  }

  return normalizeReview(data)
}

export function connectionErrorMessage(err) {
  const msg = err?.message || ''
  if (msg === 'MISSING_API_KEY') {
    return import.meta.env.PROD
      ? 'Comments API key is not configured. Set VITE_COMMENT_API_KEY in your deployment environment and redeploy.'
      : 'Comments API key is missing. Copy cobbcanmove-web/.env.example to .env and set VITE_COMMENT_API_KEY.'
  }
  if (err?.status === 403) {
    return 'This site origin is not allowed. Add your URL to allowedOriginPatterns in the comment admin dashboard.'
  }
  if (err?.status === 401) {
    return 'Invalid API key. Check VITE_COMMENT_API_KEY matches the project key in the comment admin.'
  }
  if (err?.status === 429) {
    return 'You are posting too quickly. Please wait a moment and try again.'
  }
  if (msg === 'Failed to fetch' || err?.name === 'TypeError') {
    return 'Could not reach the comments API. Check your network or try again later.'
  }
  return msg || 'Could not load comments.'
}
