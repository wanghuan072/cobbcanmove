import {
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TAGLINE,
  SOCIAL_SAME_AS,
  absoluteUrl,
  absoluteOgImage,
} from './siteConfig.js'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`

export function organizationNode() {
  const node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    description: SITE_TAGLINE,
    logo: {
      '@type': 'ImageObject',
      url: absoluteOgImage(),
    },
  }
  if (SOCIAL_SAME_AS.length) {
    node.sameAs = [...SOCIAL_SAME_AS]
  }
  return node
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

export function webPageNode({ path, name, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

export function articleNode({ path, headline, description, datePublished, dateModified, imageSrc }) {
  const images = imageSrc ? [absoluteOgImage(imageSrc)] : [absoluteOgImage()]
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    image: images,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

/**
 * 游戏详情：站内聚合页 + 可玩入口（iframe 或外链）
 * @param {{ path: string, name: string, description: string, genre?: string[], imageSrc?: string, playUrl?: string }} p
 */
export function videoGameHubNode({ path, name, description, genre, imageSrc, playUrl }) {
  const node = {
    '@type': 'VideoGame',
    '@id': `${absoluteUrl(path)}#videogame`,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'en',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
  if (genre?.length) node.genre = genre
  if (imageSrc) node.image = absoluteOgImage(imageSrc)
  if (playUrl && /^https?:\/\//i.test(playUrl)) {
    node.gamePlatform = ['https://schema.org/WebBrowser']
    node.playUrl = playUrl
  }
  return node
}

/**
 * 下载页：itch 商店 + 主推游戏
 */
export function downloadPageGraph({ path, pageTitle, pageDescription, game, storeUrl }) {
  const pageUrl = absoluteUrl(path)
  const image = game.imageUrl ? absoluteOgImage(game.imageUrl) : absoluteOgImage()
  const videoGame = {
    '@type': 'VideoGame',
    '@id': `${pageUrl}#game`,
    name: game.title,
    description: game.description,
    genre: game.tags,
    url: storeUrl,
    image,
    offers: {
      '@type': 'Offer',
      url: storeUrl,
      availability: 'https://schema.org/OnlineOnly',
    },
  }
  return [
    organizationNode(),
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: 'en',
      about: { '@id': `${pageUrl}#game` },
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
    },
    videoGame,
  ]
}

export function toJsonLdGraph(...nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}
