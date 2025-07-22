# Deployment Guide

## Overview

The TextQL Landing Page is deployed to **Netlify** with automatic deployments from the main branch and deploy previews for pull requests.

## Deployment Configuration

### Netlify Configuration
The deployment is configured via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Process
1. **Install dependencies**: `npm install`
2. **Run build**: `npm run build` 
3. **Output**: Static files in `dist/` directory
4. **Deploy**: Upload to Netlify CDN

## Deployment Types

### 1. Production Deployment
- **Trigger**: Push to `main` branch
- **URL**: Primary domain
- **Environment**: Production variables from Netlify dashboard

### 2. Deploy Previews
- **Trigger**: Pull requests
- **URL**: Unique preview URL for each PR
- **Environment**: Same as production

### 3. Branch Deployments
- **Trigger**: Push to feature branches (if enabled)
- **URL**: Branch-specific URL
- **Environment**: Production variables

## Environment Variables

### Required Variables
Set these in Netlify dashboard under Site Settings > Environment Variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.textql.com

# Environment
VITE_ENVIRONMENT=production

# Analytics (optional)
VITE_ANALYTICS_ID=your-analytics-id

# Feature Flags
VITE_ENABLE_BLOG=true
VITE_ENABLE_SOLUTIONS=true
```

### Setting Variables
1. Go to Netlify dashboard
2. Navigate to Site Settings > Environment Variables
3. Add each variable with appropriate scope:
   - **All deploy contexts**: For most variables
   - **Production only**: For production-specific config

## Manual Deployment

### From Local Machine
```bash
# Build the project
npm run build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod --dir=dist
```

### Netlify CLI Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to site (one-time setup)
netlify link
```

## Build Optimization

### Performance Optimizations
- **Code splitting**: Automatic via Vite
- **Asset optimization**: Images and CSS minification
- **Tree shaking**: Unused code elimination
- **Caching**: Long-term caching for static assets

### Build Commands
```bash
# Standard build
npm run build

# Build with prerendering (for SEO)
npm run prerender

# Preview build locally
npm run preview
```

## Monitoring & Debugging

### Build Logs
- **Netlify Dashboard**: View build logs for each deployment
- **Build time**: Typical builds take 2-3 minutes
- **Common issues**: Check dependency installation and environment variables

### Deploy Status
```bash
# Check deployment status (Netlify CLI)
netlify status

# View recent deployments
netlify sites:list
```

### Performance Monitoring
- **Netlify Analytics**: Built-in traffic analytics
- **Lighthouse**: Core Web Vitals monitoring
- **Real User Monitoring**: Consider third-party tools

## Rollback Procedures

### Automatic Rollback
- **Failed builds**: Netlify keeps previous successful deployment live
- **No downtime**: Failed deployments don't affect live site

### Manual Rollback
1. Go to Netlify dashboard
2. Navigate to Deploys tab
3. Find previous successful deployment
4. Click "Publish deploy" button

### Git-based Rollback
```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main

# Or reset to specific commit (use carefully)
git reset --hard <commit-hash>
git push --force origin main
```

## Custom Domains

### Domain Configuration
1. **Add domain** in Netlify dashboard
2. **Update DNS** records to point to Netlify
3. **SSL certificate** automatically provisioned

### DNS Records
```
# CNAME record for www subdomain
www.textql.com → netlify-site-name.netlify.app

# A record for apex domain
textql.com → Netlify IP addresses
```

## Troubleshooting

### Common Build Failures

#### 1. Dependency Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Environment Variable Issues
- Check variable names include `VITE_` prefix
- Verify variables are set in Netlify dashboard
- Check for typos in variable names

#### 3. Memory Issues
```toml
# In netlify.toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

#### 4. Build Timeout
- Default Netlify timeout is 15 minutes
- Optimize build process if hitting limits
- Consider caching strategies

### Deploy Preview Issues
- **Environment variables**: Use same variables as production
- **Base URL**: Ensure paths work with preview URLs
- **External integrations**: May need separate keys for previews

## Security Considerations

### Build Security
- **No secrets in build**: Never include secrets in client bundle
- **Environment validation**: Validate required variables exist
- **Dependency scanning**: Regularly update dependencies

### Content Security Policy
```html
<!-- Add CSP headers via _headers file -->
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

## Performance Guidelines

### Optimization Checklist
- [ ] Images optimized (WebP, proper sizing)
- [ ] JavaScript bundles under 200KB
- [ ] CSS minimized and purged
- [ ] Critical CSS inlined
- [ ] Lazy loading implemented

### Monitoring Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle size**: Track over time
- **Build time**: Optimize for CI/CD
- **Lighthouse score**: Maintain 90+ performance

## Related Documentation
- [Environment Variables](./environment-variables.md)
- [Performance Optimization](./performance.md)
- [Troubleshooting](./troubleshooting.md)