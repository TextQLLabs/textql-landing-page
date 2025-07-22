# Asset Management Guide

## Overview

This guide covers the organization, optimization, and management of static assets including images, videos, fonts, and other media files in the TextQL Landing Page project.

## Asset Directory Structure

```
public/
├── images/
│   ├── blog/              # Blog post images
│   │   └── [post-id]/     # Post-specific images
│   ├── integrations/      # Integration logos and screenshots
│   │   ├── all/           # All integration logos
│   │   ├── snowflake/     # Snowflake-specific assets
│   │   ├── databricks/    # Databricks-specific assets
│   │   └── tableau/       # Tableau-specific assets
│   ├── logos/             # Company and product logos
│   ├── navbar/            # Navigation bar images
│   └── ontology/          # Ontology visualization assets
├── videos/                # Video assets
├── pdf/                   # PDF documents (whitepapers, etc.)
├── fonts/                 # Custom fonts (if any)
└── icons/                 # Favicon and app icons
```

## Image Management

### Image Formats and Standards

#### Recommended Formats
1. **WebP**: Primary format for web images (best compression)
2. **PNG**: For images requiring transparency
3. **JPEG**: For photographs without transparency
4. **SVG**: For logos and simple graphics

#### Format Guidelines
```bash
# Use WebP when supported, with fallbacks
# Modern browsers support WebP, older browsers fall back to PNG/JPEG

# Logo files: SVG preferred, PNG as fallback
# Screenshots: WebP with PNG fallback  
# Hero images: WebP with JPEG fallback
# Icons: SVG preferred
```

### Image Sizing Standards

#### Blog Images
```bash
# Header images
- Size: 1200×630px (16:8.4 ratio)
- Format: PNG or WebP
- Max file size: 200KB
- Use case: Social sharing, blog headers

# Content images  
- Max width: 800px
- Format: WebP preferred
- Max file size: 100KB
- Use case: Inline blog content
```

#### Integration Assets
```bash
# Logo dimensions
- Small logos: 120×60px
- Medium logos: 240×120px  
- Large logos: 480×240px
- Format: SVG preferred, PNG fallback

# Screenshots
- Width: 1200px (maintain aspect ratio)
- Format: WebP with PNG fallback
- Quality: 85% compression
```

#### Navigation Assets
```bash
# Navbar logos
- Height: 40px (maintain aspect ratio)
- Format: SVG preferred
- Background: Transparent
```

### Image Optimization Workflow

#### 1. Pre-Processing
```bash
# Recommended tools:
- Figma/Sketch: Design and export
- Photoshop: Photo editing and optimization
- GIMP: Free alternative for photo editing
```

#### 2. Compression
```bash
# Online tools:
- TinyPNG: PNG/JPEG compression
- Squoosh: WebP conversion and compression
- ImageOptim: macOS batch optimization

# Command line tools:
npm install -g imagemin-cli
imagemin public/images/*.png --out-dir=public/images/optimized
```

#### 3. Format Conversion
```bash
# Convert to WebP
cwebp input.png -q 85 -o output.webp

# Batch conversion script (in package.json)
"scripts": {
  "optimize:images": "node scripts/optimize-images.js"
}
```

### Image Loading Best Practices

#### Responsive Images
```typescript
// Use srcSet for responsive images
<img 
  src="/images/hero-800.webp"
  srcSet="
    /images/hero-400.webp 400w,
    /images/hero-800.webp 800w,
    /images/hero-1200.webp 1200w
  "
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Descriptive alt text"
/>
```

#### Lazy Loading
```typescript
// Implement lazy loading for non-critical images
<img 
  src="/images/placeholder.jpg"
  data-src="/images/actual-image.webp"
  loading="lazy"
  alt="Description"
  className="lazy-image"
/>
```

#### Image Component Pattern
```typescript
// Create reusable Image component
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  priority = false,
  ...props 
}) => {
  return (
    <img 
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
};
```

## Video Asset Management

### Video Standards
```bash
# Format preferences:
1. MP4 (H.264): Best compatibility
2. WebM: Smaller file sizes, modern browsers
3. MOV: Source format, convert for web

# Specifications:
- Resolution: 1920×1080 max
- Frame rate: 30fps
- Bitrate: 2-5 Mbps
- Duration: < 2 minutes for landing page videos
```

### Video Optimization
```bash
# FFmpeg commands for optimization
# Reduce file size while maintaining quality
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Create WebM version
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -c:a libopus output.webm
```

### Video Implementation
```typescript
// Video component with multiple formats
<video controls preload="metadata" poster="/images/video-poster.jpg">
  <source src="/videos/demo.webm" type="video/webm" />
  <source src="/videos/demo.mp4" type="video/mp4" />
  Your browser doesn't support video playback.
</video>
```

## Font Management

### Font Loading Strategy
```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

/* Font face declarations */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2'),
       url('/fonts/inter-var.woff') format('woff');
  font-display: swap; /* Improve loading performance */
  font-weight: 100 900;
}
```

### Font Optimization
```bash
# Font formats in order of preference:
1. WOFF2: Best compression, modern browsers
2. WOFF: Good compression, older browser support
3. TTF/OTF: Fallback for very old browsers

# Subset fonts to reduce file size
# Include only needed characters and weights
```

## Asset Organization Scripts

### Automated Organization
Create `scripts/organize-assets.cjs`:

```javascript
// Script to organize and optimize assets
const fs = require('fs');
const path = require('path');

function organizeAssets() {
  // Move misplaced images to correct directories
  // Rename files following naming conventions  
  // Generate WebP versions of PNG/JPEG files
  // Update file references in code
}

// Run with: npm run assets:organize
```

### Asset Audit Script
```javascript
// Check for:
// - Unused assets
// - Missing optimized versions
// - Oversized files
// - Missing alt text in components

function auditAssets() {
  // Scan public/ directory
  // Check references in src/ files
  // Report optimization opportunities
}
```

## Performance Considerations

### Asset Loading Strategies

#### Critical Assets
```typescript
// Load immediately (above-the-fold content)
- Hero images
- Logo
- Navigation icons
- Critical CSS

// Implementation
<link rel="preload" href="/images/hero.webp" as="image">
```

#### Non-Critical Assets
```typescript
// Load on demand or lazy load
- Blog images
- Integration screenshots  
- Video assets
- Below-the-fold content

// Implementation  
<img loading="lazy" src="/images/screenshot.webp" alt="Screenshot" />
```

### CDN Integration
```bash
# Consider CDN for assets if traffic grows
# Benefits:
- Faster global delivery
- Reduced server load
- Better caching
- Image transformation on-the-fly

# Popular options:
- Cloudinary: Image optimization and transformation
- AWS CloudFront: General CDN
- Vercel: Built-in optimization
```

## Asset Security

### File Type Validation
```bash
# Only allow safe file types in public/
- Images: .png, .jpg, .jpeg, .webp, .svg
- Videos: .mp4, .webm, .mov
- Documents: .pdf
- Fonts: .woff, .woff2, .ttf, .otf

# Avoid:
- Executable files
- Archives (.zip, .rar)
- Server-side scripts
```

### Content Security Policy
```html
<!-- Restrict asset sources -->
<meta http-equiv="Content-Security-Policy" content="
  img-src 'self' data: https:;
  media-src 'self';
  font-src 'self';
">
```

## Asset Naming Conventions

### File Naming Standards
```bash
# Use consistent, descriptive names
# Format: kebab-case

# Good examples:
hero-section-background.webp
integration-snowflake-logo.svg
blog-ai-analytics-header.png
video-product-demo.mp4

# Avoid:
IMG_1234.jpg
screenshot.png (too generic)
file%20with%20spaces.jpg
```

### Directory Naming
```bash
# Organize by feature/context
images/
├── blog/[post-id]/         # Blog-specific images
├── integrations/[name]/    # Integration-specific assets
├── pages/[page-name]/      # Page-specific images
└── shared/                 # Reused across multiple pages
```

## Monitoring and Maintenance

### Regular Asset Audits
```bash
# Monthly checklist:
- [ ] Identify unused assets
- [ ] Check for oversized files (>500KB)
- [ ] Verify all images have WebP versions
- [ ] Test loading performance
- [ ] Update outdated screenshots
```

### Performance Monitoring
```bash
# Track asset performance:
- Total asset size per page
- Largest Contentful Paint (LCP) impact
- Asset loading times
- Cache hit rates

# Tools:
- Lighthouse: Asset optimization suggestions
- WebPageTest: Detailed asset analysis
- Browser DevTools: Network tab monitoring
```

### Cleanup Procedures
```bash
# Remove unused assets
1. Scan codebase for asset references
2. Identify unreferenced files
3. Verify files are truly unused
4. Remove from public/ directory
5. Test to ensure nothing breaks

# Automate with script:
npm run assets:cleanup
```

## Integration with Build Process

### Build-Time Optimization
```javascript
// vite.config.ts - Add asset optimization
export default defineConfig({
  plugins: [
    // Compress images during build
    viteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 85 }
    })
  ]
});
```

### Development vs Production
```bash
# Development:
- Serve original assets for faster builds
- Skip compression for faster iteration

# Production:
- Compress all assets
- Generate multiple formats
- Optimize for delivery
```

## Troubleshooting

### Common Issues

#### Images Not Loading
```bash
# Check:
1. File exists in public/ directory
2. Path starts with / (absolute from public/)
3. File extension matches exactly
4. No spaces or special characters in filename
```

#### Poor Performance
```bash
# Solutions:
1. Compress oversized images
2. Convert to WebP format
3. Implement lazy loading
4. Use appropriate image sizes
5. Preload critical assets
```

#### CORS Issues
```bash
# For external assets:
- Ensure proper CORS headers
- Use relative paths when possible
- Consider hosting assets locally
```

## Related Documentation
- [Performance Optimization](./performance.md)
- [Component Development](./component-development.md)  
- [Blog System](./blog-system.md)
- [Deployment Guide](./deployment.md)