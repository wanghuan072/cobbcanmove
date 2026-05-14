<template>
  <section
    :id="sectionId"
    :class="['reviews-section', { 'reviews-section--compact': compact }]"
    :aria-labelledby="headingId"
  >
    <div :class="compact ? 'reviews-inner' : 'container'">
      <!-- 紧凑：About 侧栏等窄栏排版 -->
      <div v-if="compact" class="reviews-compact">
        <header class="rc-head">
          <h2 :id="headingId" class="rc-title">Scores &amp; notes</h2>
          <p v-if="gameTitle" class="rc-sub">For <strong>{{ gameTitle }}</strong></p>
        </header>

        <div class="rc-scorecard" aria-live="polite" :aria-label="ringAriaLabel">
          <div class="rc-scoreline">
            <span class="rc-avg">{{ avgDisplay }}</span>
            <div class="rc-scoreline-rest">
              <span class="rc-outof">out of 5</span>
              <div class="rc-bar" role="presentation">
                <div class="rc-bar-fill" :style="{ width: barPct }" />
              </div>
            </div>
          </div>
          <p class="rc-counts">
            <template v-if="stats.ratingCount > 0">
              {{ stats.ratingCount }} rating{{ stats.ratingCount === 1 ? '' : 's' }} ·
              {{ stats.commentCount }} note{{ stats.commentCount === 1 ? '' : 's' }}
            </template>
            <template v-else>No ratings yet.</template>
          </p>
        </div>

        <p v-if="error" class="rc-error" role="alert">{{ error }}</p>

        <form class="rc-form" @submit.prevent="submitReview">
          <div class="rc-form-label">Leave a quick note</div>
          <input
            v-model.trim="form.authorName"
            class="rc-input"
            type="text"
            maxlength="80"
            required
            autocomplete="nickname"
            placeholder="Display name"
          />
          <fieldset class="rc-stars-field">
            <legend class="visually-hidden">Your rating</legend>
            <div class="rc-stars" role="radiogroup" aria-label="Star rating">
              <label v-for="n in 5" :key="n" class="rc-star-label">
                <input v-model.number="form.rating" type="radio" :name="'rating-' + gameId" :value="n" />
                <span class="rc-star" :class="{ on: form.rating >= n }" aria-hidden="true">★</span>
                <span class="visually-hidden">{{ n }} star{{ n > 1 ? 's' : '' }}</span>
              </label>
            </div>
          </fieldset>
          <textarea
            v-model.trim="form.body"
            class="rc-textarea"
            rows="2"
            maxlength="2000"
            required
            placeholder="What worked—or didn’t?"
          />
          <div class="rc-form-foot">
            <button type="submit" class="rc-btn" :disabled="submitting">
              {{ submitting ? '…' : 'Send' }}
            </button>
            <span v-if="submitMsg" class="rc-msg">{{ submitMsg }}</span>
            <span v-if="submitErr" class="rc-err" role="alert">{{ submitErr }}</span>
          </div>
        </form>

        <div class="rc-feed">
          <div class="rc-feed-label">Latest</div>
          <p v-if="loading" class="rc-muted">Loading…</p>
          <template v-else>
            <ul v-if="compactCommentsToShow.length" class="rc-list" :class="{ 'rc-list--preview': previewCommentLimit > 0 }">
              <li v-for="c in compactCommentsToShow" :key="c.id" class="rc-note">
                <div class="rc-note-top">
                  <span class="rc-note-name">{{ c.authorName }}</span>
                  <time class="rc-note-date" :datetime="c.createdAt">{{ formatDate(c.createdAt) }}</time>
                </div>
                <div v-if="c.rating" class="rc-note-stars" :aria-label="`Rating: ${c.rating} of 5`">
                  <span v-for="n in 5" :key="n" class="rc-dot" :class="{ on: c.rating >= n }">★</span>
                </div>
                <p class="rc-note-body">{{ c.body }}</p>
              </li>
            </ul>
            <p v-else class="rc-muted">No notes yet.</p>
            <RouterLink
              v-if="showViewAllCommentsButton"
              :to="commentsPageRoute"
              class="rc-view-all"
            >
              View all comments
            </RouterLink>
          </template>
        </div>
      </div>

      <!-- 完整：评论页 -->
      <div v-else class="reviews-shell">
        <header class="reviews-top">
          <p class="reviews-eyebrow">Player voice</p>
          <h2 :id="headingId" class="reviews-title">Reviews &amp; ratings</h2>
          <p v-if="gameTitle" class="reviews-deck">
            Honest scores and notes for <strong>{{ gameTitle }}</strong>—short reads, no astroturf.
          </p>
          <p v-else class="reviews-deck">Honest scores and notes for this title.</p>
        </header>

        <div class="reviews-layout">
          <aside class="reviews-side" aria-live="polite">
            <div class="reviews-meter" aria-label="Average rating summary">
              <div class="reviews-ring-wrap">
                <div class="reviews-ring" :style="ringStyle" role="img" :aria-label="ringAriaLabel" />
                <div class="reviews-ring-core">
                  <span class="reviews-ring-num">{{ avgDisplay }}</span>
                  <span class="reviews-ring-denom">/ 5</span>
                </div>
              </div>
              <p class="reviews-meter-caption">
                <template v-if="stats.ratingCount > 0">
                  {{ stats.ratingCount }} rating{{ stats.ratingCount === 1 ? '' : 's' }} ·
                  {{ stats.commentCount }} review{{ stats.commentCount === 1 ? '' : 's' }}
                </template>
                <template v-else>No scores yet—drop the first one.</template>
              </p>
            </div>
          </aside>

          <div class="reviews-main">
            <p v-if="error" class="reviews-error" role="alert">{{ error }}</p>

            <form class="reviews-form" @submit.prevent="submitReview">
              <div class="reviews-form-head">
                <h3 class="reviews-form-title">Leave a note</h3>
                <p class="reviews-form-hint">One pass, no account. Moderation may apply.</p>
              </div>
              <div class="reviews-form-grid">
                <label class="reviews-field reviews-field--name">
                  <span class="reviews-field-label">Name</span>
                  <input
                    v-model.trim="form.authorName"
                    type="text"
                    maxlength="80"
                    required
                    autocomplete="nickname"
                    placeholder="How should we show you?"
                  />
                </label>
                <fieldset class="reviews-field reviews-field--stars">
                  <legend class="reviews-field-label">Score</legend>
                  <div class="reviews-star-row" role="radiogroup" aria-label="Star rating">
                    <label v-for="n in 5" :key="n" class="reviews-star-label">
                      <input v-model.number="form.rating" type="radio" :name="'rating-full-' + gameId" :value="n" />
                      <span class="reviews-star" :class="{ on: form.rating >= n }" aria-hidden="true">★</span>
                      <span class="visually-hidden">{{ n }} star{{ n > 1 ? 's' : '' }}</span>
                    </label>
                  </div>
                </fieldset>
                <label class="reviews-field reviews-field--body">
                  <span class="reviews-field-label">What landed for you?</span>
                  <textarea
                    v-model.trim="form.body"
                    rows="4"
                    maxlength="2000"
                    required
                    placeholder="Controls, pacing, a moment that stuck—keep it fair."
                  />
                </label>
              </div>
              <div class="reviews-form-actions">
                <button type="submit" class="reviews-submit" :disabled="submitting">
                  {{ submitting ? 'Sending…' : 'Publish review' }}
                </button>
                <p v-if="submitMsg" class="reviews-msg">{{ submitMsg }}</p>
                <p v-if="submitErr" class="reviews-err" role="alert">{{ submitErr }}</p>
              </div>
            </form>

            <div class="reviews-feed">
              <div class="reviews-feed-head">
                <h3 class="reviews-feed-title">Latest from players</h3>
                <span class="reviews-feed-rule" aria-hidden="true" />
              </div>
              <p v-if="loading" class="reviews-muted">Pulling threads…</p>
              <ul v-else-if="commentsSortedNewestFirst.length" class="reviews-list">
                <li v-for="c in commentsSortedNewestFirst" :key="c.id" class="reviews-item">
                  <div class="reviews-item-mark" aria-hidden="true">{{ initialFor(c.authorName) }}</div>
                  <div class="reviews-item-body">
                    <div class="reviews-item-top">
                      <span class="reviews-author">{{ c.authorName }}</span>
                      <time class="reviews-time" :datetime="c.createdAt">{{ formatDate(c.createdAt) }}</time>
                    </div>
                    <div
                      v-if="c.rating"
                      class="reviews-item-stars"
                      :aria-label="`Rating: ${c.rating} out of 5`"
                    >
                      <span v-for="n in 5" :key="n" class="reviews-mini-star" :class="{ on: c.rating >= n }">★</span>
                    </div>
                    <p class="reviews-body">{{ c.body }}</p>
                  </div>
                </li>
              </ul>
              <p v-else class="reviews-muted">No published reviews yet—your note can open the thread.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { apiUrl } from '@/lib/apiBase.js'

const props = defineProps({
  gameId: { type: Number, required: true },
  gameTitle: { type: String, default: '' },
  sectionId: { type: String, default: 'reviews' },
  /** 紧凑：与 iframe 并排侧栏；评论页传 false */
  compact: { type: Boolean, default: true },
  /** 紧凑模式下列表最多展示几条（按时间从新到旧）；0 表示不限制 */
  previewCommentLimit: { type: Number, default: 0 },
  /** 「查看全部评论」跳转路由 */
  commentsPageRoute: {
    type: Object,
    default: () => ({ name: 'comments' }),
  },
})

const headingId = 'reviews-heading'

const stats = ref({ commentCount: 0, ratingCount: 0, avgRating: null })
const comments = ref([])
const loading = ref(true)
const error = ref('')
const form = ref({ authorName: '', body: '', rating: 5 })
const submitting = ref(false)
const submitMsg = ref('')
const submitErr = ref('')

const avgDisplay = computed(() => {
  const v = stats.value.avgRating
  if (v == null || Number.isNaN(v)) return '—'
  return String(v)
})

const barPct = computed(() => {
  const avg = stats.value.avgRating
  const cnt = stats.value.ratingCount
  if (!cnt || avg == null || Number.isNaN(Number(avg))) return '0%'
  return `${Math.min(100, Math.max(0, (Number(avg) / 5) * 100))}%`
})

const ringStyle = computed(() => {
  const avg = stats.value.avgRating
  const cnt = stats.value.ratingCount
  const muted = 'color-mix(in oklch, var(--color-text) 16%, transparent)'
  if (!cnt || avg == null || Number.isNaN(Number(avg))) {
    return {
      background: `conic-gradient(from -90deg, ${muted} 0deg 360deg)`,
    }
  }
  const deg = Math.min(360, Math.max(0, (Number(avg) / 5) * 360))
  return {
    background: `conic-gradient(from -90deg, var(--color-accent) 0deg ${deg}deg, ${muted} ${deg}deg 360deg)`,
  }
})

const ringAriaLabel = computed(() => {
  const v = stats.value.avgRating
  const cnt = stats.value.ratingCount
  if (!cnt || v == null) return 'No average rating yet'
  return `Average rating ${v} out of 5 from ${cnt} ratings`
})

const commentsSortedNewestFirst = computed(() => {
  const arr = [...comments.value]
  arr.sort((a, b) => {
    const ta = new Date(a.createdAt || 0).getTime()
    const tb = new Date(b.createdAt || 0).getTime()
    return tb - ta
  })
  return arr
})

const compactCommentsToShow = computed(() => {
  if (!props.compact || !props.previewCommentLimit) return commentsSortedNewestFirst.value
  return commentsSortedNewestFirst.value.slice(0, props.previewCommentLimit)
})

const showViewAllCommentsButton = computed(() => {
  if (!props.compact || !props.previewCommentLimit) return false
  const total = Math.max(stats.value.commentCount || 0, commentsSortedNewestFirst.value.length)
  return total > props.previewCommentLimit
})

function initialFor(name) {
  const s = String(name || '').trim()
  if (!s) return '?'
  return s.slice(0, 1).toUpperCase()
}

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

async function loadStats() {
  const res = await fetch(apiUrl(`/api/games/${props.gameId}/stats`))
  if (!res.ok) throw new Error('Could not load ratings.')
  stats.value = await res.json()
}

async function loadComments() {
  const res = await fetch(apiUrl(`/api/games/${props.gameId}/comments`))
  if (!res.ok) throw new Error('Could not load comments.')
  const data = await res.json()
  comments.value = data.comments || []
}

async function loadAll() {
  loading.value = true
  error.value = ''
  try {
    await Promise.all([loadStats(), loadComments()])
  } catch (e) {
    const msg = e?.message || ''
    const net =
      msg === 'Failed to fetch' || msg.includes('NetworkError') || e?.name === 'TypeError'
    const prodNoApi =
      import.meta.env.PROD && !import.meta.env.VITE_API_URL
    const prodApiButDown =
      import.meta.env.PROD && Boolean(import.meta.env.VITE_API_URL)
    error.value = net
      ? prodNoApi
        ? '线上未配置 VITE_API_URL：请在部署前端的平台（如 Vercel「前端」项目）→ Environment Variables 添加 VITE_API_URL=https://你的后端根地址（无末尾 /），保存后 Redeploy。'
        : prodApiButDown
          ? '无法连接评论 API：请确认后端已部署、HTTPS 可访问，且 VITE_API_URL 与后端实际域名一致（无末尾 /）。'
          : '无法连接评论 API（常见原因：只启动了前端、后端未在 3001 运行）。请在 cobbcanmove-web 目录执行 npm run dev（会同时启动网站与 API），或另开终端在 cobbcanmove-server 执行 npm start，然后刷新本页。'
      : msg || 'Connection error. Start the API server on port 3001.'
  } finally {
    loading.value = false
  }
}

async function submitReview() {
  submitMsg.value = ''
  submitErr.value = ''
  submitting.value = true
  try {
    const res = await fetch(apiUrl(`/api/games/${props.gameId}/comments`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorName: form.value.authorName,
        body: form.value.body,
        rating: form.value.rating,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      submitErr.value = data.error || 'Submit failed.'
      return
    }
    submitMsg.value = data.message || 'Thanks!'
    form.value.body = ''
    await loadAll()
  } catch {
    submitErr.value =
      import.meta.env.PROD && !import.meta.env.VITE_API_URL
        ? '线上未配置 VITE_API_URL，评论无法提交。请在 Vercel 前端项目环境变量中配置后端地址并重新部署。'
        : import.meta.env.PROD
          ? '网络错误：请确认后端已上线且 VITE_API_URL 正确。'
          : '网络错误：请确认 API 已在端口 3001 运行（npm run dev 或 cobbcanmove-server 里 npm start）。'
  } finally {
    submitting.value = false
  }
}

watch(
  () => props.gameId,
  () => {
    loadAll()
  },
)

onMounted(() => {
  loadAll()
})
</script>

<style scoped>
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

.reviews-section {
  font-family: var(--font-body);
}

.reviews-inner {
  width: 100%;
  min-width: 0;
}

.reviews-section--compact .reviews-inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* —— 紧凑侧栏 —— */
.reviews-section--compact {
  padding: 0;
  border: none;
  background: none;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.reviews-compact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-height: 0;
  flex: 1;
}

.rc-head {
  padding-bottom: 0.35rem;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
}

.rc-title {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}

.rc-sub {
  margin: 0.2rem 0 0;
  font-size: 0.72rem;
  color: var(--color-text-muted);
  line-height: 1.35;
}

.rc-scorecard {
  padding: 0.45rem 0;
}

.rc-scoreline {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.rc-avg {
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--color-accent);
}

.rc-scoreline-rest {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.15rem;
}

.rc-outof {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.rc-bar {
  height: 4px;
  border-radius: 999px;
  background: color-mix(in oklch, var(--color-text) 12%, transparent);
  overflow: hidden;
}

.rc-bar-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    color-mix(in oklch, var(--color-accent-2) 70%, var(--color-accent)),
    var(--color-accent)
  );
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.rc-counts {
  margin: 0.35rem 0 0;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  line-height: 1.35;
}

.rc-error {
  margin: 0;
  padding: 0.4rem 0.5rem;
  border-radius: 0.4rem;
  font-size: 0.68rem;
  color: oklch(78% 0.12 25);
  background: color-mix(in oklch, oklch(72% 0.15 25) 14%, transparent);
  border: 1px solid color-mix(in oklch, oklch(72% 0.15 25) 35%, transparent);
}

.rc-form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.55rem 0.6rem;
  border-radius: 0.65rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-bg) 65%, transparent);
}

.rc-form-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent-2);
}

.rc-input,
.rc-textarea {
  font: inherit;
  font-size: 0.78rem;
  width: 100%;
  padding: 0.4rem 0.5rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: color-mix(in oklch, var(--color-bg) 90%, transparent);
  color: var(--color-text);
}

.rc-input:focus-visible,
.rc-textarea:focus-visible {
  outline: none;
  border-color: color-mix(in oklch, var(--color-accent-2) 50%, var(--color-text));
  box-shadow: 0 0 0 2px color-mix(in oklch, var(--color-accent-2) 18%, transparent);
}

.rc-textarea {
  resize: vertical;
  min-height: 2.75rem;
  line-height: 1.4;
}

.rc-stars-field {
  margin: 0;
  padding: 0;
  border: none;
}

.rc-stars {
  display: flex;
  gap: 0.05rem;
}

.rc-star-label {
  cursor: pointer;
  padding: 0.1rem;
  border-radius: 0.25rem;
}

.rc-star-label:hover {
  background: color-mix(in oklch, var(--color-text) 6%, transparent);
}

.rc-star-label input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.rc-star {
  font-size: 1.1rem;
  line-height: 1;
  color: color-mix(in oklch, var(--color-text) 22%, transparent);
}

.rc-star.on {
  color: var(--color-accent);
}

.rc-form-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
}

.rc-btn {
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  font-size: 0.72rem;
  cursor: pointer;
  color: oklch(16% 0.04 285);
  background: linear-gradient(
    120deg,
    color-mix(in oklch, var(--color-accent) 82%, white),
    var(--color-accent)
  );
}

.rc-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.rc-msg {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--color-accent-2);
}

.rc-err {
  font-size: 0.68rem;
  color: oklch(78% 0.12 25);
}

.rc-feed {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-height: 0;
  flex: 1;
  overflow: visible;
}

.rc-feed-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.rc-muted {
  margin: 0;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.rc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: min(240px, 28vh);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in oklch, var(--color-accent-2) 40%, transparent) transparent;
}

.rc-list--preview {
  max-height: none;
  overflow: visible;
}

.rc-view-all {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: 0.5rem;
  padding: 0.42rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid color-mix(in oklch, var(--color-text) 22%, transparent);
  transition: border-color 0.15s ease, color 0.15s ease;
}

.rc-view-all:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.rc-note {
  padding: 0.45rem 0;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 8%, transparent);
}

.rc-note:last-child {
  border-bottom: none;
}

.rc-note-top {
  display: flex;
  justify-content: space-between;
  gap: 0.35rem;
  align-items: baseline;
}

.rc-note-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
}

.rc-note-date {
  font-size: 0.62rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.rc-note-stars {
  margin: 0.1rem 0 0.15rem;
  letter-spacing: 0.02em;
}

.rc-dot {
  font-size: 0.62rem;
  color: color-mix(in oklch, var(--color-text) 25%, transparent);
}

.rc-dot.on {
  color: var(--color-accent);
}

.rc-note-body {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.4;
  color: var(--color-text-muted);
  white-space: pre-wrap;
  word-break: break-word;
}

/* —— 完整页（评论路由） —— */
.reviews-section:not(.reviews-section--compact) {
  position: relative;
  padding-block: clamp(2.5rem, 5vw, 4rem);
  border-block: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
  background: linear-gradient(
    165deg,
    color-mix(in oklch, var(--color-surface) 55%, transparent) 0%,
    color-mix(in oklch, var(--color-bg) 92%, black) 45%,
    color-mix(in oklch, var(--color-accent-2) 6%, var(--color-bg)) 100%
  );
}

.reviews-shell {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.25rem);
}

.reviews-top {
  display: grid;
  gap: 0.5rem;
  max-width: 52ch;
}

.reviews-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent-2);
}

.reviews-title {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(1.65rem, 2.5vw + 1rem, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.reviews-deck {
  margin: 0;
  font-size: 1.02rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.reviews-layout {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;
}

@media (min-width: 900px) {
  .reviews-layout {
    grid-template-columns: minmax(200px, 260px) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 3rem);
  }
}

.reviews-side {
  position: relative;
}

.reviews-meter {
  position: sticky;
  top: 5.5rem;
  padding: 1.35rem 1.25rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  background: color-mix(in oklch, var(--color-bg) 78%, transparent);
  box-shadow: 0 1px 0 color-mix(in oklch, var(--color-text) 8%, transparent);
}

.reviews-ring-wrap {
  position: relative;
  width: min(9.5rem, 100%);
  aspect-ratio: 1;
  margin: 0 auto 1rem;
}

.reviews-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .reviews-ring,
  .rc-bar-fill {
    transition: none;
  }
}

.reviews-ring-core {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  display: grid;
  place-content: center;
  text-align: center;
  background: color-mix(in oklch, var(--color-bg) 94%, black);
  border: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
}

.reviews-ring-num {
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(1.85rem, 3vw, 2.35rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-accent);
}

.reviews-ring-denom {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.reviews-meter-caption {
  margin: 0;
  text-align: center;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.reviews-main {
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 3vw, 2.5rem);
  min-width: 0;
}

.reviews-error {
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  border: 1px solid color-mix(in oklch, oklch(72% 0.15 25) 45%, transparent);
  color: oklch(78% 0.12 25);
  font-size: 0.92rem;
  background: color-mix(in oklch, oklch(72% 0.15 25) 12%, transparent);
}

.reviews-form {
  padding: clamp(1.15rem, 2.5vw, 1.5rem);
  border-radius: 1rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
  background: color-mix(in oklch, var(--color-surface) 72%, black);
}

.reviews-form-head {
  margin-bottom: 1.1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
}

.reviews-form-title {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 800;
}

.reviews-form-hint {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.reviews-form-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .reviews-form-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'name stars'
      'body body';
  }
  .reviews-field--name {
    grid-area: name;
  }
  .reviews-field--stars {
    grid-area: stars;
  }
  .reviews-field--body {
    grid-area: body;
  }
}

.reviews-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  border: none;
  min-width: 0;
}

.reviews-field-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: color-mix(in oklch, var(--color-text-muted) 92%, var(--color-text));
}

.reviews-field input,
.reviews-field textarea {
  font: inherit;
  width: 100%;
  padding: 0.65rem 0.8rem;
  border-radius: 0.55rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 16%, transparent);
  background: color-mix(in oklch, var(--color-bg) 88%, transparent);
  color: var(--color-text);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.reviews-field input::placeholder,
.reviews-field textarea::placeholder {
  color: color-mix(in oklch, var(--color-text-muted) 65%, transparent);
}

.reviews-field input:focus-visible,
.reviews-field textarea:focus-visible {
  outline: none;
  border-color: color-mix(in oklch, var(--color-accent-2) 55%, var(--color-text));
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-accent-2) 22%, transparent);
}

.reviews-field--stars .reviews-field-label {
  margin-bottom: 0.1rem;
}

.reviews-star-row {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-wrap: wrap;
}

.reviews-star-label {
  cursor: pointer;
  position: relative;
  padding: 0.2rem;
  border-radius: 0.35rem;
  transition: background 0.12s ease;
}

.reviews-star-label:hover {
  background: color-mix(in oklch, var(--color-text) 6%, transparent);
}

.reviews-star-label input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.reviews-star {
  font-size: 1.85rem;
  line-height: 1;
  color: color-mix(in oklch, var(--color-text) 20%, transparent);
  transition:
    color 0.15s ease,
    transform 0.15s cubic-bezier(0.22, 1, 0.36, 1);
}

.reviews-star-label:hover .reviews-star {
  color: color-mix(in oklch, var(--color-accent) 55%, var(--color-text));
}

.reviews-star.on {
  color: var(--color-accent);
  transform: scale(1.02);
}

@media (prefers-reduced-motion: reduce) {
  .reviews-star,
  .reviews-star-label:hover .reviews-star {
    transition: none;
  }
}

.reviews-form-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid color-mix(in oklch, var(--color-text) 8%, transparent);
}

.reviews-submit {
  padding: 0.72rem 1.5rem;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  color: oklch(16% 0.04 285);
  background: linear-gradient(
    135deg,
    color-mix(in oklch, var(--color-accent-2) 55%, var(--color-accent)),
    var(--color-accent)
  );
  box-shadow: 0 2px 12px color-mix(in oklch, var(--color-accent) 22%, transparent);
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
}

.reviews-submit:hover:not(:disabled) {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.reviews-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.reviews-msg {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-accent-2);
}

.reviews-err {
  margin: 0;
  font-size: 0.92rem;
  color: oklch(78% 0.12 25);
}

.reviews-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-feed-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reviews-feed-title {
  margin: 0;
  flex-shrink: 0;
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.reviews-feed-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    color-mix(in oklch, var(--color-accent-2) 35%, transparent),
    color-mix(in oklch, var(--color-text) 8%, transparent)
  );
}

.reviews-muted {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.95rem;
}

.reviews-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.reviews-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem 1rem;
  padding: 1rem 1.1rem 1.1rem;
  border-radius: 0.85rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
  background: color-mix(in oklch, var(--color-bg) 55%, transparent);
  border-left: 3px solid color-mix(in oklch, var(--color-accent-2) 65%, transparent);
}

.reviews-item-mark {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.55rem;
  display: grid;
  place-items: center;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1rem;
  color: var(--color-text);
  background: color-mix(in oklch, var(--color-accent-2) 18%, var(--color-surface));
  border: 1px solid color-mix(in oklch, var(--color-accent-2) 28%, transparent);
}

.reviews-item-body {
  min-width: 0;
}

.reviews-item-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.35rem 0.75rem;
  margin-bottom: 0.25rem;
}

.reviews-author {
  font-weight: 700;
  color: var(--color-text);
}

.reviews-time {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.reviews-item-stars {
  margin-bottom: 0.4rem;
  letter-spacing: 0.06em;
}

.reviews-mini-star {
  color: color-mix(in oklch, var(--color-text) 22%, transparent);
  font-size: 0.9rem;
}

.reviews-mini-star.on {
  color: var(--color-accent);
}

.reviews-body {
  margin: 0;
  color: var(--color-text-muted);
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.96rem;
  line-height: 1.55;
}
</style>
