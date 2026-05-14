import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'node:crypto'
import { getDatabaseUrl, getReady, qAll, qGet, qRun } from './db.js'

const PORT = Number(process.env.PORT) || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
const AUTO_APPROVE = String(process.env.AUTO_APPROVE_COMMENTS || '0') === '1'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '64kb' }))

/** @param {(req: import('express').Request, res: import('express').Response) => unknown} fn */
function ar(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((e) => {
      console.error(e)
      if (!res.headersSent) res.status(500).json({ error: e?.message || 'Server error' })
    })
  }
}

app.use(async (_req, res, next) => {
  try {
    await getReady()
    next()
  } catch (e) {
    next(e)
  }
})

const sessions = new Map()
const postCooldown = new Map()

function newSession() {
  const token = crypto.randomBytes(32).toString('hex')
  const exp = Date.now() + 24 * 60 * 60 * 1000
  sessions.set(token, exp)
  return token
}

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const exp = sessions.get(token)
  if (!token || !exp || Date.now() > exp) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}

function sanitizeName(s) {
  return String(s || '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 80)
}

function sanitizeBody(s) {
  return String(s || '')
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 2000)
}

function parseRating(v) {
  if (v === null || v === undefined || v === '') return null
  const n = Number.parseInt(String(v), 10)
  if (Number.isNaN(n) || n < 1 || n > 5) return null
  return n
}

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {}
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' })
    return
  }
  const token = newSession()
  res.json({ token })
})

app.get(
  '/api/games/:gameId/stats',
  ar(async (req, res) => {
    const gameId = Number.parseInt(req.params.gameId, 10)
    if (Number.isNaN(gameId)) {
      res.status(400).json({ error: 'Invalid game' })
      return
    }
    const row = await qGet(
      `SELECT
        COUNT(*)::int AS comment_count,
        AVG(rating)::float AS avg_rating,
        COALESCE(SUM(CASE WHEN rating IS NOT NULL THEN 1 ELSE 0 END), 0)::int AS rating_count
       FROM comments WHERE game_id = $1 AND status = 'approved'`,
      [gameId],
    )
    res.json({
      commentCount: row?.comment_count || 0,
      ratingCount: row?.rating_count || 0,
      avgRating: row?.avg_rating != null ? Math.round(Number(row.avg_rating) * 10) / 10 : null,
    })
  }),
)

app.get(
  '/api/games/:gameId/comments',
  ar(async (req, res) => {
    const gameId = Number.parseInt(req.params.gameId, 10)
    if (Number.isNaN(gameId)) {
      res.status(400).json({ error: 'Invalid game' })
      return
    }
    const rows = await qAll(
      `SELECT id, author_name AS "authorName", body, rating, created_at AS "createdAt"
       FROM comments WHERE game_id = $1 AND status = 'approved'
       ORDER BY created_at DESC LIMIT 200`,
      [gameId],
    )
    res.json({ comments: rows })
  }),
)

app.post(
  '/api/games/:gameId/comments',
  ar(async (req, res) => {
    const gameId = Number.parseInt(req.params.gameId, 10)
    if (Number.isNaN(gameId)) {
      res.status(400).json({ error: 'Invalid game' })
      return
    }
    const exists = await qGet('SELECT 1 AS ok FROM games WHERE id = $1', [gameId])
    if (!exists) {
      res.status(404).json({ error: 'Game not found' })
      return
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const last = postCooldown.get(ip)
    if (last && Date.now() - last < 15_000) {
      res.status(429).json({ error: 'Please wait a few seconds before posting again.' })
      return
    }

    const authorName = sanitizeName(req.body?.authorName)
    const body = sanitizeBody(req.body?.body)
    const rating = parseRating(req.body?.rating)

    if (!authorName || !body) {
      res.status(400).json({ error: 'Name and comment are required.' })
      return
    }

    const status = AUTO_APPROVE ? 'approved' : 'pending'
    const result = await qRun(
      `INSERT INTO comments (game_id, author_name, body, rating, status) VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [gameId, authorName, body, rating, status],
    )

    postCooldown.set(ip, Date.now())

    res.status(201).json({
      ok: true,
      id: result.lastInsertRowid,
      status,
      message: status === 'approved' ? 'Thanks—your review is live.' : 'Thanks—your review is pending moderation.',
    })
  }),
)

app.get(
  '/api/admin/comments',
  requireAdmin,
  ar(async (req, res) => {
    const status = req.query.status || 'pending'
    if (!['pending', 'approved', 'rejected', 'all'].includes(status)) {
      res.status(400).json({ error: 'Invalid status filter' })
      return
    }
    const sqlAll =
      `SELECT c.id, c.game_id AS "gameId", g.title AS "gameTitle", c.author_name AS "authorName", c.body, c.rating, c.status, c.created_at AS "createdAt"
       FROM comments c JOIN games g ON g.id = c.game_id ORDER BY c.created_at DESC LIMIT 500`
    const sqlFilter =
      `SELECT c.id, c.game_id AS "gameId", g.title AS "gameTitle", c.author_name AS "authorName", c.body, c.rating, c.status, c.created_at AS "createdAt"
       FROM comments c JOIN games g ON g.id = c.game_id WHERE c.status = $1 ORDER BY c.created_at DESC LIMIT 500`
    const rows = status === 'all' ? await qAll(sqlAll) : await qAll(sqlFilter, [status])
    res.json({ comments: rows })
  }),
)

app.patch(
  '/api/admin/comments/:id',
  requireAdmin,
  ar(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    const nextStatus = req.body?.status
    if (Number.isNaN(id) || !['approved', 'rejected', 'pending'].includes(nextStatus)) {
      res.status(400).json({ error: 'Invalid request' })
      return
    }
    const r = await qRun(`UPDATE comments SET status = $1 WHERE id = $2`, [nextStatus, id])
    if (r.changes === 0) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.json({ ok: true })
  }),
)

app.delete(
  '/api/admin/comments/:id',
  requireAdmin,
  ar(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid id' })
      return
    }
    await qRun(`DELETE FROM comments WHERE id = $1`, [id])
    res.json({ ok: true })
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    vercel: process.env.VERCEL === '1',
    db: getDatabaseUrl() ? 'neon' : 'missing',
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  if (!res.headersSent) {
    res.status(503).json({ error: err?.message || String(err) })
  }
})

if (process.env.VERCEL !== '1') {
  getReady()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`API http://localhost:${PORT}`)
        console.log(`Admin login: POST /api/admin/login  AUTO_APPROVE_COMMENTS=${AUTO_APPROVE ? '1' : '0'}`)
      })
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

export default app
