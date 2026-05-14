import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createClient } from '@libsql/client'

const __dirname = dirname(fileURLToPath(import.meta.url))

let client
let readyPromise

function resolveLibsqlUrl() {
  const remote = process.env.LIBSQL_URL || process.env.TURSO_DATABASE_URL
  if (remote) {
    return { url: remote, authToken: process.env.LIBSQL_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN }
  }

  const configured = process.env.SQLITE_PATH
  const defaultRelative =
    process.env.VERCEL === '1' && !configured ? '/tmp/hub.sqlite' : join(__dirname, '../data/hub.sqlite')
  const filePath = resolve(configured || defaultRelative)
  mkdirSync(dirname(filePath), { recursive: true })
  return { url: pathToFileURL(filePath).href }
}

async function initSchema() {
  const c = client
  await c.executeMultiple(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      rating INTEGER CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE INDEX IF NOT EXISTS idx_comments_game_status ON comments(game_id, status);
    CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at DESC);
  `)

  const seed = [
    [1, 'COBB CAN MOVE'],
    [2, 'The Freak Circus'],
    [3, 'Granny Horror'],
  ]
  for (const [id, title] of seed) {
    await c.execute({
      sql: 'INSERT OR REPLACE INTO games (id, title) VALUES (?, ?)',
      args: [id, title],
    })
  }
}

function getClient() {
  if (!client) throw new Error('Database not initialized')
  return client
}

export function getReady() {
  if (!readyPromise) {
    readyPromise = (async () => {
      const { url, authToken } = resolveLibsqlUrl()
      client = createClient({ url, authToken: authToken || undefined })
      await initSchema()
    })()
  }
  return readyPromise
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qGet(sql, args = []) {
  const rs = await getClient().execute({ sql, args })
  if (!rs.rows.length) return undefined
  const row = rs.rows[0]
  const o = {}
  for (const c of rs.columns) o[c] = row[c]
  return o
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qAll(sql, args = []) {
  const rs = await getClient().execute({ sql, args })
  return rs.rows.map((row) => {
    const o = {}
    for (const c of rs.columns) o[c] = row[c]
    return o
  })
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qRun(sql, args = []) {
  const rs = await getClient().execute({ sql, args })
  return {
    changes: rs.rowsAffected,
    lastInsertRowid: rs.lastInsertRowid != null ? Number(rs.lastInsertRowid) : 0,
  }
}
