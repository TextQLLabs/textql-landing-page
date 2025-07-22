# Troubleshooting Guide

## Common Development Issues

### 1. Development Server Issues

#### Server Won't Start
```bash
# Error: Port already in use
Error: Port 5173 is already in use

# Solution: Kill process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 5174
```

#### Hot Reload Not Working
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart development server
npm run dev
```

#### Module Resolution Errors
```bash
# Clear all caches and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript paths in tsconfig.json
```

### 2. Build Issues

#### Build Fails with Memory Error
```bash
# Error: JavaScript heap out of memory
FATAL ERROR: Reached heap limit Allocation failed

# Solution: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### TypeScript Errors
```bash
# Run TypeScript check
npx tsc --noEmit

# Common fixes:
# 1. Check import paths
# 2. Verify type definitions
# 3. Update @types packages
```

#### Missing Dependencies
```bash
# Install missing peer dependencies
npm install --save-dev @types/react @types/react-dom

# Check for version conflicts
npm ls
```

### 3. Styling Issues

#### Tailwind CSS Not Working
```bash
# Verify Tailwind is installed
npm list tailwindcss

# Check tailwind.config.js content paths
# Make sure CSS import is in main.tsx
```

#### Styles Not Applying
```typescript
// Check class name syntax
// ❌ Wrong
className="bg-blue600"

// ✅ Correct  
className="bg-blue-600"

// Check for class conflicts
// Use browser DevTools to inspect computed styles
```

#### Responsive Design Issues
```typescript
// Test at different breakpoints
// Tailwind breakpoints:
// sm: 640px
// md: 768px  
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Use browser DevTools responsive mode
```

### 4. Component Issues

#### Component Not Rendering
```typescript
// Check for common issues:
// 1. Missing export/import
// 2. Incorrect file paths
// 3. TypeScript errors
// 4. Missing props

// Debug with console.log
console.log('Component rendering:', props);
```

#### Props Not Passing Through
```typescript
// Check prop drilling vs component composition
// Verify prop types match interface

// Use React DevTools to inspect component tree
```

#### State Updates Not Working
```typescript
// Common useState issues:
// 1. Mutating state directly
const [items, setItems] = useState([]);

// ❌ Wrong - mutating state
items.push(newItem);

// ✅ Correct - creating new array
setItems([...items, newItem]);
```

### 5. Environment Variable Issues

#### Variables Not Loading
```bash
# Check variable names start with VITE_
VITE_API_URL=http://localhost:3000

# Restart development server after changes
npm run dev

# Verify .env.local file location (project root)
ls -la .env*
```

#### Variables Undefined in Production
```bash
# Check Netlify environment variables
# Ensure they're set in deployment dashboard
# Verify variable names match exactly
```

### 6. Routing Issues

#### 404 Errors
```typescript
// Check React Router configuration
// Verify route paths match URL structure

// For Netlify: ensure _redirects file exists
/* /index.html 200
```

#### Navigation Not Working
```typescript
// Use React Router hooks correctly
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/path'); // Not window.location
```

### 7. Performance Issues

#### Slow Build Times
```bash
# Clear all caches
rm -rf node_modules/.vite node_modules/.cache
npm run build

# Consider bundle analysis
npm run build
npx vite-bundle-analyzer
```

#### Runtime Performance Issues
```typescript
// Check for unnecessary re-renders
// Use React DevTools Profiler

// Optimize large lists with virtualization
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 8. Deployment Issues

#### Netlify Build Failures
```bash
# Check build logs in Netlify dashboard
# Common issues:
# 1. Missing environment variables
# 2. Node.js version mismatch
# 3. Build command errors

# Set Node.js version in netlify.toml
[build.environment]
  NODE_VERSION = "18"
```

#### Deploy Preview Issues
```bash
# Ensure base URL works with preview URLs
# Check environment variables in preview context
# Verify external integrations work with preview domains
```

### 9. Asset Loading Issues

#### Images Not Loading
```bash
# Check file paths relative to public/
# ✅ Correct
<img src="/images/logo.png" />

# ❌ Wrong  
<img src="./images/logo.png" />
```

#### Font Loading Issues
```css
/* Ensure fonts are in public/ directory */
/* Check font-display: swap for performance */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap;
}
```

## Debugging Tools

### Browser DevTools
```bash
# Chrome DevTools shortcuts:
# F12 - Open DevTools
# Ctrl+Shift+C - Element inspector
# Ctrl+Shift+M - Responsive mode
# Ctrl+Shift+I - Console
```

### React DevTools
```bash
# Install React DevTools browser extension
# Features:
# - Component tree inspection
# - Props and state debugging
# - Performance profiling
# - Hook debugging
```

### Vite DevTools
```typescript
// Access via browser console
// Check network tab for asset loading
// Use source maps for debugging

// Enable source maps in development
// Already configured in vite.config.ts
```

## Performance Debugging

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Look for:
# - Large dependencies
# - Duplicate code
# - Unused imports
```

### Core Web Vitals
```bash
# Use Lighthouse in Chrome DevTools
# Key metrics:
# - Largest Contentful Paint (LCP) < 2.5s
# - First Input Delay (FID) < 100ms  
# - Cumulative Layout Shift (CLS) < 0.1
```

### Memory Leaks
```javascript
// Use Chrome DevTools Memory tab
// Look for:
// - Increasing heap size over time
// - Detached DOM nodes
# - Event listener leaks

// Common fixes:
// - Remove event listeners in useEffect cleanup
// - Cancel async operations in cleanup
```

## Getting Help

### Internal Resources
1. **Documentation**: Check other docs files first
2. **Code Comments**: Look for inline documentation
3. **Git History**: Check commit messages for context
4. **Component Examples**: Look at similar components

### External Resources
1. **React Documentation**: https://react.dev
2. **Vite Documentation**: https://vitejs.dev
3. **Tailwind CSS**: https://tailwindcss.com
4. **TypeScript**: https://typescriptlang.org

### Creating Bug Reports

#### Include This Information:
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to page X
2. Click on element Y
3. Observe behavior Z

## Expected Behavior
What should happen

## Actual Behavior  
What actually happens

## Environment
- Browser: Chrome 118
- OS: macOS 14
- Node.js: 18.17.0
- npm: 9.6.7

## Error Messages
```
[Paste any error messages or screenshots]
```

## Screenshots
[Include relevant screenshots]
```

### Development Environment Check

```bash
# Verify development environment
node --version    # Should be 18+
npm --version     # Should be 9+
git --version     # Should be 2.30+

# Check project dependencies
npm outdated      # Check for outdated packages
npm audit         # Check for security vulnerabilities
```

## Emergency Procedures

### Complete Reset
```bash
# Nuclear option - complete clean start
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

### Rollback Changes
```bash
# Undo last commit (if not pushed)
git reset --hard HEAD~1

# Revert specific commit (if pushed)
git revert <commit-hash>
```

### Backup Current State
```bash
# Create backup branch before major changes
git checkout -b backup/current-state
git push origin backup/current-state
```

## Related Documentation
- [Development Setup](./development-setup.md)
- [Deployment Guide](./deployment.md)
- [Component Development](./component-development.md)