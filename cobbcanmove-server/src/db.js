import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

let db

function resolveDbFilePath() {
  const configured = process.env.SQLITE_PATH
  if (process.env.VERCEL === '1') {
    if (!configured) return '/tmp/hub.sqlite'
    const abs = resolve(configured)
    // 部署包目录只读；仅 /tmp 可写
    if (abs.startsWith('/tmp')) return abs
    return '/tmp/hub.sqlite'
  }
  return resolve(configured || resolve(__dirname, '../data/hub.sqlite'))
}

/**
 * Game(1) ──< Comment：每条评论归属一个 game_id，可选 1–5 星评分
 */
export function getDb() {
  if (db) return db
  const Database = require('better-sqlite3')
  const path = resolveDbFilePath()
  mkdirSync(dirname(path), { recursive: true })
  db = new Database(path)
  // Vercel 无服务器磁盘上 WAL 偶发问题，用 DELETE 更稳
  db.pragma(process.env.VERCEL === '1' ? 'journal_mode = DELETE' : 'journal_mode = WAL')
  initSchema(db)
  return db
}

function initSchema(database) {
  database.exec(`
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

  const seed = database.prepare(`INSERT OR REPLACE INTO games (id, title) VALUES (?, ?)`)
  seed.run(1, 'COBB CAN MOVE')
  seed.run(2, 'The Freak Circus')
  seed.run(3, 'Granny Horror')
}
