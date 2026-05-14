<template>
  <header class="site-header" role="banner">
    <div class="container site-header-inner">
      <RouterLink :to="{ name: 'home' }" class="site-logo" aria-label="COBB CAN MOVE hub home">
        <span class="site-logo-mark" aria-hidden="true" />
        <span class="site-logo-text">COBB CAN MOVE</span>
      </RouterLink>
      <button
        type="button"
        class="nav-toggle"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav-toggle-lines" aria-hidden="true" />
        <span class="visually-hidden">Toggle navigation</span>
      </button>
      <nav id="site-nav" class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Primary">
        <ul class="site-nav-list">
          <li>
            <RouterLink :to="{ name: 'home' }" exactActiveClass="is-active" @click="closeMenu">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'more-games' }" activeClass="is-active" @click="closeMenu">More Games</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'comments' }" activeClass="is-active" @click="closeMenu">Comments</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'download' }" activeClass="is-active" @click="closeMenu">Download</RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'blog' }"
              :class="{ 'is-active': blogNavActive }"
              @click="closeMenu"
            >
              Blog
            </RouterLink>
          </li>
          <li>
            <a href="/#play" @click.prevent="goHomeHash('#play')">Play</a>
          </li>
          <li>
            <a href="/#how-to-play" @click.prevent="goHomeHash('#how-to-play')">How to Play</a>
          </li>
          <li>
            <a href="/#reviews" @click.prevent="goHomeHash('#reviews')">Reviews</a>
          </li>
          <li>
            <a href="/#faq" @click.prevent="goHomeHash('#faq')">FAQ</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const menuOpen = ref(false)
const router = useRouter()
const route = useRoute()

const blogNavActive = computed(() => route.name === 'blog' || route.name === 'blog-post')

function closeMenu() {
  menuOpen.value = false
}

/** 从任意页回首页并滚动到对应区块（锚点） */
function goHomeHash(hash) {
  closeMenu()
  router.push({ name: 'home', hash }).catch(() => {})
}
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-bg) 88%, black);
  backdrop-filter: blur(12px);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.85rem;
}

.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 1rem;
}

.site-logo:hover {
  color: var(--color-text);
}

.site-logo-mark {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.35rem;
  background: conic-gradient(
    from 210deg,
    var(--color-accent),
    var(--color-accent-2),
    color-mix(in oklch, var(--color-bg) 40%, var(--color-accent))
  );
  box-shadow: 0 0 0 2px color-mix(in oklch, var(--color-text) 18%, transparent);
}

.site-nav-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem 1.25rem;
}

.site-nav-list a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.site-nav-list a:hover,
.site-nav-list a.is-active {
  color: var(--color-accent);
}

.nav-toggle {
  display: none;
  border: 1px solid color-mix(in oklch, var(--color-text) 22%, transparent);
  background: color-mix(in oklch, var(--color-surface) 80%, transparent);
  border-radius: 0.4rem;
  padding: 0.45rem 0.55rem;
  cursor: pointer;
}

.nav-toggle-lines {
  display: block;
  width: 1.35rem;
  height: 2px;
  background: var(--color-text);
  box-shadow:
    0 -6px 0 var(--color-text),
    0 6px 0 var(--color-text);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: inline-flex;
  }

  .site-nav {
    position: absolute;
    inset-inline: 0;
    top: 100%;
    padding: 0.75rem clamp(1rem, 3vw, 2rem) 1rem;
    background: color-mix(in oklch, var(--color-bg) 92%, black);
    border-bottom: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
    display: none;
  }

  .site-nav.is-open {
    display: block;
  }

  .site-nav-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
