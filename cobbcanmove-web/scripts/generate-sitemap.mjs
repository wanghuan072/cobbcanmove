#!/usr/bin/env node
/**
 * sitemap.xml + robots.txt（与 Vite 构建插件共用 writeSitemapBundle）
 * 运行：npm run generate-sitemap
 * 环境：VITE_SITE_ORIGIN（可选，默认 https://cobbcanmove.site）
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import games from '../src/data/games.js'
import blogPosts from '../src/data/blog.js'

function slugSegmentFromAddressBar(addressBar) {
  const t = String(addressBar ?? '').trim()
  if (!t || t === '/') return ''
  if (/^https?:\/\//i.test(t)) return ''
  return t.replace(/^\/+/, '').split('/').filter(Boolean)[0] || ''
}

function normalizeBlogSlug(bar) {
  if (!bar || typeof bar !== 'string') return ''
  const t = bar.trim()
  if (/^https?:\/\//i.test(t)) return ''
  return t.replace(/^\/+|\/+$/g, '').replace(/^blog\/?/i, '')
}

const BASE_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/more-games', priority: 0.9, changefreq: 'weekly' },
  { path: '/comments', priority: 0.75, changefreq: 'weekly' },
  { path: '/download', priority: 0.95, changefreq: 'weekly' },
  { path: '/blog', priority: 0.85, changefreq: 'weekly' },
  { path: '/privacy-policy', priority: 0.35, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.35, changefreq: 'yearly' },
  { path: '/copyright', priority: 0.35, changefreq: 'yearly' },
  { path: '/about-us', priority: 0.5, changefreq: 'monthly' },
  { path: '/contact-us', priority: 0.5, changefreq: 'monthly' },
]

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function publishDateToLastmod(publishDate) {
  const s = String(publishDate ?? '').trim()
  const today = todayIsoDate()
  if (!s || s === 'Web') return today
  if (/^\d{4}-\d{2}$/.test(s)) return `${s}-01`
  if (/^\d{4}$/.test(s)) return `${s}-01-01`
  return today
}

function generateUrlXml(loc, lastmod, priority, changefreq) {
  const p = Number(priority).toFixed(1)
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${p}</priority>
  </url>`
}

function collectSitemapEntries(siteOrigin) {
  const base = siteOrigin.replace(/\/$/, '')
  const entries = []
  const today = todayIsoDate()

  for (const route of BASE_ROUTES) {
    entries.push({
      loc: new URL(route.path, `${base}/`).href,
      lastmod: today,
      priority: route.priority,
      changefreq: route.changefreq,
    })
  }

  for (const g of games) {
    const slug = slugSegmentFromAddressBar(g.addressBar)
    if (!slug) continue
    entries.push({
      loc: new URL(`/games/${slug}`, `${base}/`).href,
      lastmod: publishDateToLastmod(g.publishDate),
      priority: 0.88,
      changefreq: 'weekly',
    })
  }

  for (const post of blogPosts) {
    const slug = normalizeBlogSlug(post.addressBar)
    if (!slug) continue
    entries.push({
      loc: new URL(`/blog/${slug}`, `${base}/`).href,
      lastmod: publishDateToLastmod(post.publishDate),
      priority: 0.82,
      changefreq: 'monthly',
    })
  }

  return entries
}

function buildSitemapXml(siteOrigin, entries) {
  const blocks = entries.map((e) => generateUrlXml(e.loc, e.lastmod, e.priority, e.changefreq)).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${blocks}
</urlset>
`
}

function buildRobotsTxt(siteOrigin) {
  const base = siteOrigin.replace(/\/$/, '')
  const sitemapUrl = new URL('/sitemap.xml', `${base}/`).href
  return `User-agent: *
Allow: /

Disallow: /admin

Sitemap: ${sitemapUrl}
`
}

/**
 * @param {string} outDir
 * @param {string} [siteOrigin]
 */
export function writeSitemapBundle(outDir, siteOrigin = process.env.VITE_SITE_ORIGIN || 'https://cobbcanmove.site') {
  const origin = siteOrigin.replace(/\/$/, '')
  const entries = collectSitemapEntries(origin)
  const xml = buildSitemapXml(origin, entries)
  const robots = buildRobotsTxt(origin)

  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf8')
  writeFileSync(join(outDir, 'robots.txt'), robots, 'utf8')

  return { count: entries.length, outDir, xml }
}

function runCli() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const rootDir = join(__dirname, '..')
  const publicDir = join(rootDir, 'public')
  const distDir = join(rootDir, 'dist')

  console.log('Loading data & generating sitemap...')

  const { count, outDir, xml } = writeSitemapBundle(publicDir)
  console.log(`Wrote ${count} URLs -> ${join(outDir, 'sitemap.xml')}`)
  console.log(`Wrote robots.txt -> ${join(outDir, 'robots.txt')}`)

  if (existsSync(distDir)) {
    writeSitemapBundle(distDir)
    console.log(`Also wrote sitemap + robots -> ${distDir} (dist existed)`)
  }

  const valid =
    xml.includes('<?xml') && xml.includes('<urlset') && xml.includes('</urlset>') && xml.includes('xmlns:xhtml')
  console.log(valid ? 'Sitemap XML structure OK.' : 'Warning: sitemap XML may be incomplete.')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli()
}
