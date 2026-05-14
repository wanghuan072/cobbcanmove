<template>
  <div class="embed-root" :class="rootClass">
    <iframe
      v-if="started && iframeUrl"
      :src="iframeUrl"
      :title="`${gameTitle} embedded game`"
      class="embed-iframe"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allow="fullscreen; autoplay; gamepad"
      allowfullscreen
    />
    <div
      v-if="!started && iframeUrl"
      class="embed-overlay"
      role="presentation"
    >
      <div class="embed-overlay-bg" aria-hidden="true">
        <img class="embed-bg-img" :src="coverImageUrl" alt="" />
      </div>
      <div class="embed-overlay-frost" aria-hidden="true" />
      <div class="embed-overlay-inner">
        <img
          class="embed-thumb"
          :src="coverImageUrl"
          :alt="coverImageAlt"
          width="200"
          height="200"
          loading="lazy"
        />
        <button
          type="button"
          class="embed-play"
          :aria-label="`Load and play ${gameTitle}`"
          @click="reveal"
        >
          Play
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  iframeUrl: { type: String, default: '' },
  coverImageUrl: { type: String, required: true },
  coverImageAlt: { type: String, default: '' },
  gameTitle: { type: String, default: 'Game' },
  /** 与页面 play-frame-wrap 高度一致：home | detail */
  frameVariant: {
    type: String,
    default: 'home',
    validator: (v) => v === 'home' || v === 'detail',
  },
})

const started = ref(false)

const rootClass = computed(() =>
  props.frameVariant === 'detail' ? 'embed-root--detail' : 'embed-root--home',
)

function reveal() {
  started.value = true
}

watch(
  () => props.iframeUrl,
  () => {
    started.value = false
  },
)
</script>

<style scoped>
.embed-root {
  position: relative;
  width: 100%;
  min-height: min(70vh, 720px);
  border-radius: inherit;
}

.embed-root--detail {
  min-height: min(78vh, 820px);
}

.embed-iframe {
  width: 100%;
  height: min(70vh, 720px);
  border: 0;
  display: block;
}

.embed-root--detail .embed-iframe {
  height: min(78vh, 820px);
}

.embed-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: inherit;
}

.embed-overlay-bg {
  position: absolute;
  inset: -12px;
  z-index: 0;
}

.embed-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  filter: blur(22px) saturate(1.15);
  opacity: 0.92;
}

.embed-overlay-frost {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: color-mix(in oklch, var(--color-bg) 42%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(1.35);
  backdrop-filter: blur(14px) saturate(1.35);
}

.embed-overlay-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.15rem;
  padding: 1.5rem 1.25rem;
  text-align: center;
}

.embed-thumb {
  width: min(44vw, 200px);
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.85rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 22%, transparent);
  box-shadow:
    0 12px 40px color-mix(in oklch, black 50%, transparent),
    0 0 0 1px color-mix(in oklch, white 8%, transparent) inset;
}

.embed-play {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.55rem 1.65rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  color: oklch(16% 0.04 285);
  background: linear-gradient(
    120deg,
    color-mix(in oklch, var(--color-accent) 85%, white),
    var(--color-accent)
  );
  box-shadow: 0 10px 32px color-mix(in oklch, var(--color-accent) 38%, transparent);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.embed-play:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 40px color-mix(in oklch, var(--color-accent) 48%, transparent);
}

.embed-play:focus-visible {
  outline: 2px solid var(--color-accent-2);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .embed-bg-img {
    filter: blur(10px) saturate(1.05);
  }

  .embed-overlay-frost {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }

  .embed-play:hover {
    transform: none;
  }
}
</style>
