/** 生产规范域名（预发可用 VITE_SITE_ORIGIN 覆盖） */
export const SITE_ORIGIN = (import.meta.env.VITE_SITE_ORIGIN || 'https://cobbcanmove.site').replace(/\/$/, '')

export const SITE_NAME = 'COBB CAN MOVE Hub'

export const SITE_TAGLINE =
  'Top-down survival horror in your browser: coal, light, and Cobb in Story & Endless. Free play, curated indie games, and guides on the COBB CAN MOVE Hub.'

export const AUTHOR_NAME = 'COBB CAN MOVE Hub'

/** JSON-LD Organization.sameAs（有官方社交账号时再填） */
export const SOCIAL_SAME_AS = []

/** Open Graph / Twitter 默认图（与站内 logo / 主视觉一致） */
export const DEFAULT_OG_IMAGE_PATH = '/images/logo.png'

/** 无 @ 的 X 账号名；有品牌账号时再填 */
export const TWITTER_SITE_HANDLE = ''

export function absoluteUrl(pathname) {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${SITE_ORIGIN}${path}`
}

export function absoluteOgImage(imageSrc) {
  if (!imageSrc) return absoluteUrl(DEFAULT_OG_IMAGE_PATH)
  if (/^https?:\/\//i.test(imageSrc)) return imageSrc
  return absoluteUrl(imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`)
}
