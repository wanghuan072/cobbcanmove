<template>
  <main id="top">
    <section class="legal-breadcrumb-section" aria-label="Breadcrumb">
      <div class="container">
        <nav class="legal-breadcrumb">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <span aria-hidden="true">/</span>
          <span class="legal-breadcrumb-current">{{ title }}</span>
        </nav>
      </div>
    </section>

    <section class="page-hero-section" :aria-labelledby="headingId">
      <div class="container">
        <p class="page-hero-eyebrow">{{ eyebrow }}</p>
        <h1 :id="headingId">{{ title }}</h1>
        <p class="legal-updated">Last updated: {{ lastUpdated }}</p>
        <div v-if="$slots.intro" class="legal-intro">
          <slot name="intro" />
        </div>
        <p v-if="contactEmail" class="legal-email-lead">
          <span class="legal-email-label">Email</span>
          <a class="legal-email-link" :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
        </p>
      </div>
    </section>

    <section class="legal-body-section" :aria-label="ariaDetailsLabel">
      <div class="container">
        <article class="legal-article">
          <slot />
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  eyebrow: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  contactEmail: { type: String, default: '' },
})

const headingId = 'legal-page-title'

const ariaDetailsLabel = computed(() => `${props.title} details`)
</script>

<style scoped>
main {
  display: block;
}

.legal-breadcrumb-section {
  padding-block: 1rem 0;
}

.legal-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.legal-breadcrumb a {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
}

.legal-breadcrumb a:hover {
  text-decoration: underline;
}

.legal-breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
}

.page-hero-section {
  padding-block: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.25rem);
}

.page-hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.78rem;
  color: var(--color-accent-2);
  margin-bottom: 0.65rem;
}

.legal-updated {
  margin: 0 0 1.25rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.legal-intro {
  max-width: 72ch;
}

.legal-intro :deep(p) {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin: 0 0 1em;
}

.legal-intro :deep(p:last-child) {
  margin-bottom: 0;
}

.legal-email-lead {
  margin-top: 1.5rem;
  padding: 1rem 1.15rem;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in oklch, var(--color-accent) 35%, transparent);
  background: color-mix(in oklch, var(--color-surface) 70%, black);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}

.legal-email-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
}

.legal-email-link {
  font-weight: 700;
  font-size: 1.05rem;
  word-break: break-all;
}

.legal-body-section {
  padding-block: 0 clamp(2.5rem, 5vw, 4rem);
}

.legal-article {
  max-width: 72ch;
  padding-bottom: 1rem;
}

.legal-article :deep(section) {
  margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
}

.legal-article :deep(h2) {
  font-size: clamp(1.2rem, 1vw + 1rem, 1.45rem);
  margin-bottom: 0.75rem;
  color: var(--color-text);
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.15;
}

.legal-article :deep(p) {
  color: var(--color-text-muted);
  margin-bottom: 0.85em;
}

.legal-article :deep(a) {
  color: var(--color-accent);
  font-weight: 600;
}

.legal-article :deep(strong) {
  color: var(--color-text);
  font-weight: 700;
}
</style>
