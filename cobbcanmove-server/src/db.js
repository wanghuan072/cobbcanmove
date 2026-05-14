import Database from 'better-sqlite3'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

let db

/**
 * Game(1) ──< Comment：每条评论归属一个 game_id，可选 1–5 星评分
 */
export function getDb() {
  if (db) return db
  const path = resolve(process.env.SQLITE_PATH || resolve(__dirname, '../data/hub.sqlite'))
  mkdirSync(dirname(path), { recursive: true })
  db = new Database(path)
  db.pragma('journal_mode = WAL')
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
