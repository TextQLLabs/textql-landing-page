# Theme Utilities Guide

## Overview

The theme utilities system provides a comprehensive set of functions and constants for managing theme-aware styling across the application. This guide explains how to use these utilities effectively to reduce CSS technical debt.

## Quick Start

### Basic Usage

```tsx
import { getThemeClasses, useComponentTheme } from '@/utils/theme-utils';

function MyComponent() {
  const { theme, isLightMode } = useComponentTheme();
  const themeClasses = getThemeClasses(isLightMode);
  
  return (
    <div className={`${themeClasses.bgPrimary} ${themeClasses.textPrimary} p-6 rounded-lg`}>
      <h2 className={themeClasses.textAccent}>Hello World</h2>
    </div>
  );
}
```

### Using Pre-built Component Styles

```tsx
import { getComponentStyles } from '@/utils/theme-utils';
import { useComponentTheme } from '@/hooks/useComponentTheme';

function Card({ children }) {
  const { theme } = useComponentTheme();
  
  return (
    <div className={getComponentStyles('card', theme)}>
      {children}
    </div>
  );
}
```

## Available Utilities

### 1. Theme Class Mappings

The `getThemeClasses()` function returns an object with all theme-specific class names:

```typescript
const themeClasses = getThemeClasses(isLightMode);

// Available classes:
themeClasses.bgPrimary        // Primary background
themeClasses.bgSecondary      // Secondary background
themeClasses.bgMuted          // Muted background
themeClasses.bgAccent         // Accent background
themeClasses.textPrimary      // Primary text color
themeClasses.textSecondary    // Secondary text color
themeClasses.textMuted        // Muted text color
themeClasses.borderDefault    // Default border
themeClasses.shadowDefault    // Default shadow
// ... and many more
```

### 2. Filter Classes

For images and logos that need theme-aware filters:

```tsx
import { getFilterClasses } from '@/utils/theme-utils';

function Logo() {
  const { isLightMode } = useComponentTheme();
  const filterClasses = getFilterClasses(isLightMode);
  
  return (
    <img 
      src="/logo.png" 
      className={filterClasses.logoFilter}
      alt="Logo"
    />
  );
}
```

### 3. Responsive Typography

Use responsive typography utilities for consistent text scaling:

```tsx
import { getResponsiveTypography } from '@/utils/theme-utils';

function Hero() {
  return (
    <h1 className={getResponsiveTypography('display')}>
      Welcome to Our Site
    </h1>
  );
}
```

### 4. Dynamic Spacing

Apply responsive spacing that scales with viewport:

```tsx
import { getDynamicSpacing } from '@/utils/theme-utils';

function Section({ children }) {
  return (
    <section className={getDynamicSpacing('lg')}>
      {children}
    </section>
  );
}
```

### 5. CSS Variables

For inline styles or complex dynamic values:

```tsx
import { getCSSVariables, getThemeStyles } from '@/utils/theme-utils';

function DynamicComponent({ customHeight }) {
  const { theme } = useComponentTheme();
  
  const style = getThemeStyles(theme, {
    height: customHeight,
    transition: 'all 0.3s ease',
  });
  
  return <div style={style}>Dynamic content</div>;
}
```

## Style Constants

Access design tokens and constants from `src/styles/constants.ts`:

```typescript
import { SPACING, COLORS, ANIMATIONS, Z_INDEX } from '@/styles/constants';

// Use in calculations
const navbarOffset = SPACING.navbarHeight + SPACING.sectionPaddingY;

// Use in inline styles
style={{ zIndex: Z_INDEX.modal }}

// Use animation durations
transition: `opacity ${ANIMATIONS.durations.normal}ms`
```

## CSS Modules

For complex animations and filters, use the CSS modules:

```tsx
import animationStyles from '@/styles/animations.module.css';
import filterStyles from '@/styles/filters.module.css';

function AnimatedCard() {
  return (
    <div className={`${animationStyles.fadeIn} ${filterStyles.glassMorphism}`}>
      Animated content
    </div>
  );
}
```

## Migration Examples

### Before: Inline Styles
```tsx
<div style={{ backgroundColor: '#F7F7F7', color: '#2A3B35', padding: '2rem' }}>
```

### After: Theme Utilities
```tsx
const themeClasses = getThemeClasses(isLightMode);
<div className={`${themeClasses.bgPrimary} ${themeClasses.textPrimary} p-8`}>
```

### Before: Hardcoded Filter
```tsx
<img style={{ filter: 'brightness(0) saturate(100%) invert(91%)...' }} />
```

### After: Filter Classes
```tsx
const filterClasses = getFilterClasses(isLightMode);
<img className={filterClasses.logoFilter} />
```

### Before: Fixed Spacing
```tsx
<div style={{ marginTop: '60px', height: 'calc(100vh - 60px)' }}>
```

### After: Tailwind Utilities
```tsx
<div className="mt-15 h-[calc(100vh-60px)]">
```

## Best Practices

1. **Prefer Theme Utilities**: Always use theme utilities over hardcoded colors
2. **Use Semantic Names**: Choose semantic class names (bgPrimary) over color names
3. **Combine with Tailwind**: Mix theme utilities with Tailwind classes
4. **Avoid Inline Styles**: Use CSS modules for complex styles
5. **Responsive First**: Use responsive utilities for scalable designs

## Common Patterns

### Theme-Aware Card
```tsx
function Card({ children }) {
  const { theme } = useComponentTheme();
  return (
    <div className={getComponentStyles('card', theme)}>
      {children}
    </div>
  );
}
```

### Theme-Aware Button
```tsx
function Button({ children, onClick }) {
  const { theme } = useComponentTheme();
  return (
    <button 
      className={getComponentStyles('button', theme)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Glass Morphism Effect
```tsx
function GlassPanel({ children }) {
  const { isLightMode } = useComponentTheme();
  const filterClasses = getFilterClasses(isLightMode);
  
  return (
    <div className={`${filterClasses.glassMorphism} p-6 rounded-xl`}>
      {children}
    </div>
  );
}
```

## Debugging

To debug theme issues:

1. Check if theme is properly provided via `GlobalThemeProvider`
2. Verify theme mode with `console.log(theme)`
3. Use browser DevTools to inspect applied classes
4. Check for conflicting inline styles

## Future Enhancements

- Additional component presets
- More animation utilities
- Enhanced gradient support
- Custom hook for theme-aware styles