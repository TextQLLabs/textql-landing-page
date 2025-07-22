# Testing Guide

## Overview

This guide covers testing strategies, quality checks, and verification procedures for the TextQL Landing Page project.

## Quality Assurance Process

### Pre-Commit Checks
Always run these commands before committing changes:

```bash
# 1. Lint code for style and potential issues
npm run lint

# 2. Type check for TypeScript errors
npx tsc --noEmit

# 3. Build test to ensure production build works
npm run build

# 4. Preview build locally
npm run preview
```

### Automated Quality Checks

#### ESLint Configuration
The project uses ESLint with TypeScript rules:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check specific files
npx eslint src/components/ui/Button.tsx
```

#### TypeScript Checking
```bash
# Full type checking
npx tsc --noEmit

# Watch mode for development
npx tsc --noEmit --watch

# Check specific file
npx tsc --noEmit src/components/ui/Button.tsx
```

## Manual Testing Guidelines

### Responsive Design Testing

#### Required Breakpoints
Test these viewport sizes that account for browser chrome:

1. **Mobile**: 375px × 667px (iPhone SE)
2. **Tablet**: 768px × 850px (iPad with browser UI)  
3. **Laptop**: 1280px × 680px (laptop with browser chrome)
4. **Desktop**: 1920px × 900px (desktop with browser UI)

#### Testing Process
```bash
# Using browser DevTools
1. Open DevTools (F12)
2. Enable responsive mode (Ctrl+Shift+M)
3. Test each breakpoint
4. Verify layout doesn't break
5. Check text readability
6. Test all interactive elements
```

### Cross-Browser Testing

#### Required Browsers
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest version (if on macOS)
- **Edge**: Latest version

#### Testing Checklist
- [ ] Page loads correctly
- [ ] All images display
- [ ] Animations work smoothly
- [ ] Forms function properly
- [ ] Navigation works
- [ ] No console errors

### Accessibility Testing

#### Manual Accessibility Checks
```bash
# Keyboard navigation testing
1. Tab through all interactive elements
2. Verify focus indicators are visible
3. Test escape key for modals/dropdowns
4. Ensure logical tab order

# Screen reader testing (if available)
1. Test with VoiceOver (macOS) or NVDA (Windows)
2. Verify alt text for images
3. Check heading structure
4. Test form labels
```

#### Automated Accessibility Testing
```bash
# Using Lighthouse
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run accessibility audit
4. Aim for score of 95+
5. Fix any identified issues
```

### Performance Testing

#### Core Web Vitals
Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Testing Tools
```bash
# Lighthouse performance audit
1. Open Chrome DevTools
2. Go to Lighthouse tab  
3. Select "Performance" category
4. Run audit on both mobile and desktop
5. Aim for score of 90+

# WebPageTest (online tool)
# https://www.webpagetest.org
# Test from multiple locations
```

#### Bundle Size Monitoring
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Check for:
# - Large dependencies (>100KB)
# - Duplicate code
# - Unused imports
# - Opportunities for code splitting
```

## Component Testing

### Testing Approach
While this project doesn't currently have automated tests, here's the recommended approach for component verification:

#### 1. Props Testing
```typescript
// Manual verification checklist for components:
// ✅ Component renders with required props
// ✅ Optional props work correctly  
// ✅ Default values are applied
// ✅ Event handlers are called
// ✅ Error states are handled
```

#### 2. Variant Testing
```typescript
// For components with variants (like Button):
// ✅ All variants render correctly
// ✅ Size variations work
// ✅ Disabled state works
// ✅ Loading state works (if applicable)
```

#### 3. Integration Testing
```typescript
// For page-level components:
// ✅ Component integrates with routing
// ✅ Data loading works correctly
// ✅ Error boundaries function
// ✅ SEO metadata is correct
```

### Visual Regression Testing

#### Screenshot Testing
```bash
# Manual visual testing process:
1. Navigate to page/component
2. Take screenshot at each breakpoint  
3. Compare with previous version
4. Document any intentional changes
5. Flag unexpected visual differences
```

#### Design System Compliance
```bash
# Verify components follow design system:
# ✅ Colors match design tokens
# ✅ Spacing uses consistent scale
# ✅ Typography follows hierarchy
# ✅ Interactive states work correctly
```

## Feature Testing

### Blog System Testing
```bash
# Test blog functionality:
# ✅ Blog index page loads
# ✅ Individual posts load correctly
# ✅ Images display properly
# ✅ Navigation between posts works
# ✅ Categories filter correctly
# ✅ SEO metadata is present
```

### Form Testing
```bash
# Test all forms in the application:
# ✅ Validation works correctly
# ✅ Error messages display
# ✅ Success states work
# ✅ Accessibility is maintained
# ✅ Mobile experience is good
```

### Integration Testing
```bash
# Test external integrations:
# ✅ External links work
# ✅ Social media integration
# ✅ Analytics tracking (if implemented)
# ✅ Third-party scripts load
```

## Testing Environments

### Development Testing
```bash
# Local development server
npm run dev
# Test URL: http://localhost:5173

# Features available:
# - Hot reload for fast testing
# - Source maps for debugging
# - Error overlay for quick fixes
```

### Production Testing
```bash
# Local production build
npm run build
npm run preview
# Test URL: http://localhost:4173

# Verify:
# - Optimized assets load
# - No development-only features
# - Performance is acceptable
```

### Deploy Preview Testing
```bash
# Netlify deploy previews
# Automatic for pull requests
# Test production-like environment
# Verify external integrations work
```

## Error Handling Testing

### Error Boundary Testing
```bash
# Test error scenarios:
# ✅ Component throws error - boundary catches it
# ✅ Network failures handled gracefully  
# ✅ Invalid data doesn't crash app
# ✅ 404 pages display correctly
```

### Loading State Testing
```bash
# Test loading experiences:
# ✅ Loading indicators display
# ✅ Content doesn't jump when loaded
# ✅ Timeouts are handled
# ✅ Retry mechanisms work
```

## SEO Testing

### Meta Tag Verification
```bash
# Check each page for:
# ✅ Title tag (unique, descriptive)
# ✅ Meta description (155 characters max)
# ✅ Open Graph tags
# ✅ Twitter Card tags
# ✅ Canonical URLs
```

### Content Testing
```bash
# Verify SEO best practices:
# ✅ Heading hierarchy (H1, H2, H3...)
# ✅ Alt text for images
# ✅ Descriptive link text
# ✅ Page loads without JavaScript
# ✅ Internal linking structure
```

## Security Testing

### Client-Side Security
```bash
# Manual security checks:
# ✅ No sensitive data in client bundle
# ✅ External links use rel="noopener"
# ✅ Forms have CSRF protection (if applicable)
# ✅ Content Security Policy headers
```

### Dependency Security
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Review high-severity issues manually
```

## Testing Documentation

### Test Results Recording
When testing, document:

```markdown
## Test Session: [Date]
### Environment: [Development/Staging/Production]
### Browser: [Chrome 118 on macOS]

#### Tested Features:
- [ ] Home page loading
- [ ] Blog functionality  
- [ ] Contact forms
- [ ] Responsive design
- [ ] Performance metrics

#### Issues Found:
1. [Description] - [Severity] - [Status]

#### Performance Metrics:
- Lighthouse Score: 92/100
- LCP: 1.8s
- FID: 45ms
- CLS: 0.08
```

### Regression Testing Checklist

```bash
# After major changes, verify:
# ✅ All existing functionality still works
# ✅ No new console errors
# ✅ Performance hasn't degraded
# ✅ SEO hasn't been impacted
# ✅ Accessibility remains intact
```

## Continuous Quality Improvement

### Monitoring
- Set up performance monitoring
- Track Core Web Vitals over time
- Monitor error rates
- Review user feedback

### Regular Audits
- Monthly Lighthouse audits
- Quarterly dependency updates
- Annual accessibility reviews
- Performance benchmark reviews

## Related Documentation
- [Development Setup](./development-setup.md)
- [Component Development](./component-development.md)
- [Troubleshooting](./troubleshooting.md)
- [Performance Guidelines](./performance.md)