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
      exclude: [
        '/404', 
        '/__spa-fallback', 
        '/design-system',
        // Exclude any paths that redirect
        '/docs',
        '/documentation',
        '/events'  // This seems to redirect based on the code
      ],
      outDir: './build/client',
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
        '/demo',
        // Blog posts - verified these exist in src/data/blog
        '/blog/building-data-agent',
        '/blog/embedding-models',
        '/blog/fundraising',
        '/blog/future-of-data',
        '/blog/haskell-in-production',
        '/blog/nba-launchpad',
        '/blog/soc2-report',
        '/blog/sql-model',
        '/blog/sql-process',
        '/blog/tableau-integration',
        '/blog/ten-year-thesis',
        '/blog/why-ontology',
        // Workflows - verified these exist in src/data/workflows
        '/workflows/ad-optimization',
        '/workflows/audience-engagement',
        '/workflows/claims-optimization',
        '/workflows/content-performance',
        '/workflows/customer-loyalty',
        '/workflows/customer-retention',
        '/workflows/digital-banking',
        '/workflows/digital-channel',
        '/workflows/digital-health',
        '/workflows/digital-transformation',
        '/workflows/fraud-prevention',
        '/workflows/inventory-turnover',
        '/workflows/mortgage-optimization',
        '/workflows/operational-efficiency',
        '/workflows/patient-care',
        '/workflows/platform-innovation',
        '/workflows/predictive-maintenance',
        '/workflows/preventive-care',
        '/workflows/production-efficiency',
        '/workflows/quality-control',
        '/workflows/risk-assessment',
        '/workflows/small-business',
        '/workflows/store-traffic',
        '/workflows/streaming-quality',
        '/workflows/supply-chain',
        '/workflows/supply-chain-risk',
        '/workflows/telehealth',
        '/workflows/wealth-management',
        '/workflows/workforce-optimization'
      ],
      changefreq: {
        '/': 'weekly',
        '/blog': 'daily',
        '/blog/*': 'weekly',
        '/workflows/*': 'monthly',
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
        '/blog/*': 0.7,
        '/workflows/*': 0.7,
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