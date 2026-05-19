<template>
  <main id="top">
    <section class="page-hero-section" aria-labelledby="page-hero-heading">
      <div class="container">
        <div class="page-hero-content">
          <p class="page-hero-eyebrow">Directory</p>
          <h1 id="page-hero-heading">More games</h1>
          <p class="page-hero-lead">
            Everything hosted here in one place—each card opens that game’s hub page. The whole card is clickable.
          </p>
        </div>
      </div>
    </section>

    <section class="games-page-section" aria-labelledby="games-page-heading">
      <div class="container">
        <div class="games-page-content">
          <header class="section-heading">
            <h2 id="games-page-heading">All listings</h2>
            <p>Each tile opens its game page. The whole card is clickable.</p>
          </header>
          <div class="games-grid">
            <RouterLink
              v-for="game in allGames"
              :key="game.id"
              class="game-card"
              :to="{ name: 'game-detail', params: { slug: gamePathSlug(game) } }"
              :aria-label="`${game.title} — view game page`"
            >
              <div class="game-card-thumb">
                <img :src="game.imageUrl" :alt="game.imageAlt" width="520" height="320" loading="lazy" />
              </div>
              <div class="game-card-body">
                <div class="game-card-meta">
                  <span>{{ game.publishDate }}</span>
                  <span v-if="!isPlayable(game)" class="pill">Soon</span>
                </div>
                <h3>{{ game.title }}</h3>
                <p class="game-card-desc">{{ game.description }}</p>
                <ul class="tag-row muted" aria-label="Tags">
                  <li v-for="tag in game.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import games from '@/data/games.js'
import { gamePathSlug } from '@/gameRegistry.js'

const allGames = games

function isPlayable(game) {
  return Boolean(game.iframeUrl || game.addressBar)
}
</script>

<style scoped>
main {
  display: block;
}

.page-hero-section {
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.page-hero-content {
  max-width: 62ch;
}

.page-hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.65rem;
}

.page-hero-lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

.games-page-section {
  padding-block: 0  clamp(2.5rem, 5vw, 4rem);
}

.section-heading {
  max-width: 720px;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.section-heading p {
  color: var(--color-text-muted);
}

.games-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
}

.game-card {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.game-card:hover {
  border-color: color-mix(in oklch, var(--color-accent) 38%, transparent);
  box-shadow: 0 14px 44px color-mix(in oklch, black 42%, transparent);
}

.game-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.game-card-thumb {
  flex-shrink: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: black;
}

.game-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-card-body {
  padding: 1rem 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.65rem;
  min-height: 0;
}

.game-card-desc {
  flex: 1 1 auto;
  margin: 0;
  color: var(--color-text-muted);
}

.game-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.game-card-body .tag-row {
  margin-top: 0;
}

.game-card-body h3 {
  margin: 0;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag-row li {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklch, var(--color-text) 18%, transparent);
  font-size: 0.85rem;
}

.tag-row.muted li {
  color: var(--color-text-muted);
}

.pill {
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklch, var(--color-accent) 45%, transparent);
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pill-featured {
  border-color: color-mix(in oklch, var(--color-accent-2) 55%, transparent);
  color: var(--color-accent-2);
}

code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
  color: var(--color-accent-2);
}

@media (max-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>
