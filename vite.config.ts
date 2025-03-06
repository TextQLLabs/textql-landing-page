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
      outDir: './build/client',
      // Define all routes as simple strings
      dynamicRoutes: [
        '/',
        '/blog/',
        '/agents/',
        '/ontology/',
        '/enterprise/',
        '/pricing/',
        '/workflows/',
        '/about/',
        '/terms/',
        '/privacy/',
        '/demo/',
        // Blog posts
        ...['building-data-agent', 'embedding-models', 'fundraising', 'future-of-data',
            'haskell-in-production', 'nba-launchpad', 'soc2-report', 'sql-model',
            'sql-process', 'tableau-integration', 'ten-year-thesis', 'why-ontology']
            .map(slug => `/blog/${slug}`),
        // Workflows
        ...['ad-optimization', 'audience-engagement', 'claims-optimization', 'content-performance',
            'customer-loyalty', 'customer-retention', 'digital-banking', 'digital-channel',
            'digital-health', 'digital-transformation', 'fraud-prevention', 'inventory-turnover',
            'mortgage-optimization', 'operational-efficiency', 'patient-care', 'platform-innovation',
            'predictive-maintenance', 'preventive-care', 'production-efficiency', 'quality-control',
            'risk-assessment', 'small-business', 'store-traffic', 'streaming-quality',
            'supply-chain', 'supply-chain-risk', 'telehealth', 'wealth-management',
            'workforce-optimization']
            .map(slug => `/workflows/${slug}/`)
      ],
      // Define metadata using RoutesOptionMap
      changefreq: {
        '/': 'weekly',
        '/blog/': 'daily',
        '/agents/': 'weekly',
        '/ontology/': 'weekly',
        '/enterprise/': 'weekly',
        '/pricing/': 'weekly',
        '/workflows/': 'weekly',
        '/about/': 'monthly',
        '/terms/': 'yearly',
        '/privacy/': 'yearly',
        '/demo/': 'weekly',
        '/blog/*': 'monthly',
        '/workflows/*': 'monthly'
      },
      priority: {
        '/': 1.0,
        '/blog/': 0.9,
        '/agents/': 0.8,
        '/ontology/': 0.8,
        '/enterprise/': 0.8,
        '/pricing/': 0.8,
        '/workflows/': 0.8,
        '/about/': 0.7,
        '/terms/': 0.2,
        '/privacy/': 0.2,
        '/demo/': 0.8,
        '/blog/*': 0.7,
        '/workflows/*': 0.7
      },
      lastmod: new Date(),
      exclude: ['/404', '/__spa-fallback', '/design-system', '/docs/*', '/documentation/*', '/events'],
      readable: true
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  assetsInclude: ['**/*.md'],
})