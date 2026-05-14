import pg from 'pg'

const { Pool } = pg

let pool
let readyPromise

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ''
  ).trim()
}

async function initDb() {
  const url = getDatabaseUrl()
  if (!url) {
    const hasKey = Boolean(
      process.env.DATABASE_URL != null ||
        process.env.POSTGRES_URL != null ||
        process.env.POSTGRES_PRISMA_URL != null,
    )
    const hint = hasKey
      ? 'DATABASE_URL（或 POSTGRES_URL）已声明但为空，请在 cobbcanmove-server/.env 的等号后粘贴 Neon 的 postgresql:// 整段连接串并保存。'
      : '未读取到 DATABASE_URL：请在本仓库的 cobbcanmove-server/.env 中添加一行 DATABASE_URL=postgresql://...（从 Neon 控制台复制）。若用 npm run dev 同时起前后端，请确认 .env 在 cobbcanmove-server 目录下。'
    throw new Error(hint)
  }

  pool = new Pool({
    connectionString: url,
    max: 10,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 15_000,
  })

  await pool.query(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id BIGSERIAL PRIMARY KEY,
      game_id INTEGER NOT NULL REFERENCES games (id) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      rating INTEGER CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_comments_game_status ON comments (game_id, status)
  `)

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_comments_created ON comments (created_at DESC)
  `)

  const upsertGame = `INSERT INTO games (id, title) VALUES ($1, $2)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title`
  for (const row of [
    [1, 'COBB CAN MOVE'],
    [2, 'The Freak Circus'],
    [3, 'Granny Horror'],
  ]) {
    await pool.query(upsertGame, row)
  }
}

function getPool() {
  if (!pool) throw new Error('Database pool not initialized')
  return pool
}

export function getReady() {
  if (!readyPromise) {
    readyPromise = initDb()
  }
  return readyPromise
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qGet(sql, args = []) {
  const r = await getPool().query(sql, args)
  return r.rows[0]
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qAll(sql, args = []) {
  const r = await getPool().query(sql, args)
  return r.rows
}

/** @param {string} sql @param {unknown[]} [args] */
export async function qRun(sql, args = []) {
  const r = await getPool().query(sql, args)
  const id = r.rows?.[0]?.id
  return {
    changes: r.rowCount ?? 0,
    lastInsertRowid: id != null ? Number(id) : 0,
  }
}
