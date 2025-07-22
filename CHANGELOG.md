# Changelog

All notable changes to the TextQL Landing Page project will be documented in this file.

## [Unreleased]

### Changed
- **Pricing Model Update** - Updated all pricing plans to use per-1000 ACUs instead of per-100 ACUs
  - Standard: $2.00 per 1000 ACUs (was per 100 ACUs)
  - Enterprise: $3.00 per 1000 ACUs (was per 100 ACUs)  
  - Private Cloud: $4.00 per 1000 ACUs (was per 100 ACUs)
  - Improved button styling in pricing cards to be more compact and natural
  - **Date**: 2025-01-22

- **About Page Restructure** - Simplified and improved About page layout
  - Removed original hero section with "We're building the last software company"
  - Renamed AboutMission to AboutHero, now featuring "The Mission" content
  - Fixed padding consistency between sections
  - Added proper vertical centering for hero content
  - **Date**: 2025-01-22

### Fixed
- **Demo Request Form Input Visibility** - Fixed white text on white background issue
  - **Root Cause**: Theme-dependent text colors were being used on fixed white background
  - **Solution**: Applied consistent dark text (`text-gray-900`) for fixed white background components
  - Added new CSS guideline for "Fixed Background Components" pattern
  - **Date**: 2025-01-22

- **Contact Email Updates** - Updated contact information across the site
  - Changed Footer email from `ethan@textql.com` to `support@textql.com`
  - Updated Pricing FAQ from `support@textql.ai` to `support@textql.com`
  - **Date**: 2025-01-22

- **Netlify Build Issues** - Fixed critical build failures preventing deployment
  - **Root Cause**: Missing `GlobalThemeProvider` and related theme dependencies
  - **Solution**: Added all missing theme system files and dependencies
  - Fixed import resolution issues across multiple components
  - Ensured all components have proper dependencies included in repository
  - **Date**: 2025-01-22

### Added
- **Complete Theme System Architecture** - Major theme system overhaul with comprehensive utilities
  - Added `GlobalThemeProvider.tsx` with localStorage persistence and global state management
  - Added `useComponentTheme` hook for consistent theme detection across components
  - Added comprehensive `theme-utils.ts` with helper functions and theme classes
  - Added `src/styles/constants.ts` with centralized design tokens and variables
  - **Date**: 2025-01-22

- **Enhanced UI Component System** - Major upgrades to core UI components
  - Added enhanced `Section.tsx` component with comprehensive layout options
  - Added `Button.module.css` with corner animation system for interactive buttons
  - Added email preview components (`EmailBotPreview`, `SlackBotPreview`, `TextBotPreview`)
  - Added enhanced form components and improved accessibility
  - **Date**: 2025-01-22

- **Comprehensive Documentation System** - Complete docs folder with 15+ detailed guides
  - **Architecture Guide** (`docs/architecture.md`) - System overview and tech stack
  - **Component Development** (`docs/component-development.md`) - UI development standards
  - **CSS Guidelines** (`docs/css-guidelines.md`) - Styling best practices and patterns
  - **Testing Guide** (`docs/testing.md`) - Quality assurance procedures
  - **Performance Guide** (`docs/performance.md`) - Optimization strategies
  - **Asset Management** (`docs/asset-management.md`) - Image and resource handling
  - **Blog System** (`docs/blog-system.md`) - Content management workflow
  - **Deployment Guide** (`docs/deployment.md`) - Netlify deployment process
  - **Troubleshooting Guide** (`docs/troubleshooting.md`) - Common issues and solutions
  - **Date**: 2025-01-22

- **Developer Tools & Debug System** - Comprehensive development utilities
  - Added `DevTools.tsx` unified development panel in bottom-right corner
  - Added debug border system with conflict detection (`DebugRegistryContext.tsx`)
  - Added multiple debug components for different use cases
  - Added debug CSS isolation in `src/styles/debug.module.css`
  - **Date**: 2025-01-22

- **CSS Technical Debt Reduction System** - Comprehensive 5-phase plan to eliminate CSS technical debt
  - Created `CSS_DEBT_REDUCTION_PLAN.md` with detailed methodology and tracking
  - Added CSS modules for animations, filters, and page patterns
  - Created documentation in `docs/debt-assessment-methodology.md`
  - **Date**: 2025-01-22

### Removed
- **Unused Components and Assets** - Cleaned up deprecated and unused files
  - Removed `AboutMission.tsx` (renamed to `AboutHero.tsx`)
  - Removed `PopularIntegrationsSection.tsx` (consolidated into AllIntegrationsSection)  
  - Removed case study templates (`CaseStudyTemplate.tsx`, `Fortune500Financial.tsx`)
  - Cleaned up unused data logo assets (15+ PNG files in `src/data/data-logos/`)
  - Removed temporary files (`check-dropdown.js`, `test-dropdown.js`, `textContent.json`)
  - Removed Vite timestamp files and build artifacts
  - **Date**: 2025-01-22

### Changed
- **Theme System Enhancement** - Major improvements to theme consistency and maintainability
  - Extended Tailwind configuration with semantic colors and custom utilities
  - Renamed `theme.ts` to `theme-utils.ts` and enhanced functionality
  - Migrated critical components to use centralized theme system
  - **Date**: 2025-01-22

- **Debug System Isolation** - Extracted all debug-related CSS to separate module
  - Created `src/styles/debug.module.css` containing all debug styles
  - Refactored `StaticDebugWithTooltip.tsx` and `SimpleDebugSystem.tsx`
  - Reduced !important declarations from 111 to 7 (93.7% reduction)
  - **Date**: 2025-01-22

### Fixed
- **Navbar "Request a Demo" Button Text Color** - Fixed issue where the primary button text was displaying as white instead of black in dark mode
  - **Root Cause**: CSS rule at line 295 in `index.css` was incorrectly targeting spans inside buttons with a selector that assumed buttons would have "variant" in their class names
  - **Solution**: Removed the problematic CSS rule `nav span:not(button[class*="variant"] span, button[class*="variant"] *)` entirely, allowing button component styles to take precedence
  - **Date**: 2025-01-21

- **CSS Architecture Improvements** - Major refactoring to fix problematic CSS patterns throughout the codebase
  - **Nav Button Selectors**: Changed `nav button:not([class*="variant"])` to `nav .nav-button` for more explicit targeting
  - **Dark Section Selectors**: Refactored to eliminate all `!important` usage in dark sections by:
    - Creating a reusable `.dark-section` class
    - Using more specific semantic selectors instead of targeting all elements
    - Properly leveraging CSS cascade for theme variations
  - **Button Primary Selectors**: Replaced unreliable `button[class*="primary"]` selectors with `button[data-variant="primary"]`
    - Added `data-variant` attribute to Button component for reliable targeting
    - Updated all CSS selectors in CTA, Security, Ontology, and Enterprise sections
  - **Date**: 2025-01-21

### Removed
- Deleted `Fortune500Financial.tsx` and `CaseStudyTemplate.tsx` case study pages
- Removed import and route references from `AppWithGlobalTheme.tsx`

### Additional CSS Improvements
- **Removed remaining !important usage** in button styling system (lines 520, 534-535, 554-555)
  - Replaced with more specific selectors using child combinators and pseudo-classes
  - Maintained visual appearance while improving CSS maintainability
  - **Date**: 2025-01-21

### Known Issues Still To Address

#### Inline Styles in Components
The following components use problematic inline styles that should be refactored:
1. **Hardcoded filter properties** - Customers.tsx, Databricks2025.tsx, Snowflake2025.tsx
2. **Fixed dimensions** - Using calc() with hardcoded navbar heights
3. **Inline backgroundColor** - Multiple hero sections using `style={{ backgroundColor: '#000000' }}`
4. **Dynamic colors** - Chart components using inline styles instead of CSS variables
5. **Transform properties** - SimpleDebugSystem.tsx, IndustryPills.tsx, MobileCarousel.tsx
6. **Animation styles** - WaveRipples.tsx using inline animation properties

#### Z-Index Management
Multiple files use hardcoded z-index values without a consistent scale:
- Integration pages: 0, 10, 20, 30
- Debug components: 100, 1000, 10000
- InsightsFeed components: 50, 800
**Recommendation**: Implement a z-index scale system (e.g., z-10, z-20, z-30... z-modal, z-tooltip)

#### Responsive Design Issues
- Direct `window.innerWidth` usage in animation components
- Complex conditional className logic based on theme
- Hardcoded media query breakpoints
**Recommendation**: Use Tailwind responsive utilities and React hooks

#### CSS Architecture
The codebase is now cleaner but could benefit from:
- CSS custom properties for commonly used values (filters, dimensions)
- Utility classes for repeated patterns
- Better responsive units instead of fixed pixel values
- Consistent vendor prefix handling via autoprefixer
- className utility library (clsx/classnames) for complex conditionals

**Recommendation**: Phase 2 refactoring to address inline styles and create a more robust design system.