/**
 * itch.io 下载链接（主推游戏在 games.js 中配置 itchIo）。
 * 若配置了 storeUrl 则直达商店页，否则用 searchQuery 或 title 作为 itch.io 搜索关键词。
 * @param {{ title: string, itchIo?: { storeUrl?: string, searchQuery?: string } }} game
 */
export function getItchDownloadHref(game) {
  const direct = game.itchIo?.storeUrl?.trim()
  if (direct) return direct
  const q = game.itchIo?.searchQuery?.trim() || game.title?.trim() || 'indie game'
  return `https://itch.io/search?q=${encodeURIComponent(q)}`
}

/** 面向玩家的按钮/链接文案 */
export function getItchCtaLabel(game) {
  if (game.itchIo?.storeUrl?.trim()) return `Download ${game.title} on itch.io`
  return `Find ${game.title} on itch.io`
}
