<template>
  <main v-if="game" id="top">
    <section class="detail-breadcrumb-section" aria-label="Breadcrumb">
      <div class="container">
        <div class="detail-breadcrumb-content">
          <nav class="detail-breadcrumb">
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            <span aria-hidden="true">/</span>
            <RouterLink :to="{ name: 'more-games' }">More Games</RouterLink>
            <span aria-hidden="true">/</span>
            <span class="detail-breadcrumb-current">{{ game.title }}</span>
          </nav>
        </div>
      </div>
    </section>

    <!-- 标题与元信息：不抢 iframe 主体 -->
    <section class="detail-title-section" :aria-labelledby="heroHeadingId">
      <div class="container">
        <div class="detail-title-content">
          <p class="detail-title-eyebrow">{{ game.publishDate }}</p>
          <h1 :id="heroHeadingId">{{ game.title }}</h1>
          <p class="detail-title-lead">{{ game.description }}</p>
          <ul class="tag-row" aria-label="Tags">
            <li v-for="tag in game.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="detail-title-actions">
            <RouterLink class="btn-ghost" :to="{ name: 'home', hash: '#play' }">{{ hubMainGame.title }}</RouterLink>
            <a
              v-if="playTarget"
              class="btn-primary"
              :href="playTarget"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ game.iframeUrl ? 'Open in new tab' : 'Open official link' }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 游戏主体：内嵌 iframe 优先；无地址时占位 -->
    <section id="play" class="detail-play-section" aria-labelledby="detail-play-heading">
      <div class="container">
        <header class="section-heading detail-play-heading">
          <h2 id="detail-play-heading">Play {{ game.title }}</h2>
        </header>
        <div v-if="game.iframeUrl" class="play-frame-wrap">
          <GameEmbedWithOverlay
            :key="String(game.id)"
            frame-variant="detail"
            :iframe-url="game.iframeUrl"
            :cover-image-url="game.imageUrl"
            :cover-image-alt="game.imageAlt"
            :game-title="game.title"
          />
        </div>

        <div v-else class="play-frame-wrap play-frame-wrap--fallback">
          <div class="play-fallback-inner">
            <p class="play-fallback-title">Browser player unavailable</p>
            <p class="play-fallback-text">
              An in-page player will appear here when a web build is linked. If a launch link is offered below, you can still open the game in a new tab.
            </p>
            <a
              v-if="game.addressBar"
              class="btn-primary"
              :href="game.addressBar"
              rel="noopener noreferrer"
              target="_blank"
              >Launch game</a
            >
          </div>
        </div>
      </div>
    </section>

    <section id="info" class="detail-info-section" aria-labelledby="detail-info-heading">
      <div class="container">
        <div class="detail-info-content">
          <header class="section-heading">
            <h2 id="detail-info-heading">Game information</h2>
            <p>Overview, modes, and how it plays.</p>
          </header>
          <div class="detail-rich" v-html="game.detailsHtml" />
          <div v-if="game.reviewsEnabled" class="detail-info-reviews-wrap">
            <div class="detail-info-reviews-head">
              <span class="detail-info-reviews-kicker">Player scores</span>
              <RouterLink class="detail-info-reviews-link" :to="{ name: 'comments' }">Hub comments</RouterLink>
            </div>
            <GameReviewsSection :game-id="game.id" :game-title="game.title" />
          </div>
        </div>
      </div>
    </section>

    <!-- 截图：无数组时用封面兜底 -->
    <section class="detail-shots-section" aria-labelledby="detail-shots-heading">
      <div class="container">
        <div class="detail-shots-content">
          <header class="section-heading">
            <h2 id="detail-shots-heading">Screenshots</h2>
            <p v-if="!rawScreenshots.length">Extra shots will show here when they are added; for now we use cover art.</p>
          </header>
          <div class="shots-grid">
            <figure v-for="(shot, index) in displayShots" :key="index" class="shots-figure">
              <div class="shots-frame">
                <img :src="shot.imageUrl" :alt="shot.imageAlt" width="640" height="360" loading="lazy" />
              </div>
              <figcaption v-if="shot.caption">{{ shot.caption }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ：数据驱动，答案支持 v-html -->
    <section class="detail-faq-section" aria-labelledby="detail-faq-heading">
      <div class="container">
        <div class="detail-faq-content">
          <header class="section-heading">
            <h2 id="detail-faq-heading">FAQ</h2>
            <p>Common questions for this title.</p>
          </header>
          <div v-if="faqList.length" class="faq-list">
            <article v-for="(item, index) in faqList" :key="index" class="faq-item">
              <h3 class="faq-q">{{ item.question }}</h3>
              <div class="faq-answer" v-html="item.answerHtml" />
            </article>
          </div>
          <p v-else class="faq-empty">No questions have been published for this game yet.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import games from '@/data/games.js'
import { findGameById } from '@/gameRegistry.js'
import GameReviewsSection from '@/components/GameReviewsSection.vue'
import GameEmbedWithOverlay from '@/components/GameEmbedWithOverlay.vue'

const route = useRoute()

/** 与 games.js 首条一致：主推 / 首页试玩 */
const hubMainGame = games[0]

const game = computed(() => findGameById(route.params.id))
const heroHeadingId = 'game-detail-title'

const rawScreenshots = computed(() => game.value?.screenshots ?? [])

const displayShots = computed(() => {
  const g = game.value
  if (!g) return []
  if (rawScreenshots.value.length) return rawScreenshots.value
  return [
    {
      imageUrl: g.imageUrl,
      imageAlt: g.imageAlt,
      caption: 'Key art (add screenshots[] for a full gallery).',
    },
  ]
})

const faqList = computed(() => game.value?.faq ?? [])

const playTarget = computed(() => {
  const g = game.value
  if (!g) return ''
  if (g.iframeUrl) return g.iframeUrl
  if (g.addressBar) return g.addressBar
  return ''
})

function applyGameSeo(g) {
  if (!g?.seo) return
  const { title, description, keywords } = g.seo
  document.title = title
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', description)
  let metaKw = document.querySelector('meta[name="keywords"]')
  if (!metaKw) {
    metaKw = document.createElement('meta')
    metaKw.setAttribute('name', 'keywords')
    document.head.appendChild(metaKw)
  }
  metaKw.setAttribute('content', keywords)
}

watch(
  () => game.value?.id,
  (id) => {
    if (id) applyGameSeo(game.value)
  },
  { immediate: true },
)
</script>

<style scoped>
main {
  display: block;
}

.detail-breadcrumb-section {
  padding-block: 1rem 0;
}

.detail-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.detail-breadcrumb a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 600;
}

.detail-breadcrumb a:hover {
  color: var(--color-accent);
}

.detail-breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
}

.detail-title-section {
  padding-block: clamp(0.75rem, 2vw, 1.25rem) clamp(1.25rem, 3vw, 2rem);
}

.detail-title-content {
  max-width: 900px;
}

.detail-title-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.5rem;
}

.detail-title-lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  max-width: 62ch;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tag-row li {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklch, var(--color-text) 18%, transparent);
  font-size: 0.85rem;
}

.detail-title-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn-primary {
  background: linear-gradient(
    120deg,
    color-mix(in oklch, var(--color-accent) 85%, white),
    var(--color-accent)
  );
  color: oklch(16% 0.04 285);
  box-shadow: 0 12px 40px color-mix(in oklch, var(--color-accent) 35%, transparent);
}

.btn-primary:hover {
  color: oklch(12% 0.05 285);
}

.btn-ghost {
  border-color: color-mix(in oklch, var(--color-text) 22%, transparent);
  color: var(--color-text);
}

.btn-ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.detail-play-section {
  padding-block: 0 clamp(2rem, 4vw, 3rem);
}

.detail-info-section,
.detail-shots-section,
.detail-faq-section {
  padding-block: clamp(2rem, 4vw, 3rem);
}

.detail-info-content {
  min-width: 0;
}

.detail-info-reviews-wrap {
  margin-top: clamp(1.75rem, 3vw, 2.5rem);
  padding: 0.75rem 0.85rem 0.9rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 55%, black);
}

.detail-info-reviews-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
}

.detail-info-reviews-kicker {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-2);
}

.detail-info-reviews-link {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-decoration: none;
  white-space: nowrap;
}

.detail-info-reviews-link:hover {
  color: var(--color-accent);
}

.section-heading {
  max-width: 720px;
  margin-bottom: 1.25rem;
}

.section-heading p {
  color: var(--color-text-muted);
}

.play-frame-wrap {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 16%, transparent);
  background: black;
  min-height: min(78vh, 820px);
  box-shadow: 0 25px 80px color-mix(in oklch, black 55%, transparent);
}

.play-frame-wrap--fallback {
  display: grid;
  place-items: center;
  background: color-mix(in oklch, var(--color-surface) 88%, black);
}

.play-fallback-inner {
  max-width: 42ch;
  padding: 2rem 1.5rem;
  text-align: center;
}

.play-fallback-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
}

.play-fallback-text {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin: 0 0 1.25rem;
}

.detail-rich :deep(p),
.detail-rich :deep(li) {
  color: var(--color-text-muted);
}

.detail-rich :deep(h2),
.detail-rich :deep(h3) {
  font-family: var(--font-display);
  color: var(--color-text);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.detail-rich :deep(ul),
.detail-rich :deep(ol) {
  margin: 0 0 1em;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
}

.detail-rich :deep(a) {
  color: var(--color-accent);
}

.shots-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.shots-figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.shots-frame {
  border-radius: 0.85rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: var(--color-surface);
  aspect-ratio: 16 / 9;
}

.shots-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shots-figure figcaption {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.faq-list {
  display: grid;
  gap: 1rem;
}

.faq-item {
  border-radius: 0.85rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: color-mix(in oklch, var(--color-surface) 75%, transparent);
  padding: 1rem 1.15rem;
}

.faq-q {
  margin: 0 0 0.6rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

.faq-answer {
  margin: 0;
}

.faq-answer :deep(p) {
  color: var(--color-text-muted);
  margin: 0 0 0.5em;
}

.faq-answer :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-empty {
  color: var(--color-text-muted);
  max-width: 52ch;
}

code {
  font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
  font-size: 0.92em;
  color: var(--color-accent-2);
}

@media (max-width: 900px) {
  .shots-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .shots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
