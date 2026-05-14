import allGames from '@/data/games.js'

/** 主游戏（首页展示）的 id，与 games.js 数组首项一致 */
export function getMainGameId() {
  return allGames[0]?.id ?? null
}

/** 按路由参数解析 id 查找游戏 */
export function findGameById(rawId) {
  const id = Number.parseInt(String(rawId), 10)
  if (Number.isNaN(id)) return null
  return allGames.find((g) => g.id === id) ?? null
}

/** 供后台筛选等：全部游戏 id 与标题 */
export function listGames() {
  return allGames.map((g) => ({ id: g.id, title: g.title }))
}
