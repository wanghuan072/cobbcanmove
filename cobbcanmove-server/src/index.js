import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'node:crypto'
import { getDb } from './db.js'

const PORT = Number(process.env.PORT) || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
const AUTO_APPROVE = String(process.env.AUTO_APPROVE_COMMENTS || '0') === '1'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '64kb' }))

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

getDb()

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {}
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' })
    return
  }
  const token = newSession()
  res.json({ token })
})

app.get('/api/games/:gameId/stats', (req, res) => {
  const gameId = Number.parseInt(req.params.gameId, 10)
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: 'Invalid game' })
    return
  }
  const database = getDb()
  const row = database
    .prepare(
      `SELECT
        COUNT(*) AS comment_count,
        AVG(rating) AS avg_rating,
        SUM(CASE WHEN rating IS NOT NULL THEN 1 ELSE 0 END) AS rating_count
       FROM comments WHERE game_id = ? AND status = 'approved'`,
    )
    .get(gameId)
  res.json({
    commentCount: row.comment_count || 0,
    ratingCount: row.rating_count || 0,
    avgRating: row.avg_rating != null ? Math.round(row.avg_rating * 10) / 10 : null,
  })
})

app.get('/api/games/:gameId/comments', (req, res) => {
  const gameId = Number.parseInt(req.params.gameId, 10)
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: 'Invalid game' })
    return
  }
  const database = getDb()
  const rows = database
    .prepare(
      `SELECT id, author_name AS authorName, body, rating, created_at AS createdAt
       FROM comments WHERE game_id = ? AND status = 'approved'
       ORDER BY created_at DESC LIMIT 200`,
    )
    .all(gameId)
  res.json({ comments: rows })
})

app.post('/api/games/:gameId/comments', (req, res) => {
  const gameId = Number.parseInt(req.params.gameId, 10)
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: 'Invalid game' })
    return
  }
  const database = getDb()
  const exists = database.prepare('SELECT 1 FROM games WHERE id = ?').get(gameId)
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
  const result = database
    .prepare(
      `INSERT INTO comments (game_id, author_name, body, rating, status) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(gameId, authorName, body, rating, status)

  postCooldown.set(ip, Date.now())

  res.status(201).json({
    ok: true,
    id: result.lastInsertRowid,
    status,
    message: status === 'approved' ? 'Thanks—your review is live.' : 'Thanks—your review is pending moderation.',
  })
})

app.get('/api/admin/comments', requireAdmin, (req, res) => {
  const status = req.query.status || 'pending'
  if (!['pending', 'approved', 'rejected', 'all'].includes(status)) {
    res.status(400).json({ error: 'Invalid status filter' })
    return
  }
  const database = getDb()
  const sql =
    status === 'all'
      ? `SELECT c.id, c.game_id AS gameId, g.title AS gameTitle, c.author_name AS authorName, c.body, c.rating, c.status, c.created_at AS createdAt
         FROM comments c JOIN games g ON g.id = c.game_id ORDER BY c.created_at DESC LIMIT 500`
      : `SELECT c.id, c.game_id AS gameId, g.title AS gameTitle, c.author_name AS authorName, c.body, c.rating, c.status, c.created_at AS createdAt
         FROM comments c JOIN games g ON g.id = c.game_id WHERE c.status = ? ORDER BY c.created_at DESC LIMIT 500`
  const rows = status === 'all' ? database.prepare(sql).all() : database.prepare(sql).all(status)
  res.json({ comments: rows })
})

app.patch('/api/admin/comments/:id', requireAdmin, (req, res) => {
  const id = Number.parseInt(req.params.id, 10)
  const nextStatus = req.body?.status
  if (Number.isNaN(id) || !['approved', 'rejected', 'pending'].includes(nextStatus)) {
    res.status(400).json({ error: 'Invalid request' })
    return
  }
  const database = getDb()
  const r = database.prepare(`UPDATE comments SET status = ? WHERE id = ?`).run(nextStatus, id)
  if (r.changes === 0) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.json({ ok: true })
})

app.delete('/api/admin/comments/:id', requireAdmin, (req, res) => {
  const id = Number.parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' })
    return
  }
  const database = getDb()
  database.prepare(`DELETE FROM comments WHERE id = ?`).run(id)
  res.json({ ok: true })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`)
  console.log(`Admin login: POST /api/admin/login  AUTO_APPROVE_COMMENTS=${AUTO_APPROVE ? '1' : '0'}`)
})
