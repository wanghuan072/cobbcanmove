import { fileURLToPath, URL } from 'node:url'
import { join } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { writeSitemapBundle } from './scripts/generate-sitemap.mjs'

/** 构建结束时写入 dist/sitemap.xml、dist/robots.txt（与 npm run generate-sitemap 同源数据） */
function cobbcanmoveSitemapPlugin() {
  return {
    name: 'cobbcanmove-sitemap',
    apply: 'build',
    closeBundle() {
      const distDir = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
      const { count } = writeSitemapBundle(distDir)
      console.log(`[cobbcanmove-sitemap] wrote ${count} URLs → dist/sitemap.xml, dist/robots.txt`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    ...(mode === 'development' ? [vueDevTools()] : []),
    cobbcanmoveSitemapPlugin(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
