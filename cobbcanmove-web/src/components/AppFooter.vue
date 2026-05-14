<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container site-footer-inner">
      <div class="site-footer-brand">
        <p class="site-footer-title">COBB CAN MOVE Hub</p>
        <p class="site-footer-note">
          Curated browser portal for COBB CAN MOVE and related experiments. Not affiliated with storefronts
          unless linked explicitly.
        </p>
      </div>
      <div class="site-footer-links">
        <p class="site-footer-heading">Explore</p>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/more-games">More Games</RouterLink></li>
          <li><RouterLink to="/comments">Comments</RouterLink></li>
          <li><RouterLink to="/download">Download (itch.io)</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li><RouterLink :to="{ name: 'home', hash: '#play' }">Play in browser</RouterLink></li>
          <li><RouterLink :to="{ name: 'home', hash: '#screenshots' }">Screenshots</RouterLink></li>
          <li><RouterLink :to="{ name: 'home', hash: '#reviews' }">Reviews</RouterLink></li>
          <li><RouterLink :to="{ name: 'home', hash: '#faq' }">FAQ</RouterLink></li>
          <li><RouterLink to="/admin">Staff</RouterLink></li>
        </ul>
      </div>
      <div class="site-footer-meta">
        <p class="site-footer-heading">Stay sharp</p>
        <p>Cobb’s rules stack fast—bookmark this hub for updates and new drops.</p>
      </div>
    </div>
    <div class="container site-footer-bar">
      <p>© {{ year }} COBB CAN MOVE fan hub. Crafted for players who like their tension readable.</p>
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

.site-footer-inner {
  display: grid;
  gap: 2rem;
  padding-block: clamp(2rem, 4vw, 3rem);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.site-footer-title {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.site-footer-note,
.site-footer-meta p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.site-footer-heading {
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.site-footer-links ul {
  display: grid;
  gap: 0.35rem;
}

.site-footer-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 600;
}

.site-footer-links a:hover {
  color: var(--color-accent);
}

.site-footer-bar {
  border-top: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
  padding-block: 1rem 1.5rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
