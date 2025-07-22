# Theme Utilities for TextQL Landing Page

This document describes the theme utilities created for the TextQL landing page theme consolidation project.

## Overview

The theme utilities provide a consistent, type-safe way to handle light/dark theme styling across the application. They work in conjunction with the existing `GlobalThemeProvider` to ensure consistent theming.

## Core Files

### 1. `useComponentTheme.ts`
- **Location**: `/src/hooks/useComponentTheme.ts`
- **Purpose**: Hook that returns the current theme as a string ('light' | 'dark')
- **Usage**: `const theme = useComponentTheme();`

### 2. `theme.ts`
- **Location**: `/src/utils/theme.ts`
- **Purpose**: Core theme utility functions
- **Contains**: Background, text, border, shadow, and composite utilities

### 3. `theme.types.ts`
- **Location**: `/src/utils/theme.types.ts`
- **Purpose**: TypeScript type definitions for theme utilities

### 4. `theme.index.ts`
- **Location**: `/src/utils/theme.index.ts`
- **Purpose**: Barrel export file with presets and convenience functions

### 5. `theme.examples.ts`
- **Location**: `/src/utils/theme.examples.ts`
- **Purpose**: Examples and usage patterns for theme utilities

## Quick Start

### Basic Usage

```tsx
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackground, themeText } from '../utils/theme.index';

function MyComponent() {
  const theme = useComponentTheme();
  
  return (
    <div className={`${themeBackground(theme)} ${themeText(theme)} p-4`}>
      <h1>Hello World</h1>
    </div>
  );
}
```

### Using Composite Utilities

```tsx
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeCard, themeButton } from '../utils/theme.index';

function MyCard() {
  const theme = useComponentTheme();
  
  return (
    <div className={themeCard(theme)}>
      <h2>Card Title</h2>
      <p>Card content</p>
      <button className={themeButton(theme)}>
        Action
      </button>
    </div>
  );
}
```

### Using Presets

```tsx
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themePresets } from '../utils/theme.index';

function MyNavbar() {
  const theme = useComponentTheme();
  
  return (
    <nav className={themePresets.navbar(theme)}>
      Navigation content
    </nav>
  );
}
```

## Available Utilities

### Background Utilities
- `themeBackground(theme)` - Primary background (white/black)
- `themeBackgroundSecondary(theme)` - Secondary background (gray-50/gray-900)
- `themeBackgroundMuted(theme)` - Muted background (gray-100/gray-800)
- `themeBackgroundCard(theme)` - Card background (white/gray-900)
- `themeBackgroundHover(theme)` - Hover background
- `themeBackgroundOverlay(theme)` - Transparent overlay background

### Text Utilities
- `themeText(theme)` - Primary text color
- `themeTextSecondary(theme)` - Secondary text color
- `themeTextMuted(theme)` - Muted text color
- `themeTextHeading(theme)` - Heading text color
- `themeTextHover(theme)` - Hover text color

### Border Utilities
- `themeBorder(theme)` - Primary border color
- `themeBorderMuted(theme)` - Muted border color
- `themeBorderFocus(theme)` - Focus border color

### Shadow Utilities
- `themeShadow(theme)` - Primary shadow
- `themeShadowCard(theme)` - Card shadow
- `themeShadowHover(theme)` - Hover shadow

### Composite Utilities
- `themeCard(theme)` - Complete card styling
- `themeButton(theme)` - Complete button styling
- `themeInput(theme)` - Complete input styling
- `themeSelect(theme)` - Complete select styling
- `themeModal(theme)` - Complete modal styling

### Specialized Utilities
- `themeAccent(theme)` - Accent color (blue-500/blue-400)
- `themeAccentBackground(theme)` - Accent background
- `themeRing(theme)` - Ring color for focus states
- `themeConditional(theme, lightClass, darkClass)` - Conditional classes

### Helper Functions
- `combineThemeUtilities(utilities, theme)` - Combine multiple utilities
- `createThemeClass(theme, baseClasses, themeClasses)` - Create themed classes
- `mergeThemeClasses(themeClasses, customClasses)` - Merge with custom classes

## Presets

The theme utilities include pre-configured combinations for common use cases:

- `themePresets.navbar(theme)` - Complete navbar styling
- `themePresets.section(theme)` - Complete section styling
- `themePresets.interactive(theme)` - Interactive element styling

## Integration with Existing Systems

### DevTools Integration
The theme utilities work seamlessly with the existing DevTools system. The theme toggle in DevTools automatically updates all components using these utilities.

### GlobalThemeProvider Integration
The utilities are built on top of the existing `GlobalThemeProvider` and maintain compatibility with the current theme state management.

## Migration Guide

### Before (Hard-coded)
```tsx
<div className="bg-white text-gray-900 border border-gray-200 shadow-sm">
  Content
</div>
```

### After (Theme-aware)
```tsx
const theme = useComponentTheme();
<div className={themeCard(theme)}>
  Content
</div>
```

### Before (Conditional)
```tsx
<div className={isLightMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}>
  Content
</div>
```

### After (Theme conditional)
```tsx
const theme = useComponentTheme();
<div className={themeConditional(theme, 'bg-white text-gray-900', 'bg-gray-900 text-white')}>
  Content
</div>
```

## Benefits

1. **Consistency**: Ensures consistent theming across all components
2. **Type Safety**: Full TypeScript support with proper type definitions
3. **Easy Migration**: Simple patterns for converting existing components
4. **Maintainability**: Centralized theme logic makes updates easier
5. **Performance**: Efficient class generation without runtime overhead
6. **Extensibility**: Easy to add new utilities and presets

## Next Steps

These utilities form the foundation for the theme consolidation project. The next phases will:

1. Update existing components to use these utilities
2. Implement consistent theme patterns across the application
3. Add more specialized utilities as needed
4. Optimize performance and bundle size

## Testing

The utilities can be tested using the `ThemeUtilityTest` component:

```tsx
import { ThemeUtilityTest } from '../components/ThemeUtilityTest';

// Add to any page for testing
<ThemeUtilityTest />
```

## Support

For questions or issues with the theme utilities, refer to:
- The examples in `theme.examples.ts`
- The test component in `ThemeUtilityTest.tsx`
- The existing GlobalThemeProvider documentation