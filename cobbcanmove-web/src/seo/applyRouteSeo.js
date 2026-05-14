/**
 * 全站 SEO：TDK、canonical、OG/Twitter、JSON-LD（对齐 superbattlegolf-web documentMeta 思路）
 */
import { findGameBySlug } from '@/gameRegistry.js'
import { findPostBySlug } from '@/blogRegistry.js'
import {
  AUTHOR_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  TWITTER_SITE_HANDLE,
  absoluteOgImage,
  absoluteUrl,
} from './siteConfig.js'
import {
  articleNode,
  downloadPageGraph,
  organizationNode,
  toJsonLdGraph,
  videoGameHubNode,
  webPageNode,
  websiteNode,
} from './jsonLd.js'

const ITCH_STORE_URL = 'https://abho.itch.io/cobb-can-move'

const DOWNLOAD_FLAGSHIP = {
  title: 'COBB CAN MOVE',
  description:
    'Survival horror from above: survive a dark pixel dungeon, keep coal-fed light alive, and escape Cobb as the rules change every level.',
  tags: ['Survival Horror', 'Roguelite', 'Pixel Art', 'Browser'],
  publishDate: '2025',
  imageUrl: '/images/about-img.webp',
  imageAlt: 'Dark corridor with cold light, suggesting the in-game dungeon',
}

const DEFAULT_KEYWORDS =
  'COBB CAN MOVE, Cobb Can Move, survival horror, roguelite, browser game, pixel art, indie horror hub, Story Mode, Endless Mode, Cobb, cobbcanmove.site'

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

/** 将 games/blog 的 publishDate（如 2026-05、2025、Web）规范为 ISO 8601 字符串 */
export function publishDateToIso8601(publishDate, fallbackDay = todayIsoDate()) {
  const s = String(publishDate ?? '').trim()
  if (!s || s === 'Web') return `${fallbackDay}T12:00:00.000Z`
  if (/^\d{4}-\d{2}$/.test(s)) return `${s}-01T12:00:00.000Z`
  if (/^\d{4}$/.test(s)) return `${s}-01-01T12:00:00.000Z`
  return `${fallbackDay}T12:00:00.000Z`
}

function setMeta(attribute, name, content) {
  if (content === undefined || content === null) return
  let el = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setAlternateHreflang(hreflang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function injectJsonLd(data) {
  const existing = document.querySelector('script[data-seo-ld="1"]')
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-ld', '1')
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * @param {object} p
 * @param {string} p.title
 * @param {string} p.description
 * @param {string} [p.keywords]
 * @param {string} p.canonicalUrl
 * @param {string} p.ogImageAbs
 * @param {string} [p.ogType]
 * @param {object} p.jsonLd
 * @param {string} [p.robots]
 */
export function applyDocumentSeo({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImageAbs,
  ogType,
  jsonLd,
  robots = 'index, follow',
}) {
  document.documentElement.lang = 'en'
  document.title = title

  setMeta('name', 'description', description)
  setMeta('name', 'keywords', keywords ?? DEFAULT_KEYWORDS)
  setMeta('name', 'author', AUTHOR_NAME)
  setMeta('name', 'robots', robots)
  setMeta('name', 'googlebot', robots.includes('noindex') ? 'noindex, nofollow' : 'index, follow')

  setMeta('property', 'og:site_name', SITE_NAME)
  setMeta('property', 'og:type', ogType || 'website')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:locale', 'en_US')
  setMeta('property', 'og:image', ogImageAbs)
  setMeta('property', 'og:image:alt', typeof title === 'string' ? title : '')

  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', ogImageAbs)

  if (TWITTER_SITE_HANDLE) {
    const at = `@${TWITTER_SITE_HANDLE.replace(/^@/, '')}`
    setMeta('name', 'twitter:site', at)
    setMeta('name', 'twitter:creator', at)
  }

  setCanonical(canonicalUrl)
  setAlternateHreflang('en', canonicalUrl)
  setAlternateHreflang('x-default', canonicalUrl)

  injectJsonLd(jsonLd)
}

function metaFromRoute(route) {
  const m = route.meta
  const title = typeof m?.title === 'string' && m.title.length ? m.title : `${SITE_NAME} | Hub`
  const description =
    typeof m?.description === 'string' && m.description.length ? m.description : SITE_TAGLINE
  const keywords = typeof m?.keywords === 'string' && m.keywords.length ? m.keywords : DEFAULT_KEYWORDS
  return { title, description, keywords }
}

function isHttpUrl(s) {
  return /^https?:\/\//i.test(String(s || '').trim())
}

/**
 * @param {import('vue-router').RouteLocationNormalizedLoaded} route
 */
export function applyRouteSeo(route) {
  const path = route.path
  const canonicalUrl = absoluteUrl(path)
  const name = route.name

  if (name === 'admin') {
    const { title, description, keywords } = metaFromRoute(route)
    const ld = toJsonLdGraph(organizationNode(), websiteNode())
    applyDocumentSeo({
      title,
      description,
      keywords,
      canonicalUrl,
      ogImageAbs: absoluteOgImage(),
      ogType: 'website',
      jsonLd: ld,
      robots: 'noindex, nofollow',
    })
    return
  }

  let keywords = DEFAULT_KEYWORDS
  let ogType = 'website'
  let ogImage = absoluteOgImage()
  let title
  let description
  /** @type {Record<string, unknown>[]} */
  let jsonLdNodes

  if (name === 'game-detail') {
    const slug = typeof route.params.slug === 'string' ? route.params.slug : ''
    const g = findGameBySlug(slug)
    if (g) {
      title = (g.seo && g.seo.title) || `${g.title} | ${SITE_NAME}`
      description = (g.seo && g.seo.description) || g.description
      keywords = (g.seo && g.seo.keywords) || keywords
      ogType = 'website'
      ogImage = absoluteOgImage(g.imageUrl)
      const playUrl = g.iframeUrl || (isHttpUrl(g.addressBar) ? String(g.addressBar).trim() : '')
      jsonLdNodes = [
        organizationNode(),
        websiteNode(),
        webPageNode({ path, name: g.title, description }),
        videoGameHubNode({
          path,
          name: g.title,
          description,
          genre: g.tags,
          imageSrc: g.imageUrl,
          playUrl,
        }),
      ]
    } else {
      title = 'Game not found — COBB CAN MOVE Hub'
      description =
        'That game page is missing on the COBB CAN MOVE Hub. Open More Games for curated browser horror and indie titles—screenshots, play links, and FAQs in one list.'
      jsonLdNodes = [organizationNode(), websiteNode(), webPageNode({ path, name: title, description })]
    }
  } else if (name === 'blog-post') {
    const slug = typeof route.params.slug === 'string' ? route.params.slug : ''
    const p = findPostBySlug(slug)
    if (p) {
      title = (p.seo && p.seo.title) || `${p.title} | ${SITE_NAME}`
      description = (p.seo && p.seo.description) || p.description
      keywords = (p.seo && p.seo.keywords) || keywords
      ogType = 'article'
      ogImage = absoluteOgImage(p.imageUrl)
      const iso = publishDateToIso8601(p.publishDate)
      jsonLdNodes = [
        organizationNode(),
        websiteNode(),
        webPageNode({ path, name: p.title, description }),
        articleNode({
          path,
          headline: p.title,
          description,
          datePublished: iso,
          dateModified: iso,
          imageSrc: p.imageUrl,
        }),
      ]
    } else {
      title = 'Blog post not found — COBB CAN MOVE Hub'
      description =
        'We could not find that blog post on the COBB CAN MOVE Hub. Open the blog index for COBB CAN MOVE guides, Story tips, and survival horror notes before you play.'
      jsonLdNodes = [organizationNode(), websiteNode(), webPageNode({ path, name: title, description })]
    }
  } else if (name === 'download') {
    const m = metaFromRoute(route)
    title = m.title
    description = m.description
    keywords = m.keywords
    ogImage = absoluteOgImage(DOWNLOAD_FLAGSHIP.imageUrl)
    jsonLdNodes = downloadPageGraph({
      path,
      pageTitle: title,
      pageDescription: description,
      game: DOWNLOAD_FLAGSHIP,
      storeUrl: ITCH_STORE_URL,
    })
  } else {
    const m = metaFromRoute(route)
    title = m.title
    description = m.description
    keywords = m.keywords

    if (name === 'home') {
      jsonLdNodes = [organizationNode(), websiteNode(), webPageNode({ path: '/', name: title, description })]
    } else {
      jsonLdNodes = [organizationNode(), websiteNode(), webPageNode({ path, name: title, description })]
    }
  }

  const ld = toJsonLdGraph(...jsonLdNodes)

  applyDocumentSeo({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImageAbs: ogImage,
    ogType,
    jsonLd: ld,
  })
}
