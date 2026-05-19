<template>
  <main id="top">
    <section class="comments-hero-section" aria-labelledby="comments-heading">
      <div class="container">
        <h1 id="comments-heading">Player comments</h1>
        <p class="comments-lead">
          Same review tools as the home page—focused on <strong>COBB CAN MOVE</strong>.
        </p>
      </div>
    </section>
    <GameReviewsSection
      game-title="COBB CAN MOVE"
      :compact="false"
      section-id="comments-reviews"
    />
  </main>
</template>

<script setup>
import GameReviewsSection from '@/components/GameReviewsSection.vue'
</script>

<style scoped>
main {
  display: block;
}

.comments-hero-section {
  padding-block: clamp(2rem, 4vw, 3rem) 0;
}

.comments-lead {
  margin: 0.75rem 0 0;
  color: var(--color-text-muted);
  font-size: 1.05rem;
}
</style>
