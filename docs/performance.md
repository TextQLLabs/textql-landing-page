# Performance Optimization Guide

## Overview

This guide covers performance optimization strategies, monitoring, and best practices for the TextQL Landing Page to ensure fast loading times and excellent user experience.

## Performance Targets

### Core Web Vitals Goals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms  
- **Cumulative Layout Shift (CLS)**: < 0.1

### Additional Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Total Blocking Time (TBT)**: < 200ms
- **Speed Index**: < 3.0s

## Performance Monitoring

### Lighthouse Audits
```bash
# Run Lighthouse audit locally
npx lighthouse http://localhost:5173 --view

# Key categories to monitor:
- Performance (target: 90+)
- Accessibility (target: 95+)
- Best Practices (target: 100)
- SEO (target: 100)
```

### Real User Monitoring (RUM)
```typescript
// Implement Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send metrics to your analytics platform
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Budget
```javascript
// Recommended budgets
const performanceBudget = {
  // Asset sizes
  maxImageSize: '200KB',
  maxJSBundleSize: '250KB',
  maxCSSSize: '50KB',
  maxTotalSize: '1MB',
  
  // Metrics
  maxLCP: '2500ms',
  maxFID: '100ms',
  maxCLS: '0.1'
};
```

## JavaScript Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Look for:
- Large dependencies (>50KB)
- Duplicate code
- Unused imports
- Opportunities for code splitting
```

### Code Splitting Strategies

#### Route-Based Splitting
```typescript
// Automatic with React Router
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import('../pages/blog/index'));
const PricingPage = lazy(() => import('../pages/Pricing'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Suspense>
  );
}
```

#### Component-Based Splitting
```typescript
// Split heavy components
const ChartComponent = lazy(() => import('./ChartComponent'));
const ThreeJSVisualization = lazy(() => import('./ThreeJSVisualization'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartComponent data={data} />
      </Suspense>
    </div>
  );
}
```

### Tree Shaking Optimization
```typescript
// Import only what you need
// ❌ Bad - imports entire library
import * as _ from 'lodash';

// ✅ Good - imports specific function
import { debounce } from 'lodash-es';

// ✅ Better - use native alternatives
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
```

### Dependency Optimization
```bash
# Analyze dependency sizes
npm ls --depth=0

# Replace heavy dependencies:
# moment.js → date-fns (smaller)
# lodash → lodash-es (tree-shakeable)
# axios → fetch (native)

# Check bundle impact before adding new dependencies
```

## CSS Optimization

### Tailwind CSS Optimization
```javascript
// tailwind.config.js - Purge unused styles
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Removes unused styles in production
};
```

### Critical CSS
```html
<!-- Inline critical CSS for above-the-fold content -->
<style>
  /* Critical styles for hero section */
  .hero { display: flex; min-height: 100vh; }
  .hero-title { font-size: 3rem; font-weight: bold; }
</style>
```

### CSS Loading Strategy
```typescript
// Load non-critical CSS asynchronously
const loadCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load as non-blocking
  link.onload = () => { link.media = 'all'; }; // Apply after load
  document.head.appendChild(link);
};
```

## Image Optimization

### Format Optimization
```html
<!-- Use WebP with fallbacks -->
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <source srcset="/images/hero.jpg" type="image/jpeg">
  <img src="/images/hero.jpg" alt="Hero image" loading="lazy">
</picture>
```

### Responsive Images
```html
<!-- Serve appropriate sizes -->
<img 
  src="/images/hero-800.webp"
  srcset="
    /images/hero-400.webp 400w,
    /images/hero-800.webp 800w,
    /images/hero-1200.webp 1200w
  "
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Hero image"
  loading="lazy"
/>
```

### Image Loading Strategy
```typescript
// Prioritize above-the-fold images
<img 
  src="/images/hero.webp" 
  alt="Hero"
  loading="eager"    // Load immediately
  fetchpriority="high"
/>

// Lazy load below-the-fold images
<img 
  src="/images/feature.webp" 
  alt="Feature"
  loading="lazy"     // Load when near viewport
/>
```

## Font Optimization

### Font Loading Strategy
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font face with swap strategy -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-display: swap; /* Show fallback immediately */
    font-weight: 100 900;
  }
</style>
```

### Font Subsetting
```bash
# Include only needed characters and weights
# Tools: Google Fonts helper, fonttools

# Example: Include only Latin characters
font-family: 'Inter', sans-serif;
font-display: swap;
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
```

## Runtime Performance

### React Performance Optimization

#### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoize callback functions
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);

// Memoize components
const ExpensiveComponent = memo(({ data }) => {
  return <div>{processData(data)}</div>;
});
```

#### Virtual Scrolling
```typescript
// For long lists, implement virtual scrolling
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </List>
  );
}
```

#### Optimize Re-renders
```typescript
// Use React DevTools Profiler to identify unnecessary re-renders

// Split state to reduce re-render scope
const [formData, setFormData] = useState({});
const [uiState, setUiState] = useState({});

// Use refs for values that don't need re-renders
const previousValue = useRef(null);
```

### Animation Performance
```css
/* Use CSS transforms for animations */
.animated-element {
  /* ✅ GPU-accelerated properties */
  transform: translateX(100px);
  opacity: 0.5;
  
  /* ❌ Avoid animating layout properties */
  /* width: 200px; height: 100px; left: 50px; */
}

/* Use will-change for complex animations */
.complex-animation {
  will-change: transform, opacity;
}

/* Remove will-change when animation completes */
.animation-complete {
  will-change: auto;
}
```

## Resource Loading Optimization

### Preloading Strategies
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image">

<!-- Prefetch next-page resources -->
<link rel="prefetch" href="/js/blog-page.js">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.textql.com">
```

### Service Worker Caching
```typescript
// Implement service worker for asset caching
const CACHE_NAME = 'textql-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/images/logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## Network Optimization

### HTTP/2 Optimization
```bash
# Leverage HTTP/2 features:
- Multiplexing: Send multiple requests simultaneously
- Server push: Proactively send resources
- Header compression: Reduce overhead

# Netlify automatically provides HTTP/2
```

### Compression
```toml
# netlify.toml - Enable compression
[[headers]]
  for = "/*"
  [headers.values]
    Content-Encoding = "gzip"
    
[[headers]]
  for = "*.js"
  [headers.values]
    Content-Encoding = "br" # Brotli compression
```

### CDN Optimization
```bash
# Netlify CDN optimizations:
- Global edge locations
- Automatic asset optimization
- Intelligent caching
- Image transformation on-the-fly
```

## Third-Party Performance

### Script Loading Strategy
```html
<!-- Load non-critical scripts asynchronously -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Defer scripts that don't need immediate execution -->
<script defer src="/js/analytics.js"></script>

<!-- Use dynamic imports for conditional loading -->
<script>
  if (userConsent) {
    import('./analytics.js').then(module => module.init());
  }
</script>
```

### Third-Party Monitoring
```typescript
// Monitor third-party impact
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes('third-party-domain.com')) {
      console.log('Third-party resource:', entry.duration);
    }
  });
});

observer.observe({ entryTypes: ['resource'] });
```

## Development Performance Tools

### Vite Optimization
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', '@react-spring/web']
        }
      }
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Minify for production
    minify: 'terser'
  }
});
```

### Build Analysis
```bash
# Bundle analysis commands
npm run build
npx vite-bundle-analyzer

# Performance testing
npm run build
npm run preview
lighthouse http://localhost:4173 --view
```

## Performance Testing

### Automated Testing
```bash
# Add to CI/CD pipeline
npm install -g @lhci/cli

# Lighthouse CI configuration
lhci autorun --upload.target=temporary-public-storage
```

### Manual Testing Checklist
```bash
# Test on different devices and networks:
- [ ] Desktop (fast connection)
- [ ] Mobile (3G throttling)
- [ ] Tablet (WiFi)
- [ ] Slow connection simulation

# Performance audit checklist:
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms  
- [ ] CLS < 0.1
- [ ] No console errors
- [ ] Smooth animations (60fps)
```

## Monitoring and Alerting

### Performance Metrics Tracking
```typescript
// Track custom metrics
function trackPerformance() {
  // Track bundle load time
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  
  // Track route changes
  const routeChangeStart = performance.now();
  
  // Send to analytics
  analytics.track('performance', {
    loadTime,
    page: window.location.pathname,
    userAgent: navigator.userAgent
  });
}
```

### Performance Budgets
```json
{
  "lighthouse": {
    "performance": 90,
    "accessibility": 95,
    "best-practices": 100,
    "seo": 100
  },
  "budgets": {
    "totalSize": "1MB",
    "jsSize": "300KB",
    "cssSize": "50KB",
    "imageSize": "500KB"
  }
}
```

## Performance Regression Prevention

### Pre-deployment Checks
```bash
# Add to PR workflow
npm run build
npm run preview

# Run Lighthouse audit
lighthouse http://localhost:4173 --budget-path=budget.json

# Bundle size check
bundlesize check
```

### Monitoring Dashboard
```typescript
// Track key metrics over time
const performanceMetrics = {
  buildSize: getBuildSize(),
  lighthouseScore: getLighthouseScore(),
  coreWebVitals: getCoreWebVitals(),
  loadTime: getAverageLoadTime()
};

// Alert on regressions
if (performanceMetrics.lighthouseScore < 90) {
  alertTeam('Performance regression detected');
}
```

## Future Optimizations

### Advanced Techniques
- **Module Federation**: Micro-frontend architecture
- **Edge-Side Includes**: Dynamic content at CDN edge
- **WebAssembly**: CPU-intensive calculations
- **Web Workers**: Background processing
- **Streaming SSR**: Progressive content delivery

### Emerging Standards
- **Core Web Vitals**: Evolving metrics
- **HTTP/3**: Next-generation protocol
- **WebP/AVIF**: Next-gen image formats
- **Container Queries**: Element-based responsive design

## Related Documentation
- [Asset Management](./asset-management.md)
- [Deployment Guide](./deployment.md)
- [Testing Guide](./testing.md)
- [Troubleshooting](./troubleshooting.md)