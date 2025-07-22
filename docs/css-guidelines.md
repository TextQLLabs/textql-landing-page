# CSS Guidelines

This document outlines CSS best practices and patterns for the TextQL Landing Page project.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Best Practices](#best-practices)
- [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)
- [Component Styling](#component-styling)
- [Theme System](#theme-system)
- [Responsive Design](#responsive-design)

## Architecture Overview

The project uses a combination of:
- **Global CSS** (`src/index.css`) for theme variables and base styles
- **Tailwind CSS** for utility-first styling
- **Component-specific styles** using Tailwind classes in TSX files
- **CSS Variables** for theme colors and transitions
- **CSS Modules** for complex animations and component-specific styles
- **Theme Utilities** (`src/utils/theme-utils.ts`) for consistent theme application
- **Design Tokens** (`src/styles/constants.ts`) for centralized values

## Best Practices

### 1. Selector Specificity

**✅ DO:**
```css
/* Use specific class selectors */
.nav-button {
  color: var(--theme-navbar-text);
}

/* Use data attributes for variants */
button[data-variant="primary"] {
  background-color: var(--theme-primary);
}
```

**❌ DON'T:**
```css
/* Avoid broad element selectors */
nav button {
  color: white;
}

/* Avoid attribute selectors with pattern matching */
button[class*="primary"] {
  background-color: blue;
}
```

### 2. !important Usage

**✅ DO:**
```css
/* Use !important only for critical FOUC prevention */
html, body {
  background: var(--theme-bg-primary) !important; /* Prevents flash during load */
}
```

**❌ DON'T:**
```css
/* Avoid using !important for component styles */
.button {
  color: black !important; /* Bad - makes overriding difficult */
}
```

### 3. CSS Variables

**✅ DO:**
```css
/* Define reusable values as CSS variables */
:root {
  --theme-primary: #B8D8D0;
  --theme-transition: all 0.3s ease;
  --navbar-height: 60px;
}

/* Use variables consistently */
.header {
  height: var(--navbar-height);
  transition: var(--theme-transition);
}
```

### 4. Inline Styles

**✅ DO:**
```tsx
/* Use Tailwind classes */
<div className="bg-black text-white p-4">

/* Use CSS variables for dynamic values */
<div style={{ ['--dynamic-color' as string]: color }} className="text-[var(--dynamic-color)]">
```

**❌ DON'T:**
```tsx
/* Avoid hardcoded inline styles */
<div style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '16px' }}>

/* Avoid complex filter properties */
<img style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}>
```

## Common Pitfalls to Avoid

### 1. Overly Broad Selectors
```css
/* ❌ Bad - affects ALL divs in sections */
.ontology-section div {
  background: transparent;
}

/* ✅ Good - targets specific elements */
.ontology-section .content-wrapper {
  background: transparent;
}
```

### 2. Unreliable :not() Selectors
```css
/* ❌ Bad - assumes specific class naming */
nav button:not([class*="variant"]) {
  color: white;
}

/* ✅ Good - explicit targeting */
nav .nav-button {
  color: white;
}
```

### 3. High Specificity Wars
```css
/* ❌ Bad - creates specificity battles */
body.global-light-mode .ontology-section h1,
body.global-light-mode .ontology-section h2,
body.global-light-mode .ontology-section h3 {
  color: white !important;
}

/* ✅ Good - use CSS cascade properly */
.dark-section {
  color: var(--theme-text-dark);
}
.dark-section h1,
.dark-section h2,
.dark-section h3 {
  color: inherit;
}
```

## Component Styling

### Button Component Pattern
The Button component uses data attributes for reliable variant targeting:

```tsx
// Button.tsx
<button data-variant={variant} className={buttonVariants({ variant, size })}>
  {children}
</button>
```

```css
/* index.css */
button[data-variant="primary"] {
  /* Primary button styles */
}
```

### Dark Section Pattern
Use a reusable class for dark sections:

```css
.dark-section {
  background: var(--theme-bg-dark);
  color: var(--theme-text-dark);
}

/* Let children inherit */
.dark-section h1,
.dark-section p {
  color: inherit;
}
```

## Theme System

### CSS Variables Structure
```css
:root {
  /* Light theme (default) */
  --theme-bg-primary: #FFFFFF;
  --theme-text-primary: #2A3B35;
  --theme-navbar-text: #2A3B35;
  
  /* Dark theme sections */
  --theme-bg-dark: #000000;
  --theme-text-dark: #FFFFFF;
  
  /* Transitions */
  --theme-transition: all 0.3s ease;
}
```

### Theme Switching
```css
/* Use body class for global theme */
body.global-light-mode {
  --theme-bg-primary: #FFFFFF;
}

body:not(.global-light-mode) {
  --theme-bg-primary: #0A0F0C;
}
```

## Responsive Design

### Mobile-First Approach
```css
/* Mobile styles (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### Avoid Fixed Dimensions
```css
/* Good: Flexible dimensions */
.card {
  max-width: 400px;
  width: 100%;
}

/* Bad: Fixed dimensions */
.card {
  width: 400px;
}
```

## Technical Debt Prevention

### 1. Avoid Circular References
```typescript
// ❌ Bad: Self-referencing during initialization
export const TRANSITIONS = {
  properties: { colors: 'background-color, color' },
  presets: {
    colors: `${TRANSITIONS.properties.colors} 300ms ease` // Error!
  }
};

// ✅ Good: Extract shared values
const transitionProperties = { colors: 'background-color, color' };
export const TRANSITIONS = {
  properties: transitionProperties,
  presets: {
    colors: `${transitionProperties.colors} 300ms ease`
  }
};
```

### 2. Isolate Debug Styles
- Keep all debug-related CSS in `src/styles/debug.module.css`
- Use CSS modules for debug components
- This prevents debug styles from polluting production CSS

### 3. Use Theme Utilities
```typescript
// Import theme utilities
import { getThemeClasses } from '@/utils/theme-utils';

// Use in components
const { bgPrimary, textPrimary } = getThemeClasses(isLightMode);
```

### 4. Minimize !important Usage
- Target: < 10 !important declarations in production code
- Acceptable uses:
  - FOUC prevention in theme switching
  - Third-party library overrides
  - Debug tool isolation
- Document why each !important is necessary

### 5. Replace Inline Styles
```tsx
// ❌ Bad: Inline styles
<div style={{ backgroundColor: '#729E8C', padding: '20px' }}>

// ✅ Good: Use Tailwind or theme classes
<div className="bg-theme-accent p-5">

// ✅ Good: Use CSS modules for complex styles
<div className={styles.customCard}>
```

## CSS Debt Monitoring

Run these checks regularly:
```bash
# Check !important usage
grep -r "!important" src/ --include="*.css" --include="*.tsx" | wc -l

# Find inline styles
grep -r "style={{" src/ --include="*.tsx" | wc -l

# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.tsx" --include="*.css" | wc -l
```

Target metrics:
- !important: < 10
- Inline styles: < 15
- Hardcoded colors: < 50
/* ❌ Bad - assumes fixed navbar height */
.hero {
  height: calc(100vh - 60px);
}

/* ✅ Good - use CSS variable */
.hero {
  height: calc(100vh - var(--navbar-height));
}
```

## Migration Guide

If you encounter legacy CSS patterns, here's how to refactor them:

### 1. Replace [class*=] selectors
```diff
- button[class*="primary"] { }
+ button[data-variant="primary"] { }
```

### 2. Remove unnecessary !important
```diff
- .dark-section h1 {
-   color: white !important;
- }
+ .dark-section h1 {
+   color: var(--theme-text-dark);
+ }
```

### 3. Replace inline styles
```diff
- <div style={{ backgroundColor: '#000000' }}>
+ <div className="bg-black">
```

## Additional Anti-Patterns to Avoid

### Z-Index Management
```css
/* ❌ Bad - Magic numbers */
.modal { z-index: 9999; }
.dropdown { z-index: 100; }
.tooltip { z-index: 1000; }

/* ✅ Good - Consistent scale */
:root {
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 30;
  --z-tooltip: 40;
}
```

### Responsive Design
```tsx
// ❌ Bad - Direct window measurement
const isMobile = window.innerWidth < 768;

// ✅ Good - Use React hooks
import { useMediaQuery } from '@/hooks/useMediaQuery';
const isMobile = useMediaQuery('(max-width: 768px)');
```

### Complex Conditional Classes
```tsx
// ❌ Bad - Hard to read
<div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${isActive ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>

// ✅ Good - Use a utility
import clsx from 'clsx';
<div className={clsx(
  theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
  isActive ? 'border-2 border-blue-500' : 'border border-gray-200'
)}>
```

### Transform Animations
```tsx
// ❌ Bad - Inline transform
<div style={{ transform: 'translateY(-100%)' }}>

// ✅ Good - CSS class
<div className="-translate-y-full">
```

### Fixed Background Components
```tsx
// ❌ Bad - Theme-dependent styling when background is fixed
const inputStyles = `
  bg-white
  ${theme === 'light' ? 'text-light-50' : 'text-dark-50'}
  ${theme === 'light' ? 'placeholder:text-light-50/40' : 'placeholder:text-dark-50/40'}
`;

// ✅ Good - Consistent styling for fixed background
const inputStyles = `
  bg-white
  text-gray-900
  placeholder:text-gray-500
  border-gray-300
  focus:ring-primary-500/30
`;
```

**Principle**: When a component always has a fixed background color (e.g., `bg-white`), all text and styling should be optimized for that background regardless of the parent theme. Don't use theme conditionals for components with fixed backgrounds.

**Examples of fixed background components**:
- Form inputs with `bg-white`
- Modal overlays with `bg-black/80`
- Cards with `bg-gray-100`
- Tooltips with `bg-black`

## Tools and Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **CSS Variables Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **Specificity Calculator**: https://specificity.keegan.st/
- **clsx utility**: https://github.com/lukeed/clsx

## Related Documentation

- [Component Development Guide](./component-development.md)
- [Theme System Guide](./architecture.md#styling-approach)
- [Troubleshooting CSS Issues](./troubleshooting.md#styling-issues)