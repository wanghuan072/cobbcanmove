import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MoreGamesView from '@/views/MoreGamesView.vue'
import CommentsView from '@/views/CommentsView.vue'
import DownloadView from '@/views/DownloadView.vue'
import BlogListView from '@/views/BlogListView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import GameDetailView from '@/views/GameDetailView.vue'
import AdminView from '@/views/AdminView.vue'
import { findGameById, getMainGameId } from '@/gameRegistry.js'
import { findPostById, findPostBySlug, normalizeBlogSlug } from '@/blogRegistry.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 72 })
        }, 50)
      })
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/more-games',
      name: 'more-games',
      component: MoreGamesView,
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentsView,
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogListView,
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView,
      beforeEnter(to, _from, next) {
        const raw = String(to.params.slug ?? '')
        if (/^\d+$/.test(raw)) {
          const legacy = findPostById(Number.parseInt(raw, 10))
          const slug = legacy?.addressBar ? normalizeBlogSlug(legacy.addressBar) : ''
          if (slug) {
            next({ name: 'blog-post', params: { slug }, replace: true })
            return
          }
        }
        if (!findPostBySlug(raw)) {
          next({ name: 'blog' })
          return
        }
        next()
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/games/:id',
      name: 'game-detail',
      component: GameDetailView,
      beforeEnter(to, _from, next) {
        const id = Number.parseInt(String(to.params.id), 10)
        if (Number.isNaN(id)) {
          next({ name: 'more-games' })
          return
        }
        if (id === getMainGameId()) {
          next({ name: 'home' })
          return
        }
        if (!findGameById(id)) {
          next({ name: 'more-games' })
          return
        }
        next()
      },
    },
  ],
})

export default router
