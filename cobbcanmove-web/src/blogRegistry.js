import allPosts from '@/data/blog.js'

/** 博客文章在站内路径：/blog/<slug>；slug 取自各条目的 addressBar；外链勿用此字段 */
export function normalizeBlogSlug(bar) {
  if (!bar || typeof bar !== 'string') return ''
  const t = bar.trim()
  if (/^https?:\/\//i.test(t)) return ''
  return t.replace(/^\/+|\/+$/g, '').replace(/^blog\/?/i, '')
}

export function findPostById(rawId) {
  const id = Number.parseInt(String(rawId), 10)
  if (Number.isNaN(id)) return null
  return allPosts.find((p) => p.id === id) ?? null
}

export function findPostBySlug(slug) {
  const s = normalizeBlogSlug(slug)
  if (!s) return null
  return allPosts.find((p) => normalizeBlogSlug(p.addressBar) === s) ?? null
}

export function listPosts() {
  return allPosts
}
