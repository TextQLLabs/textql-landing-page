import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Ensure the public directory exists
const publicDir = './public';
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy sitemap.xml if it exists
const sitemapSource = './build/client/sitemap.xml';
const sitemapDest = './public/sitemap.xml';
if (existsSync(sitemapSource)) {
  try {
    copyFileSync(sitemapSource, sitemapDest);
    console.log(`✅ Copied sitemap.xml to ${sitemapDest}`);
  } catch (error) {
    console.error(`❌ Error copying sitemap.xml: ${error.message}`);
  }
} else {
  console.warn(`⚠️ Sitemap not found at ${sitemapSource}`);
}

// Copy robots.txt if it exists
const robotsSource = './build/client/robots.txt';
const robotsDest = './public/robots.txt';
if (existsSync(robotsSource)) {
  try {
    copyFileSync(robotsSource, robotsDest);
    console.log(`✅ Copied robots.txt to ${robotsDest}`);
  } catch (error) {
    console.error(`❌ Error copying robots.txt: ${error.message}`);
  }
} else {
  console.warn(`⚠️ robots.txt not found at ${robotsSource}`);
} 