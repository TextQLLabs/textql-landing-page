import { writeFile } from 'fs/promises';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Current date in ISO format for lastmod
const today = new Date().toISOString();

async function generateSitemap() {
  try {
    // Create array of sitemap entries
    const sitemapEntries = [];

    // Static pages with their priorities and change frequencies
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
      { url: '/agents', priority: 0.8, changefreq: 'weekly' },
      { url: '/ontology', priority: 0.8, changefreq: 'weekly' },
      { url: '/enterprise', priority: 0.8, changefreq: 'weekly' },
      { url: '/pricing', priority: 0.8, changefreq: 'weekly' },
      { url: '/workflows', priority: 0.8, changefreq: 'weekly' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/terms', priority: 0.5, changefreq: 'yearly' },
      { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
      { url: '/events', priority: 0.7, changefreq: 'monthly' },
      { url: '/demo', priority: 0.8, changefreq: 'monthly' },
    ];

    // Add static pages to sitemap entries
    staticPages.forEach(page => {
      sitemapEntries.push({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: today
      });
    });

    // Blog posts with their specific dates
    const blogPosts = [
      { url: '/blog/sql-process', date: '2024-03-18' },
      { url: '/blog/why-ontology', date: '2024-03-17' },
      { url: '/blog/embedding-models', date: '2024-03-16' },
      { url: '/blog/tableau-integration', date: '2024-03-31' },
      { url: '/blog/haskell-in-production', date: '2024-02-07' },
      { url: '/blog/soc2-report', date: '2024-01-29' },
      { url: '/blog/nba-launchpad', date: '2024-01-25' },
      { url: '/blog/fundraising', date: '2024-01-24' },
      { url: '/blog/building-data-agent', date: '2023-10-15' },
      { url: '/blog/future-of-data', date: '2023-10-01' },
      { url: '/blog/ten-year-thesis', date: '2023-09-28' },
      { url: '/blog/sql-model', date: '2023-09-30' },
    ];

    // Add blog posts to sitemap entries
    blogPosts.forEach(post => {
      sitemapEntries.push({
        url: post.url,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: post.date
      });
    });

    // Workflow templates
    const workflows = [
      'digital-banking',
      'fraud-prevention',
      'customer-loyalty',
      'predictive-maintenance',
      'supply-chain',
      'patient-care',
      'content-performance',
      'risk-assessment',
      'production-efficiency',
      'digital-health',
      'store-traffic',
      'small-business',
      'ad-optimization',
      'digital-channel',
      'streaming-quality',
      'supply-chain-risk',
      'wealth-management',
      'customer-retention',
      'inventory-turnover',
      'audience-engagement',
      'claims-optimization',
      'platform-innovation',
      'mortgage-optimization',
      'digital-transformation',
      'operational-efficiency',
      'workforce-optimization'
    ];

    // Add workflows to sitemap entries
    workflows.forEach(workflow => {
      sitemapEntries.push({
        url: `/workflows/${workflow}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: today
      });
    });

    // Create a stream from the sitemap entries
    const stream = new SitemapStream({ hostname: 'https://textql.com' });
    const data = Readable.from(sitemapEntries).pipe(stream);
    const sitemap = await streamToPromise(data);
    
    // Write the sitemap to file
    await writeFile('./public/sitemap.xml', sitemap);
    
    console.log('Sitemap generated successfully at ./public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Log more details about the error for debugging
    console.error('Error details:', error.stack);
  }
}

// Run the function
generateSitemap(); 