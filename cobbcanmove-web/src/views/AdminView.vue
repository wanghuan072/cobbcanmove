<template>
  <main id="top" class="admin-main">
    <section class="admin-section">
      <div class="container">
        <div class="admin-content">
          <header class="admin-head">
            <h1>Review moderation</h1>
            <p class="admin-lead">Approve or reject player comments and ratings. Session is kept in this browser only.</p>
          </header>

          <form v-if="!token" class="admin-login" @submit.prevent="login">
            <label>
              Admin password
              <input v-model="password" type="password" autocomplete="current-password" required />
            </label>
            <button type="submit" :disabled="loggingIn">{{ loggingIn ? 'Signing in…' : 'Sign in' }}</button>
            <p v-if="loginErr" class="admin-err" role="alert">{{ loginErr }}</p>
          </form>

          <template v-else>
            <div class="admin-toolbar">
              <label>
                Filter
                <select v-model="filterStatus" @change="loadList">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="all">All</option>
                </select>
              </label>
              <button type="button" class="admin-ghost" @click="logout">Sign out</button>
            </div>

            <p v-if="listErr" class="admin-err" role="alert">{{ listErr }}</p>
            <p v-if="loading" class="admin-muted">Loading…</p>

            <div v-else class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Game</th>
                    <th>Author</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in rows" :key="c.id">
                    <td>{{ c.id }}</td>
                    <td>{{ c.gameTitle }}</td>
                    <td>{{ c.authorName }}</td>
                    <td>{{ c.rating ?? '—' }}</td>
                    <td class="admin-cell-body">{{ c.body }}</td>
                    <td>{{ c.status }}</td>
                    <td class="admin-actions">
                      <button v-if="c.status !== 'approved'" type="button" @click="setStatus(c.id, 'approved')">Approve</button>
                      <button v-if="c.status !== 'rejected'" type="button" @click="setStatus(c.id, 'rejected')">Reject</button>
                      <button type="button" class="admin-danger" @click="remove(c.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-if="!rows.length" class="admin-muted">No rows in this filter.</p>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { apiUrl } from '@/lib/apiBase.js'

const TOKEN_KEY = 'cobb_admin_token'

const password = ref('')
const loggingIn = ref(false)
const loginErr = ref('')
const token = ref('')
const filterStatus = ref('pending')
const rows = ref([])
const loading = ref(false)
const listErr = ref('')

function authHeaders() {
  return {
    Authorization: `Bearer ${token.value}`,
    'Content-Type': 'application/json',
  }
}

async function login() {
  loginErr.value = ''
  loggingIn.value = true
  try {
    const res = await fetch(apiUrl('/api/admin/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      loginErr.value = data.error || 'Login failed'
      return
    }
    token.value = data.token
    sessionStorage.setItem(TOKEN_KEY, data.token)
    password.value = ''
    await loadList()
  } catch {
    loginErr.value = 'Network error'
  } finally {
    loggingIn.value = false
  }
}

function logout() {
  token.value = ''
  sessionStorage.removeItem(TOKEN_KEY)
  rows.value = []
}

async function loadList() {
  if (!token.value) return
  loading.value = true
  listErr.value = ''
  try {
    const q = new URLSearchParams({ status: filterStatus.value })
    const res = await fetch(apiUrl(`/api/admin/comments?${q}`), { headers: authHeaders() })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) {
      logout()
      loginErr.value = 'Session expired—sign in again.'
      return
    }
    if (!res.ok) {
      listErr.value = data.error || 'Failed to load'
      return
    }
    rows.value = data.comments || []
  } catch {
    listErr.value = 'Network error'
  } finally {
    loading.value = false
  }
}

async function setStatus(id, status) {
  try {
    const res = await fetch(apiUrl(`/api/admin/comments/${id}`), {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return
    await loadList()
  } catch {
    listErr.value = 'Update failed'
  }
}

async function remove(id) {
  if (!confirm('Delete this comment permanently?')) return
  try {
    await fetch(apiUrl(`/api/admin/comments/${id}`), { method: 'DELETE', headers: authHeaders() })
    await loadList()
  } catch {
    listErr.value = 'Delete failed'
  }
}

watch(token, (t) => {
  if (t) document.title = 'Admin — Reviews'
})

onMounted(() => {
  const t = sessionStorage.getItem(TOKEN_KEY)
  if (t) {
    token.value = t
    loadList()
  }
})
</script>

<style scoped>
.admin-main {
  display: block;
  padding-block: clamp(2rem, 4vw, 3rem);
}

.admin-head {
  margin-bottom: 1.5rem;
}

.admin-head h1 {
  margin: 0 0 0.5rem;
}

.admin-lead {
  margin: 0;
  color: var(--color-text-muted);
  max-width: 56ch;
}

.admin-login {
  display: grid;
  gap: 1rem;
  max-width: 360px;
}

.admin-login label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}

.admin-login input {
  padding: 0.55rem 0.65rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 20%, transparent);
  background: color-mix(in oklch, var(--color-bg) 85%, transparent);
  color: var(--color-text);
  font: inherit;
}

.admin-login button {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  background: var(--color-accent);
  color: oklch(14% 0.04 285);
}

.admin-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-toolbar label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.admin-toolbar select {
  padding: 0.45rem 0.6rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 18%, transparent);
  background: var(--color-surface);
  color: var(--color-text);
}

.admin-ghost {
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklch, var(--color-text) 22%, transparent);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font-weight: 600;
}

.admin-table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.admin-table th,
.admin-table td {
  border: 1px solid color-mix(in oklch, var(--color-text) 14%, transparent);
  padding: 0.5rem 0.6rem;
  text-align: left;
  vertical-align: top;
}

.admin-table th {
  background: color-mix(in oklch, var(--color-surface) 90%, black);
}

.admin-cell-body {
  max-width: 280px;
  white-space: pre-wrap;
  word-break: break-word;
}

.admin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.admin-actions button {
  font-size: 0.78rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
  border: 1px solid color-mix(in oklch, var(--color-text) 20%, transparent);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
}

.admin-danger {
  border-color: color-mix(in oklch, oklch(55% 0.2 25) 50%, transparent) !important;
  color: oklch(78% 0.12 25) !important;
}

.admin-err {
  color: oklch(72% 0.15 25);
}

.admin-muted {
  color: var(--color-text-muted);
}
</style>
