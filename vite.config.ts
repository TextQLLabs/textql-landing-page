import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { reactRouter } from '@react-router/dev/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    reactRouter(),
    sitemap({
      hostname: 'https://textql.com',
      exclude: ['/404', '/__spa-fallback'],
      dynamicRoutes: [
        '/',
        '/blog',
        '/agents',
        '/ontology',
        '/enterprise',
        '/pricing',
        '/workflows',
        '/about',
        '/terms',
        '/privacy',
        '/demo'
      ],
      changefreq: {
        '/': 'weekly',
        '/blog': 'daily',
        '/agents': 'weekly',
        '/ontology': 'weekly',
        '/enterprise': 'weekly',
        '/pricing': 'weekly',
        '/workflows': 'weekly',
        '/about': 'monthly',
        '/terms': 'yearly',
        '/privacy': 'yearly',
        '/demo': 'weekly'
      },
      priority: {
        '/': 1.0,
        '/blog': 0.9,
        '/agents': 0.8,
        '/ontology': 0.8,
        '/enterprise': 0.8,
        '/pricing': 0.8,
        '/workflows': 0.8,
        '/about': 0.7,
        '/terms': 0.2,
        '/privacy': 0.2,
        '/demo': 0.8
      },
      lastmod: new Date()
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  assetsInclude: ['**/*.md'],
})