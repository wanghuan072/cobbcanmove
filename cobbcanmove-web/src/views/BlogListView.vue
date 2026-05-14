<template>
  <main id="top">
    <section class="page-hero-section" aria-labelledby="blog-hero-heading">
      <div class="container">
        <p class="page-hero-eyebrow">Updates & notes</p>
        <h1 id="blog-hero-heading">COBB CAN MOVE Blog</h1>
        <p class="page-hero-lead">
          Short posts about the flagship run, hub changes, and how we keep Cobb’s rules readable in the browser.
        </p>
      </div>
    </section>

    <section class="blog-page-section" aria-labelledby="blog-list-heading">
      <div class="container">
        <header class="section-heading">
          <h2 id="blog-list-heading">All posts</h2>
          <p>Newest entries first. Each card opens the full article.</p>
        </header>
        <div class="blog-grid">
          <RouterLink
            v-for="post in posts"
            :key="post.addressBar"
            class="blog-card"
            :to="{ name: 'blog-post', params: { slug: post.addressBar } }"
            :aria-label="`${post.title} — read article`"
          >
            <div class="blog-card-thumb">
              <img :src="post.imageUrl" :alt="post.imageAlt" width="520" height="320" loading="lazy" />
            </div>
            <div class="blog-card-body">
              <div class="blog-card-meta">
                <span>{{ post.publishDate }}</span>
              </div>
              <h3>{{ post.title }}</h3>
              <p class="blog-card-desc">{{ post.description }}</p>
              <ul class="tag-row muted" aria-label="Tags">
                <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { listPosts } from '@/blogRegistry.js'

const posts = listPosts()

const LIST_TITLE = 'Blog — COBB CAN MOVE Hub'
const LIST_DESC =
  'Hub blog: design notes and player-facing updates for COBB CAN MOVE—browser survival horror, rule rotation, and patch mindset.'
const LIST_KW = 'COBB CAN MOVE, blog, hub updates, survival horror, indie game, patch notes'

function applyListSeo() {
  document.title = LIST_TITLE
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', LIST_DESC)
  let metaKw = document.querySelector('meta[name="keywords"]')
  if (!metaKw) {
    metaKw = document.createElement('meta')
    metaKw.setAttribute('name', 'keywords')
    document.head.appendChild(metaKw)
  }
  metaKw.setAttribute('content', LIST_KW)
}

onMounted(applyListSeo)
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
  margin-bottom: 0.65rem;
}

.page-hero-lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  max-width: 62ch;
}

.blog-page-section {
  padding-block: 0 clamp(2.5rem, 5vw, 4rem);
}

.section-heading {
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.section-heading p {
  color: var(--color-text-muted);
}

.blog-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  align-items: stretch;
}

.blog-card {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: color-mix(in oklch, var(--color-surface) 65%, black);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;
}

.blog-card:hover {
  border-color: color-mix(in oklch, var(--color-accent) 45%, transparent);
  transform: translateY(-2px);
}

.blog-card-thumb img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.blog-card-body {
  padding: 1rem 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.blog-card-meta {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.blog-card-body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.25;
}

.blog-card-desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  flex: 1;
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
  font-size: 0.78rem;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: color-mix(in oklch, var(--color-text) 8%, transparent);
  color: var(--color-text-muted);
}
</style>
