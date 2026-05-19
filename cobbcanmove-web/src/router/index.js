import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo } from '@/seo/applyRouteSeo.js'
import HomeView from '@/views/HomeView.vue'
import MoreGamesView from '@/views/MoreGamesView.vue'
import CommentsView from '@/views/CommentsView.vue'
import DownloadView from '@/views/DownloadView.vue'
import BlogListView from '@/views/BlogListView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import GameDetailView from '@/views/GameDetailView.vue'
import PrivacyPolicyView from '@/views/Legal/PrivacyPolicyView.vue'
import TermsOfServiceView from '@/views/Legal/TermsOfServiceView.vue'
import CopyrightView from '@/views/Legal/CopyrightView.vue'
import AboutUsView from '@/views/Legal/AboutUsView.vue'
import ContactUsView from '@/views/Legal/ContactUsView.vue'
import { findGameById, findGameBySlug, gamePathSlug } from '@/gameRegistry.js'
import { findPostById, findPostBySlug, normalizeBlogSlug } from '@/blogRegistry.js'

function gameDetailBeforeEnter(to, _from, next) {
  const raw = String(to.params.slug ?? '').trim()
  if (!raw) {
    next({ name: 'more-games' })
    return
  }
  if (/^\d+$/.test(raw)) {
    const g = findGameById(Number.parseInt(raw, 10))
    const slug = g ? gamePathSlug(g) : ''
    if (slug) {
      next({ name: 'game-detail', params: { slug }, replace: true })
      return
    }
    next({ name: 'more-games' })
    return
  }
  if (!findGameBySlug(raw)) {
    next({ name: 'more-games' })
    return
  }
  next()
}

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
      meta: {
        title: 'COBB CAN MOVE— Play survival horror roguelite in browser',
        description:
          'Top-down survival horror in your browser: coal, light, and Cobb in Story & Endless. Free play, curated indie games, and guides on the COBB CAN MOVE Hub.',
        keywords:
          'COBB CAN MOVE, Cobb Can Move, survival horror, roguelite, browser game, Story Mode, Endless Mode, pixel art, indie horror hub, Cobb, free to play',
      },
    },
    {
      path: '/more-games',
      name: 'more-games',
      component: MoreGamesView,
      meta: {
        title: 'More games — COBB CAN MOVE Hub | Horror & indie picks',
        description:
          'Browse curated browser games: horror and indie picks with screenshots, play links, and detail pages on the COBB CAN MOVE Hub—built for quick sessions.',
        keywords:
          'COBB CAN MOVE Hub, more games, browser games, indie horror, survival horror, free web games, curated games, screenshots, play online',
      },
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentsView,
      meta: {
        title: 'Comments & ratings — COBB CAN MOVE Hub | Player reviews',
        description:
          'Read player comments and star ratings for COBB CAN MOVE. Fair feedback helps visitors decide whether to jump into the browser build.',
        keywords:
          'COBB CAN MOVE, game comments, player ratings, reviews, hub feedback, survival horror games',
      },
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
      meta: {
        title: 'Download COBB CAN MOVE — itch.io PC & bundles',
        description:
          'Get COBB CAN MOVE on itch.io: PC or pay-what-you-want bundles. Official listing link, plus install and donation notes before you download from this hub.',
        keywords:
          'COBB CAN MOVE download, itch.io, PC game, pay what you want, survival horror, roguelite, indie game, Cobb Can Move, official store',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogListView,
      meta: {
        title: 'Blog — COBB CAN MOVE Hub | Guides & survival tips',
        description:
          'COBB CAN MOVE blog: Story vs Endless tips, Cobb rule rotation, and survival horror guides—short reads before you open the home page player in your browser.',
        keywords:
          'COBB CAN MOVE blog, survival horror guide, Story Mode, Endless Mode, Cobb tips, indie game blog, roguelite, player guides',
      },
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
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Privacy Policy — COBB CAN MOVE Hub | Data practices',
        description:
          'Privacy for cobbcanmove.site: data when you browse, load games, post comments, or use APIs—cookies, logs, retention, and third-party hosts in plain English.',
        keywords:
          'Privacy Policy, COBB CAN MOVE Hub, cobbcanmove.site, cookies, personal data, comments, embedded games, GDPR transparency',
      },
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: TermsOfServiceView,
      meta: {
        title: 'Terms of Service — COBB CAN MOVE Hub | Site rules',
        description:
          'Terms for the COBB CAN MOVE Hub: acceptable use, user comments, third-party game disclaimers, liability limits, and abuse reporting—read before using the site.',
        keywords:
          'Terms of Service, COBB CAN MOVE Hub, acceptable use, user content, disclaimer, liability, site rules, legal terms',
      },
    },
    {
      path: '/copyright',
      name: 'copyright',
      component: CopyrightView,
      meta: {
        title: 'Copyright — COBB CAN MOVE Hub | DMCA & credits',
        description:
          'Copyright for the COBB CAN MOVE Hub: credits, third-party marks, fair-use intent, and how to request corrections or takedowns regarding hub text and media.',
        keywords:
          'Copyright, DMCA, COBB CAN MOVE Hub, intellectual property, trademarks, fair use, takedown request, game credits',
      },
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUsView,
      meta: {
        title: 'About us — COBB CAN MOVE Hub | Indie game portal',
        description:
          'About the COBB CAN MOVE Hub: an indie portal for the flagship browser survival game and related picks. We summarize public facts—verify in your own copy.',
        keywords:
          'About COBB CAN MOVE Hub, indie game portal, editorial curation, survival horror hub, browser games, unofficial fan site',
      },
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUsView,
      meta: {
        title: 'Contact — COBB CAN MOVE Hub | Email & moderation',
        description:
          'Email the COBB CAN MOVE Hub for broken links, accessibility, moderation, or legal mail. We are a fan hub—not every publisher’s official customer support line.',
        keywords:
          'Contact COBB CAN MOVE Hub, email support, accessibility, moderation, legal notice, site feedback, hub contact',
      },
    },
    {
      path: '/games/:slug',
      name: 'game-detail',
      component: GameDetailView,
      beforeEnter: gameDetailBeforeEnter,
    },
  ],
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
