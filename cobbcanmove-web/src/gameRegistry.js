import allGames from '@/data/games.js'

/** 首页主推在评论 API 中的 game_id（与后端 games 表 id=1 一致） */
export const HOME_HUB_GAME_ID = 1

/** 将 addressBar 规范为 URL 路径段（不含前导 /；外链返回空） */
export function slugSegmentFromAddressBar(addressBar) {
  const t = String(addressBar ?? '').trim()
  if (!t || t === '/') return ''
  if (/^https?:\/\//i.test(t)) return ''
  return t.replace(/^\/+/, '').split('/').filter(Boolean)[0] || ''
}

export function gamePathSlug(game) {
  if (!game) return ''
  return slugSegmentFromAddressBar(game.addressBar)
}

/** 按数字 id 查找（仅 games.js 中的条目） */
export function findGameById(rawId) {
  const id = Number.parseInt(String(rawId), 10)
  if (Number.isNaN(id)) return null
  return allGames.find((g) => g.id === id) ?? null
}

/** 按地址栏 slug 查找（与路由 /games/:slug 一致） */
export function findGameBySlug(rawSlug) {
  const want = String(rawSlug || '').trim().toLowerCase()
  if (!want) return null
  return (
    allGames.find((g) => slugSegmentFromAddressBar(g.addressBar).toLowerCase() === want) ?? null
  )
}

/** 供后台等：含首页主推 + 数据文件中的游戏 */
export function listGames() {
  return [{ id: HOME_HUB_GAME_ID, title: 'COBB CAN MOVE' }, ...allGames.map((g) => ({ id: g.id, title: g.title }))]
}
