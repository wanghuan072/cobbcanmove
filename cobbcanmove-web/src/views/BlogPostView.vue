<template>
  <main v-if="post" id="top">
    <section class="detail-breadcrumb-section" aria-label="Breadcrumb">
      <div class="container">
        <nav class="detail-breadcrumb">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink :to="{ name: 'blog' }">Blog</RouterLink>
          <span aria-hidden="true">/</span>
          <span class="detail-breadcrumb-current">{{ post.title }}</span>
        </nav>
      </div>
    </section>

    <section class="blog-hero-section" :aria-labelledby="headingId">
      <div class="container">
        <div class="blog-hero-grid">
          <div class="blog-hero-copy">
            <p class="blog-hero-eyebrow">{{ post.publishDate }}</p>
            <h1 :id="headingId">{{ post.title }}</h1>
            <p class="blog-hero-lead">{{ post.description }}</p>
            <ul class="tag-row" aria-label="Tags">
              <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
            </ul>
            <div v-if="isExternalAddressBar" class="blog-hero-actions">
              <a class="btn-primary" :href="post.addressBar" rel="noopener noreferrer" target="_blank">Open related link</a>
            </div>
          </div>
          <figure class="blog-hero-figure">
            <img :src="post.imageUrl" :alt="post.imageAlt" width="640" height="400" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="blog-body-section" aria-label="Article body">
      <div class="container">
        <div class="blog-rich" v-html="post.detailsHtml" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findPostBySlug } from '@/blogRegistry.js'

const route = useRoute()
const headingId = 'blog-post-title'

const post = computed(() => findPostBySlug(route.params.slug))

const isExternalAddressBar = computed(() =>
  /^https?:\/\//i.test(String(post.value?.addressBar || '')),
)

let canonicalEl

function applyPostSeo(p) {
  if (!p?.seo) return
  const { title, description, keywords } = p.seo
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

  const origin = window.location.origin
  const href = `${origin}${route.path}`
  canonicalEl = document.querySelector('link[rel="canonical"][data-hub-page="blog-post"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    canonicalEl.setAttribute('data-hub-page', 'blog-post')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', href)
}

watch(
  () => post.value?.id,
  (id) => {
    if (id) applyPostSeo(post.value)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (canonicalEl?.parentNode) {
    canonicalEl.parentNode.removeChild(canonicalEl)
    canonicalEl = undefined
  }
})
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
  font-weight: 600;
  text-decoration: none;
}

.detail-breadcrumb a:hover {
  color: var(--color-accent);
}

.detail-breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
}

.blog-hero-section {
  padding-block: clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem);
}

.blog-hero-grid {
  display: grid;
  gap: 1.75rem;
  align-items: start;
}

@media (min-width: 900px) {
  .blog-hero-grid {
    grid-template-columns: 1fr minmax(260px, 42%);
  }
}

.blog-hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.5rem;
}

.blog-hero-lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-row li {
  font-size: 0.82rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklch, var(--color-text) 16%, transparent);
  color: var(--color-text-muted);
}

.blog-hero-actions {
  margin-top: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.2rem;
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

.blog-hero-figure {
  margin: 0;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
}

.blog-hero-figure img {
  display: block;
  width: 100%;
  height: auto;
}

.blog-body-section {
  padding-block: 0 clamp(2.5rem, 5vw, 4rem);
}

.blog-rich {
  max-width: 72ch;
  color: var(--color-text-muted);
}

.blog-rich :deep(p),
.blog-rich :deep(li) {
  margin-bottom: 0.75em;
}

.blog-rich :deep(h3) {
  color: var(--color-text);
  margin-top: 1.25em;
  margin-bottom: 0.5em;
  font-size: 1.15rem;
}

.blog-rich :deep(ul),
.blog-rich :deep(ol) {
  padding-left: 1.25rem;
  margin: 0 0 1em;
}

.blog-rich :deep(ul) {
  list-style: disc;
}

.blog-rich :deep(ol) {
  list-style: decimal;
}
</style>
