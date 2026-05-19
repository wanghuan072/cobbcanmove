<template>
  <main id="top">
    <section class="hero-section" aria-labelledby="hero-heading">
      <div class="container">
        <div class="hero-content">
          <p class="hero-eyebrow">Browser-first · rule-stacking horror</p>
          <h1 id="hero-heading">{{ hubMain.title }}</h1>
          <p class="hero-lead">
            {{ hubMain.description }}
          </p>
          <div class="hero-actions">
            <a class="btn-primary" href="#play">Play the demo</a>
            <a class="btn-ghost" href="#about">Why it hits</a>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-frame">
            <div class="hero-grid">
              <img src="/images/hero-img.webp" alt="Cobb is listening" fetchpriority="high" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="play" class="play-section" aria-labelledby="play-heading">
      <div class="container">
        <div class="play-content">
          <header class="section-heading play-heading">
            <h2 id="play-heading">Play {{ hubMain.title }} online</h2>
          </header>
          <div class="play-frame-wrap">
            <GameEmbedWithOverlay
              frame-variant="home"
              :iframe-url="hubMain.iframeUrl"
              :cover-image-url="hubMain.imageUrl"
              :cover-image-alt="hubMain.imageAlt"
              :game-title="hubMain.title"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about-section" aria-labelledby="about-heading">
      <div class="container">
        <div class="about-split">
          <div class="about-copy">
            <header class="section-heading">
              <h2 id="about-heading">About {{ hubMain.title }}</h2>
              <p>
                A trap-adjacent roguelite that weaponizes clarity: you always see the pieces, yet the dungeon keeps
                renegotiating how they connect.
              </p>
            </header>
            <div class="about-rich" v-html="hubMain.detailsHtml" />
            <ul class="tag-row" aria-label="Game tags">
              <li v-for="tag in hubMain.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
          <aside id="reviews" class="about-rail" aria-label="Player scores and reviews">
            <div class="about-reviews-wrap">
              <div class="about-reviews-wrap-head">
                <span class="about-reviews-wrap-kicker">Player scores</span>
              </div>
              <GameReviewsSection :game-title="hubMain.title" :preview-comment-limit="3" />
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section id="features" class="features-section" aria-labelledby="features-heading">
      <div class="container">
        <div class="features-content">
          <header class="section-heading">
            <h2 id="features-heading">Features — {{ hubMain.title }}</h2>
            <p>Design pillars borrowed from the best tension loops—then stretched until they creak.</p>
          </header>
          <div class="features-grid">
            <article class="feature-card">
              <h3>Rule stack, not memorization</h3>
              <p>
                Cobb’s toolkit expands between floors. You are rewarded for adapting, punished for autopiloting
                yesterday’s plan.
              </p>
            </article>
            <article class="feature-card">
              <h3>Furnace heartbeat</h3>
              <p>
                Coal routes double as risk maps. Feeding the fire feels productive until it paints a neon path for
                whatever hunts you.
              </p>
            </article>
            <article class="feature-card">
              <h3>Readable cruelty</h3>
              <p>
                Deaths are fast, legible, and often funny in hindsight—perfect for clipped retries and couch
                commentary.
              </p>
            </article>
            <article class="feature-card">
              <h3>Browser-native flow</h3>
              <p>
                Jump in without installs when the host cooperates. Keep the standalone tab handy for restrictive
                networks.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="screenshotList.length"
      id="screenshots"
      class="shots-section"
      aria-labelledby="shots-heading"
    >
      <div class="container">
        <div class="shots-content">
          <header class="section-heading">
            <h2 id="shots-heading">Screenshots — {{ hubMain.title }}</h2>
            <p>
              Mood boards for the hub layout—swap in real captures once you have export-safe stills from your
              build.
            </p>
          </header>
          <div class="shots-grid">
            <figure v-for="(shot, index) in screenshotList" :key="index" class="shots-figure">
              <div class="shots-frame">
                <img :src="shot.imageUrl" :alt="shot.imageAlt" width="640" height="360" loading="lazy" />
              </div>
              <figcaption>{{ shot.caption }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section id="how-to-play" class="howto-section" aria-labelledby="howto-heading">
      <div class="container">
        <div class="howto-content">
          <header class="section-heading">
            <h2 id="howto-heading">How to play {{ hubMain.title }}</h2>
            <p>Four beats to get you moving without spoiling the surprises.</p>
          </header>
          <ol class="howto-steps">
            <li>
              <span class="howto-index">01</span>
              <div>
                <h3>Start the embedded run</h3>
                <p>Scroll to the player, click to focus, and use keyboard or gamepad as prompted by the host.</p>
              </div>
            </li>
            <li>
              <span class="howto-index">02</span>
              <div>
                <h3>Map the loop first</h3>
                <p>Locate coal, switches, and exits before sprinting. Noise is information—for you and Cobb.</p>
              </div>
            </li>
            <li>
              <span class="howto-index">03</span>
              <div>
                <h3>Read the new rule before bragging</h3>
                <p>Each upgrade to Cobb rewrites safe corners. Pause a beat whenever the UI hints at a fresh sense.</p>
              </div>
            </li>
            <li>
              <span class="howto-index">04</span>
              <div>
                <h3>Reset with intent</h3>
                <p>Short runs mean experiments are cheap. Try one new hypothesis per death instead of panicking.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section id="more-games" class="games-section" aria-labelledby="games-heading">
      <div class="container">
        <div class="games-content">
          <header class="section-heading">
            <h2 id="games-heading">More games on this hub — {{ hubMain.title }}</h2>
            <p>Every card opens that game’s full page—tap anywhere on the tile.</p>
          </header>
          <div class="games-grid">
            <RouterLink
              v-for="game in otherGames"
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

    <section id="faq" class="faq-section" aria-labelledby="faq-heading">
      <div class="container">
        <div class="faq-content">
          <header class="section-heading">
            <h2 id="faq-heading">FAQ — {{ hubMain.title }}</h2>
            <p>Quick answers about playing, modes, and controls.</p>
          </header>
          <div class="faq-list">
            <article v-for="(item, index) in mainFaq" :key="index" class="faq-item">
              <h3 class="faq-q">{{ item.question }}</h3>
              <div class="faq-answer" v-html="item.answerHtml" />
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import games from '@/data/games.js'
import { gamePathSlug } from '@/gameRegistry.js'
import GameReviewsSection from '@/components/GameReviewsSection.vue'
import GameEmbedWithOverlay from '@/components/GameEmbedWithOverlay.vue'

/** 首页主推「COBB CAN MOVE」正文（已从 games.js 迁出；TDK 在路由 meta） */
const hubMain = Object.freeze({
  title: 'COBB CAN MOVE',
  iframeUrl: 'https://gamaverse.com/c/f/g/cobb-can-move-1749146982/',
  description:
    'Survival horror from above: survive a dark pixel dungeon, keep coal-fed light alive, and escape Cobb as the rules change every level.',
  tags: ['Survival Horror', 'Roguelite', 'Pixel Art', 'Browser'],
  publishDate: '2025',
  imageUrl: '/images/about-img.webp',
  imageAlt: 'Dark corridor with cold light, suggesting the in-game dungeon',
  detailsHtml: `
      <p><strong>COBB CAN MOVE</strong> is a top-down survival horror game in a dark pixel dungeon. You push through tight corridors while <strong>Cobb</strong> hunts you—each level can change how he senses and closes distance.</p>
      <p>Carry <strong>burning coal</strong> to fight the dark and buy time. Complete objectives such as furnaces and breakers, then get out before the layout, alarms, or Cobb’s new tricks undo your plan.</p>
      <h3>Modes</h3>
      <ul>
        <li><strong>Story Mode</strong> — structured runs that ramp threat and teach Cobb’s toolkit.</li>
        <li><strong>Endless Mode</strong> — survival-focused loops with heavier randomization.</li>
      </ul>
      <h3>How to play</h3>
      <ol>
        <li>Click the game window, move with <strong>WASD</strong> or <strong>arrow keys</strong>, interact with <strong>E</strong> or <strong>Spacebar</strong> (gamepad supported when the build allows).</li>
        <li>Keep light up, finish the objective, and move with sound and sightlines in mind—noise matters.</li>
        <li>When behavior shifts—hearing, sight, smell, speed, reach, or doubles—assume your last safe route is wrong until you prove it again.</li>
      </ol>
    `,
  screenshots: [
    {
      imageUrl: '/images/game01-01.webp',
      imageAlt: 'Single warm light in a long dark corridor',
      caption: 'Tight corridors: light is scarce and every step counts.',
    },
    {
      imageUrl: '/images/game01-02.webp',
      imageAlt: 'Foggy industrial interior',
      caption: 'Pressure in the dark: objectives and hazards keep the route tense.',
    },
    {
      imageUrl: '/images/game01-03.webp',
      imageAlt: 'Small lights in darkness',
      caption: 'Shifting rules: what felt safe can flip as Cobb gains new senses.',
    },
  ],
  faq: [
    {
      question: 'Can I play in the browser?',
      answerHtml:
        '<p>Yes. Use the player on this page when the embed loads, or open the same session in a new tab. Some networks block iframes—try another network or browser if the frame stays blank.</p>',
    },
    {
      question: 'What is the difference between Story and Endless?',
      answerHtml:
        '<p><strong>Story Mode</strong> strings together authored escalation so you learn systems in a deliberate order. <strong>Endless Mode</strong> leans on randomized rule mixes and survival pressure for players who want the dungeon to keep rewriting itself.</p>',
    },
    {
      question: 'Why does Cobb feel different on the next floor?',
      answerHtml:
        '<p>Cobb’s kit can rotate—sound, sight, smell, speed, reach, duplication, and more. Treat each floor as a new contract: re-scout, re-light, and re-plan instead of autopiloting the last win.</p>',
    },
    {
      question: 'What are the controls?',
      answerHtml:
        '<p>Default PC layout is <strong>WASD</strong> or <strong>arrows</strong> to move and <strong>E</strong> or <strong>Spacebar</strong> to interact. If prompts differ on-screen, follow the build’s own callouts.</p>',
    },
  ],
})

const otherGames = computed(() => games)
const screenshotList = hubMain.screenshots ?? []
const mainFaq = hubMain.faq ?? []

function isPlayable(game) {
  return Boolean(game.iframeUrl || game.addressBar)
}
</script>

<style scoped>
main {
  display: block;
}

.hero-section {
  padding-block: clamp(3rem, 6vw, 5.5rem);
  position: relative;
  overflow: hidden;
}

.hero-section .container {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
}

.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.75rem;
}

.hero-lead {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  max-width: 52ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
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

.play-heading {
  margin-bottom: 1rem;
}

.play-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-visual {
  justify-self: end;
}

.hero-frame {
  position: relative;
  border-radius: 1.25rem;
  padding: 1.25rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 18%, transparent);
  background: radial-gradient(circle at 20% 20%, color-mix(in oklch, var(--color-accent) 35%, transparent), transparent),
    var(--color-surface);
}

.hero-grid {
  background-image: linear-gradient(
      90deg,
      color-mix(in oklch, var(--color-text) 8%, transparent) 1px,
      transparent 1px
    ),
    linear-gradient(0deg, color-mix(in oklch, var(--color-text) 8%, transparent) 1px, transparent 1px);
  background-size: 42px 42px;
  opacity: 0.35;
  border-radius: 0.85rem;
}

.hero-grid img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 0.85rem;
}

.hero-tag {
  position: relative;
  margin: 0;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.section-heading {
  max-width: 720px;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.section-heading p {
  color: var(--color-text-muted);
}

.play-section,
.about-section,
.features-section,
.shots-section,
.howto-section,
.games-section,
.faq-section {
  padding-block: clamp(2.5rem, 5vw, 4rem);
}

.play-frame-wrap {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 16%, transparent);
  background: black;
  min-height: min(70vh, 720px);
  box-shadow: 0 25px 80px color-mix(in oklch, black 55%, transparent);
}

.about-split {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.75rem);
  align-items: stretch;
  grid-template-columns: 1fr;
}

@media (max-width: 1024px) {
  .hero-section .container {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    justify-self: center;
  }

  .shots-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .about-split {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
    column-gap: clamp(2rem, 4vw, 3.5rem);
  }
}

.about-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.about-rail {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  height: 100%;
}

.about-reviews-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem 0.85rem 0.9rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 55%, black);
}

.about-reviews-wrap > :deep(.reviews-section) {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.about-reviews-wrap-head {
  margin-bottom: 0.45rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
}

.about-reviews-wrap-kicker {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-2);
}

.about-rich :deep(p) {
  color: var(--color-text-muted);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
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

.features-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature-card {
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: color-mix(in oklch, var(--color-surface) 80%, transparent);
}

.feature-card p {
  color: var(--color-text-muted);
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

@media (max-width: 768px) {
  .shots-grid {
    grid-template-columns: 1fr;
  }
}

.howto-steps {
  counter-reset: howto;
  display: grid;
  gap: 1rem;
}

.howto-steps li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 70%, transparent);
}

.howto-index {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: 0.08em;
}

.howto-steps h3 {
  margin-bottom: 0.35rem;
}

.howto-steps p {
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
  color: var(--color-text-muted);
  font-size: 0.9rem;
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

.game-card-body .tag-row {
  margin-top: 0;
}

.game-card-body h3 {
  margin: 0;
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
  margin-top: 0.65rem;
  color: var(--color-text-muted);
}

.faq-answer :deep(p:first-child) {
  margin-top: 0;
}

.faq-answer :deep(code) {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
  color: var(--color-accent-2);
}

code {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
  color: var(--color-accent-2);
}
</style>
