import { dirname } from 'path';
import { writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { create } from 'xmlbuilder2';

// Ensure the public directory exists
const publicDir = './public';
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Define routes
const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog/', changefreq: 'daily', priority: 0.9 },
  { url: '/agents/', changefreq: 'weekly', priority: 0.8 },
  { url: '/ontology/', changefreq: 'weekly', priority: 0.8 },
  { url: '/enterprise/', changefreq: 'weekly', priority: 0.8 },
  { url: '/pricing/', changefreq: 'weekly', priority: 0.8 },
  { url: '/workflows/', changefreq: 'weekly', priority: 0.8 },
  { url: '/about/', changefreq: 'monthly', priority: 0.7 },
  { url: '/terms/', changefreq: 'yearly', priority: 0.2 },
  { url: '/privacy/', changefreq: 'yearly', priority: 0.2 },
  { url: '/demo/', changefreq: 'weekly', priority: 0.8 },
  // Blog posts
  ...['building-data-agent', 'embedding-models', 'fundraising', 'future-of-data',
      'haskell-in-production', 'nba-launchpad', 'soc2-report', 'sql-model',
      'sql-process', 'tableau-integration', 'ten-year-thesis', 'why-ontology']
      .map(slug => ({ 
        url: `/blog/${slug}/`,
        changefreq: 'monthly', 
        priority: 0.7 
      })),
  // Workflows
  ...['ad-optimization', 'audience-engagement', 'claims-optimization', 'content-performance',
      'customer-loyalty', 'customer-retention', 'digital-banking', 'digital-channel',
      'digital-health', 'digital-transformation', 'fraud-prevention', 'inventory-turnover',
      'mortgage-optimization', 'operational-efficiency', 'patient-care', 'platform-innovation',
      'predictive-maintenance', 'preventive-care', 'production-efficiency', 'quality-control',
      'risk-assessment', 'small-business', 'store-traffic', 'streaming-quality',
      'supply-chain', 'supply-chain-risk', 'telehealth', 'wealth-management',
      'workforce-optimization']
      .map(slug => ({ 
        url: `/workflows/${slug}/`, 
        changefreq: 'monthly', 
        priority: 0.7 
      }))
];

// Generate sitemap
const sitemap = create({ version: '1.0', encoding: 'UTF-8' })
  .ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
    'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
    'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'
  });

routes.forEach(({ url, changefreq, priority }) => {
  sitemap.ele('url')
    .ele('loc').txt(`https://textql.com${url}`).up()
    .ele('lastmod').txt(new Date().toISOString()).up()
    .ele('changefreq').txt(changefreq).up()
    .ele('priority').txt(priority.toString()).up();
});

const sitemapXml = sitemap.end({ prettyPrint: true });
const sitemapDest = './dist/sitemap.xml';

try {
  writeFileSync(sitemapDest, sitemapXml);
  console.log(`✅ Generated sitemap.xml at ${sitemapDest}`);
} catch (error) {
  console.error(`❌ Error generating sitemap.xml: ${error.message}`);
}