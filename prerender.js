import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes to prerender
const routes = [
  '/',
  '/pricing',
  '/enterprise',
  '/workflows',
  '/about',
  '/agents',
  '/ontology',
  '/terms',
  '/privacy',
  '/blog',
  '/demo'
];

async function prerender() {
  console.log('Starting prerendering...');
  
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Create a simple server to serve the dist directory
  const { createServer } = await import('http-server');
  const server = createServer({ root: path.join(__dirname, 'dist'), cache: -1 });
  server.listen(8080);
  
  try {
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      
      // Navigate to the page
      await page.goto(`http://localhost:8080${route}`, { waitUntil: 'networkidle0' });
      
      // Get the HTML content
      const html = await page.content();
      
      // Create the directory if it doesn't exist
      const dirPath = path.join(__dirname, 'dist', route === '/' ? '' : route);
      if (route !== '/' && !fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Write the HTML to a file
      const filePath = path.join(dirPath, route === '/' ? 'index.html' : 'index.html');
      fs.writeFileSync(filePath, html);
      
      console.log(`Prerendered ${route}`);
    }
  } catch (error) {
    console.error('Error during prerendering:', error);
  } finally {
    // Close the browser and server
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  }
}

prerender(); 