# TextQL Landing Page - Claude AI Context

## Project Overview

This is the **TextQL Landing Page** project - the official marketing website for TextQL built with React, TypeScript, and Vite.

### Key Information
- **Repository**: textql-landing-page
- **Purpose**: Marketing website with product info, blog, integrations, and company information
- **Deployment**: Netlify (auto-deploy from main branch)
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS

## Quick Reference

### Documentation
📁 **Complete documentation is available in the [`docs/`](./docs/) folder:**

- **[Getting Started](./docs/development-setup.md)** - Development environment setup
- **[Project Architecture](./docs/architecture.md)** - Codebase structure and tech stack
- **[Contributing Guidelines](./docs/contributing.md)** - How to contribute to the project
- **[Component Development](./docs/component-development.md)** - UI component guidelines
- **[Environment Variables](./docs/environment-variables.md)** - Configuration management
- **[Deployment Guide](./docs/deployment.md)** - Netlify deployment process
- **[Testing Guide](./docs/testing.md)** - Quality assurance and testing
- **[Blog System](./docs/blog-system.md)** - Content management for blog posts
- **[Asset Management](./docs/asset-management.md)** - Images, videos, and static assets
- **[Performance Guide](./docs/performance.md)** - Optimization strategies
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

### Essential Commands
```bash
# Development
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Quality Checks (always run before committing)
npm run lint         # Check code style
npx tsc --noEmit     # TypeScript type checking
npm run build        # Ensure production build works
```

### Project Structure
```
textql-landing-page/
├── docs/                    # 📖 Complete documentation
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── page-sections/  # Page-specific sections
│   ├── data/               # Static content (blog, solutions)
│   ├── pages/              # Route components
│   └── styles/             # Global styles
├── public/                 # Static assets (images, videos)
└── [config files]         # Vite, TypeScript, Tailwind
```

## Development Workflow

### Environment Setup
1. **Prerequisites**: Node.js 18+, npm
2. **Install**: `npm install`
3. **Develop**: `npm run dev`
4. **Test**: Visit `http://localhost:5173`

### Component Development
- **Reusable components**: `src/components/ui/` (used in 2+ places)
- **Page-specific components**: `src/components/page-sections/` (unique to one page)
- **Styling**: Tailwind CSS with mobile-first responsive design
- **TypeScript**: Strict typing with proper interfaces

See [Component Development Guide](./docs/component-development.md) for detailed guidelines.

### Content Management

#### Blog Posts
- **Structure**: Metadata file (`post-id.ts`) + content file (`post-id/content.md`)
- **Images**: Organized in `public/images/blog/post-id/`
- **Process**: Create metadata → Write content → Add images → Update index

See [Blog System Guide](./docs/blog-system.md) for complete workflow.

#### Assets
- **Images**: WebP preferred, PNG fallback, organized by feature
- **Optimization**: Compress images, use appropriate sizes
- **Loading**: Lazy loading for non-critical content

See [Asset Management Guide](./docs/asset-management.md) for optimization strategies.

## Deployment & Operations

### Netlify Deployment
- **Auto-deploy**: Push to `main` branch triggers deployment
- **Preview**: Pull requests get unique preview URLs
- **Environment**: Variables managed via Netlify dashboard
- **Build**: `npm run build` → static files in `dist/`

### Environment Variables
```bash
# Example .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
VITE_ENABLE_DEBUG=true
```

All client variables must start with `VITE_` prefix.

See [Environment Variables Guide](./docs/environment-variables.md) for complete setup.

### Performance Targets
- **Lighthouse**: 90+ performance score
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle size**: < 250KB JavaScript, < 50KB CSS

See [Performance Guide](./docs/performance.md) for optimization strategies.

## Quality Assurance

### Pre-Commit Checklist
```bash
# Always run before committing:
npm run lint         # ✅ Code style
npx tsc --noEmit     # ✅ Type checking  
npm run build        # ✅ Production build
# Test responsive design manually
```

### Testing Strategy
- **Manual testing**: Responsive design, cross-browser, accessibility
- **Performance**: Lighthouse audits, Core Web Vitals monitoring
- **Quality checks**: ESLint, TypeScript, build verification

See [Testing Guide](./docs/testing.md) for complete testing procedures.

## Getting Help

### Documentation
- **Primary**: Check [`docs/`](./docs/) folder first
- **Specific issues**: See [Troubleshooting Guide](./docs/troubleshooting.md)
- **Architecture questions**: See [Project Architecture](./docs/architecture.md)

### Common Issues
- **Development server**: Check [Troubleshooting Guide](./docs/troubleshooting.md#development-server-issues)
- **Build failures**: See [Troubleshooting Guide](./docs/troubleshooting.md#build-issues)
- **Styling problems**: See [Troubleshooting Guide](./docs/troubleshooting.md#styling-issues)

---

## Context Notes for Claude

### Component Architecture
This project follows the **reusable vs page-specific component** pattern established in the main CLAUDE.md context:
- Create reusable components when used in 2+ places
- Keep page-specific logic in page-section components
- Use Tailwind CSS with mobile-first responsive design
- Follow TypeScript strict typing patterns

### Debug Tools & DevTools Integration
**IMPORTANT**: The project has a unified DevTools panel in the bottom-right corner (`/src/components/DevTools.tsx`) that consolidates all development tools. 

**Current DevTools Features:**
- **Debug Borders Toggle**: Shows/hides debug borders around components
- **Theme Toggle**: Switches between light/dark mode (when available)
- **Debug Conflicts Detection**: Integrated panel that shows overlapping debug borders
  - Shows conflict count badge
  - "Scan" button to trigger conflict detection
  - Lists conflicts with severity levels (high/medium/low)
  - Color-coded by severity (red/yellow/blue)

**For Future Sessions - Adding New Debug Tools:**
When adding new debug/development features, **ALWAYS integrate them into the existing DevTools panel** rather than creating separate floating panels. This prevents UI conflicts and provides a unified developer experience.

**How to add new tools:**
1. Add tool definition to `coreTools` or `futureTools` array in `DevTools.tsx`
2. Create the tool's functionality as a section within the expanded DevTools panel
3. Use the existing dark theme styling (`bg-gray-900`, `text-white`, etc.)
4. Follow the pattern of the Debug Conflicts section for complex tools

**Debug Conflicts System:**
- **Context**: `/src/contexts/DebugRegistryContext.tsx` - Tracks all debug elements and detects overlaps
- **Detection**: Manual trigger via "Scan" button (to avoid infinite loops)
- **Integration**: Built into DevTools panel, only shows when debug mode is active
- **Conflicts**: Detects overlap percentage, z-index conflicts, and fixed positioning issues

### Development Best Practices
- **Documentation-first**: All major features documented in `docs/`
- **Quality gates**: Lint, type check, and build before committing  
- **Performance-focused**: Monitor Core Web Vitals and bundle size
- **Accessibility**: WCAG compliance and semantic HTML
- **SEO-optimized**: Meta tags, structured data, performance

### CSS Best Practices & Conventions

**IMPORTANT: When fixing CSS/styling issues, ALWAYS follow these conventions:**

1. **Read First**: Check `/docs/css-guidelines.md` for comprehensive CSS best practices
2. **Use Theme System**: Import from `theme-utils.ts` and use `constants.ts` for all values
3. **Follow the Plan**: Reference `/CSS_DEBT_REDUCTION_PLAN.md` for approach and methodology

#### Quick Reference - DO's and DON'Ts:
- **DO**: Use Tailwind classes or CSS modules for styling
- **DO**: Use theme utilities (`getThemeClasses()`) for theme-aware styling
- **DO**: Use design tokens from `src/styles/constants.ts`
- **DON'T**: Add inline styles (except for truly dynamic values)
- **DON'T**: Use `!important` (only 7 allowed in entire codebase)
- **DON'T**: Override `.bg-black` or other Tailwind classes with global CSS
- **DON'T**: Create circular references in constants

#### Key Files for CSS Conventions:
- **📖 `/docs/css-guidelines.md`** - Comprehensive CSS best practices and patterns
- **📊 `/CSS_DEBT_REDUCTION_PLAN.md`** - Methodology for fixing CSS issues properly
- **🎨 `/src/utils/theme-utils.ts`** - Theme utilities to use instead of hardcoded values
- **🔧 `/src/styles/constants.ts`** - All design tokens (colors, spacing, animations)
- **🐛 `/src/styles/debug.module.css`** - Where ALL debug styles must go

#### When Fixing CSS Issues:
```bash
# 1. Check current debt metrics first
grep -r "!important" src/ --include="*.css" --include="*.tsx" | wc -l  # Should be ≤ 7
grep -r "style={{" src/ --include="*.tsx" | wc -l                      # Should be < 15

# 2. Use theme utilities instead of hardcoded values
import { getThemeClasses } from '@/utils/theme-utils';
import { COLORS, SPACING } from '@/styles/constants';

# 3. Follow the established patterns in the CSS guidelines
```

#### Common Fixes Done Right:
- **Transparency issues**: Don't use global CSS overrides, rewrite component cleanly
- **Height calculations**: Use Tailwind classes, avoid calc() with hardcoded values
- **Theme colors**: Use theme utilities, never hardcode hex values
- **Debug styles**: Move to debug.module.css, never inline

**Before making ANY CSS changes**, tell Claude to "follow the CSS conventions in `/docs/css-guidelines.md` and the approach in `/CSS_DEBT_REDUCTION_PLAN.md`".

### Project-Specific Patterns
- **Blog system**: TypeScript metadata + markdown content
- **Asset organization**: Feature-based directory structure
- **Responsive design**: Mobile-first with specific breakpoint testing
- **Environment management**: Vite environment variables with `VITE_` prefix


## Legacy Content Documentation

*Note: The following sections contain detailed implementation notes that have been moved to the comprehensive documentation in the [`docs/`](./docs/) folder. For current information, please refer to the specific documentation files linked above.*

### Blog System Details
For complete blog system documentation, see: **[Blog System Guide](./docs/blog-system.md)**

### Development Workflow Details  
For development workflow and testing procedures, see: **[Development Setup](./docs/development-setup.md)** and **[Testing Guide](./docs/testing.md)**

### Animation Implementation Notes
For component-specific implementation details, see: **[Component Development Guide](./docs/component-development.md)**

---

*This legacy content section preserves important implementation details while directing users to the organized documentation structure in the `docs/` folder.*