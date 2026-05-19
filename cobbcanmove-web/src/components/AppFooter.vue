<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container site-footer-main">
      <div class="site-footer-grid">
        <div class="site-footer-brand">
          <RouterLink :to="{ name: 'home' }" class="site-footer-logo-link" aria-label="COBB CAN MOVE hub home">
            <img src="/images/logo.png" alt="" class="site-footer-logo-mark" aria-hidden="true" />
            <span class="site-footer-logo-text">COBB CAN MOVE Hub</span>
          </RouterLink>
          <p class="site-footer-note">
            Curated browser portal for COBB CAN MOVE and related experiments. Not affiliated with storefronts
            unless linked explicitly.
          </p>
        </div>

        <nav class="site-footer-nav site-footer-nav--quick" aria-label="Quick links">
          <p class="site-footer-heading">Quick Links</p>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/more-games">More Games</RouterLink></li>
            <li><RouterLink to="/comments">Comments</RouterLink></li>
            <li><RouterLink to="/download">Download (itch.io)</RouterLink></li>
            <li><RouterLink to="/blog">Blog</RouterLink></li>
            <li>
              <a href="https://comment-web-one.vercel.app/" rel="noopener noreferrer" target="_blank"
                >Comment admin</a
              >
            </li>
          </ul>
        </nav>

        <nav class="site-footer-nav site-footer-nav--legal" aria-label="Legal">
          <p class="site-footer-heading">Legal</p>
          <ul>
            <li><RouterLink :to="{ name: 'privacy-policy' }">Privacy Policy</RouterLink></li>
            <li><RouterLink :to="{ name: 'terms-of-service' }">Terms of Service</RouterLink></li>
            <li><RouterLink :to="{ name: 'copyright' }">Copyright</RouterLink></li>
            <li><RouterLink :to="{ name: 'about-us' }">About Us</RouterLink></li>
            <li><RouterLink :to="{ name: 'contact-us' }">Contact Us</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="container site-footer-bar">
      <p>© {{ year }} cobbcanmove.site. Crafted for players who like their tension readable.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: clamp(3rem, 6vw, 5rem);
  border-top: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 55%, black);
}

/* 单独包一层，保证与 .container 同宽且 grid 占满内容区 */
.site-footer-main {
  width: 100%;
  box-sizing: border-box;
}

.site-footer-grid {
  display: grid;
  width: 100%;
  box-sizing: border-box;
  /* 三等分：中间栏内容居中、右侧栏贴右，和常见落地页页脚一致 */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  column-gap: clamp(1.75rem, 5vw, 3.5rem);
  padding-block: clamp(2rem, 4vw, 3rem);
  align-items: start;
}

.site-footer-brand {
  min-width: 0;
  justify-self: stretch;
}

.site-footer-logo-link {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 1.15;
}

.site-footer-logo-link:hover {
  color: color-mix(in oklch, var(--color-text) 92%, var(--color-accent));
}

.site-footer-logo-mark {
  display: block;
  width: 8rem;
  height: auto;
  flex-shrink: 0;
}

.site-footer-logo-text {
  min-width: 0;
}

.site-footer-note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  max-width: 36ch;
}

.site-footer-heading {
  font-weight: 700;
  margin: 0 0 0.65rem;
}

.site-footer-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.site-footer-nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 600;
}

.site-footer-nav a:hover {
  color: var(--color-accent);
}

/* 中间：整块在列内水平居中 */
.site-footer-nav--quick {
  min-width: 0;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.site-footer-nav--quick ul {
  align-items: center;
}

/* 右侧：整块贴列右缘 */
.site-footer-nav--legal {
  min-width: 0;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.site-footer-nav--legal ul {
  align-items: flex-end;
}
.site-footer-bar {
  border-top: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
  padding-block: 1rem 1.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .site-footer-grid {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  .site-footer-nav--quick,
  .site-footer-nav--legal {
    justify-self: stretch;
    align-items: flex-start;
    text-align: left;
  }

  .site-footer-nav--quick ul,
  .site-footer-nav--legal ul {
    align-items: flex-start;
  }

  .site-footer-note {
    max-width: none;
  }
}
</style>
