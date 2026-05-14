<template>
  <main id="top">
    <section class="page-hero-section" aria-labelledby="download-hero-heading">
      <div class="container">
        <p class="page-hero-eyebrow">Players · itch.io · flagship</p>
        <h1 id="download-hero-heading">COBB CAN MOVE Download</h1>
        <p class="page-hero-lead">
          This hub is built around <strong>{{ flagship.title }}</strong>. Want a desktop build, archives, or a
          pay-what-you-want drop? The button below opens itch.io using the
          <strong>official game name plus curated keywords</strong> so you land on the right store page even when
          filenames change.
        </p>
        <p class="page-hero-note">
          itch.io is a third-party store; this site is not affiliated unless a direct itch URL is published in hub
          data. Links open in a new tab.
        </p>
      </div>
    </section>

    <section class="download-list-section" aria-labelledby="download-list-heading">
      <div class="container">
        <header class="section-heading">
          <h2 id="download-list-heading">{{ flagship.title }} on itch.io</h2>
          <p>
            Same survival-horror roguelite you can play in the browser from the home page—here we point players who
            prefer itch.io installs or bundles.
          </p>
        </header>

        <article class="download-card" aria-labelledby="dl-title-main">
          <div class="download-card-media">
            <img :src="flagship.imageUrl" :alt="flagship.imageAlt" width="520" height="320" loading="lazy" />
          </div>
          <div class="download-card-body">
            <p class="download-card-meta">
              <span>{{ flagship.publishDate }}</span>
              <span class="pill pill-featured">Hub flagship</span>
            </p>
            <h3 id="dl-title-main">{{ flagship.title }}</h3>
            <p class="download-card-desc">{{ flagship.description }}</p>
            <ul class="tag-row muted" aria-label="Game tags">
              <li v-for="tag in flagship.tags" :key="tag">{{ tag }}</li>
            </ul>
            <div class="download-card-actions">
              <a
                class="btn-download"
                :href="itchUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${itchCtaLabel} (opens in new tab)`"
              >
                {{ itchCtaLabel }}
              </a>
              <RouterLink class="btn-download-ghost" :to="{ name: 'home', hash: '#play' }">
                Play in browser
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="download-faq-section" aria-labelledby="download-faq-heading">
      <div class="container">
        <header class="section-heading">
          <h2 id="download-faq-heading">Before you download</h2>
        </header>
        <ul class="download-faq-list">
          <li>
            <h3>Why itch.io search instead of a single file link?</h3>
            <p>
              Builds rotate on itch.io. A search using {{ flagship.title }} and the genre keywords we maintain usually
              finds the correct page when bundles or filenames change. When we have a stable store URL, the button
              switches to that direct page (set in hub data).
            </p>
          </li>
          <li>
            <h3>Is the browser version the same as the download?</h3>
            <p>
              Often similar, sometimes not—creators may ship HTML5, Windows, macOS, or Linux separately. Always read the
              itch.io page for system requirements and pricing.
            </p>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup>
/** 下载页主推（原 games.js 首条；itch 直达链维护在此） */
const flagship = {
  title: 'COBB CAN MOVE',
  description:
    'Survival horror from above: survive a dark pixel dungeon, keep coal-fed light alive, and escape Cobb as the rules change every level.',
  tags: ['Survival Horror', 'Roguelite', 'Pixel Art', 'Browser'],
  publishDate: '2025',
  imageUrl: '/images/about-img.webp',
  imageAlt: 'Dark corridor with cold light, suggesting the in-game dungeon',
}

const ITCH_STORE_URL = 'https://abho.itch.io/cobb-can-move'
const itchUrl = ITCH_STORE_URL
const itchCtaLabel = 'Download COBB CAN MOVE on itch.io'
</script>

<style scoped>
main {
  display: block;
}

.page-hero-section {
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.page-hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.75rem;
}

.page-hero-lead {
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.page-hero-note {
  margin-top: 1rem;
  font-size: 0.92rem;
  color: var(--color-text-muted);
}

.download-list-section {
  padding-block: clamp(1rem, 3vw, 2rem);
}

.section-heading {
  margin-bottom: 1.75rem;
}

.section-heading p {
  color: var(--color-text-muted);
}

.download-card {
  display: grid;
  gap: 0;
  margin: 0;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 70%, black);
}

@media (min-width: 1024px) {
  .download-card {
    grid-template-columns: minmax(220px, 38%) 1fr;
  }
}

.download-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
}

.download-card-body {
  padding: 1.25rem 1.35rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.download-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.pill {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: color-mix(in oklch, var(--color-text) 12%, transparent);
  color: var(--color-text-muted);
}

.pill-featured {
  background: color-mix(in oklch, var(--color-accent) 35%, transparent);
  color: var(--color-text);
}

.download-card-body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.6rem);
}

.download-card-desc {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.98rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-row.muted li {
  font-size: 0.82rem;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in oklch, var(--color-text) 8%, transparent);
  color: var(--color-text-muted);
}

.download-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.5rem;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  color: oklch(16% 0.04 285);
  background: linear-gradient(
    120deg,
    color-mix(in oklch, var(--color-accent) 85%, white),
    var(--color-accent)
  );
}

.btn-download:hover {
  filter: brightness(1.06);
}

.btn-download-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-text-muted);
  border: 1px solid color-mix(in oklch, var(--color-text) 18%, transparent);
}

.btn-download-ghost:hover {
  color: var(--color-accent);
  border-color: color-mix(in oklch, var(--color-accent) 45%, transparent);
}

.download-faq-section {
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.download-faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.download-faq-list h3 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}

.download-faq-list p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
