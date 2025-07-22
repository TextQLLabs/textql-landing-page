# Theme Fixes Implementation Guide

## Quick Fixes for Critical Issues

### 1. Fix AboutHero.tsx
```typescript
// Current (BROKEN):
export function AboutHero() {
  return (
    <section className="relative overflow-hidden min-h-[400px]" style={{ backgroundColor: '#000000' }}>
      <h1 className="text-2xl md:text-2xl lg:text-3xl font-extralight text-[#B8D8D0] mb-6">

// Fixed:
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeText } from '../../../utils/theme';

export function AboutHero() {
  const theme = useComponentTheme();
  return (
    <section className={`relative overflow-hidden min-h-[400px] ${themeBackgroundSecondary(theme)}`}>
      <h1 className={`text-2xl md:text-2xl lg:text-3xl font-extralight mb-6 ${
        theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'
      }`}>
```

### 2. Fix About Page Essay Text
```typescript
// In About.tsx, line 26:
// Current:
<p key={index} className="text-base lg:text-xl justify-center font-light text-[#B8D8D0] leading-relaxed">

// Fixed:
<p key={index} className={`text-base lg:text-xl justify-center font-light leading-relaxed ${
  theme === 'light' ? 'text-[#4A665C]' : 'text-[#B8D8D0]'
}`}>
```

### 3. Fix Careers Page Gradient
```typescript
// In Careers.tsx, line 79:
// Current:
<div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${theme === 'light' ? 'from-[#F7F7F7]' : 'from-black'} to-transparent z-20`} />

// This is actually correct! The issue might be the parent container needs the right background.
```

### 4. Fix AgentOntologySection.tsx
```typescript
// Current:
export function AgentOntologySection() {
  return (
    <section className="relative min-h-[500px] bg-black overflow-hidden">

// Fixed:
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../../../utils/theme';

export function AgentOntologySection() {
  const theme = useComponentTheme();
  return (
    <section className={`relative min-h-[500px] ${themeBackgroundSecondary(theme)} overflow-hidden`}>
      ...
      <h2 className={`text-5xl font-extralight mb-6 tracking-tight text-center ${
        theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'
      }`}>
        Powered by The Ontology
      </h2>
      <p className={`text-xl max-w-2xl mx-auto text-center mb-8 ${
        theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'
      }`}>
        AI's Interface for Enterprise Data
      </p>
```

### 5. Create Gradient Theme Utilities
Add to `/src/utils/theme.ts`:

```typescript
/**
 * Get gradient 'from' color for the current theme
 * Light: from-[#F7F7F7], Dark: from-black
 */
export function themeGradientFrom(theme: ThemeMode): string {
  return theme === 'light' ? 'from-[#F7F7F7]' : 'from-black';
}

/**
 * Get gradient 'to' color for the current theme
 * Light: to-white, Dark: to-transparent
 */
export function themeGradientTo(theme: ThemeMode): string {
  return theme === 'light' ? 'to-white' : 'to-transparent';
}

/**
 * Get overlay gradient for cards/images
 * Light: from-black/20, Dark: from-black/40
 */
export function themeGradientOverlay(theme: ThemeMode): string {
  return theme === 'light' ? 'from-black/20' : 'from-black/40';
}
```

## Pattern to Follow

### For Text Colors:
```typescript
// Instead of hardcoded:
className="text-[#B8D8D0]"

// Use:
className={theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}

// Or for secondary text:
className={theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}
```

### For Backgrounds:
```typescript
// Instead of:
className="bg-black"
style={{ backgroundColor: '#000000' }}

// Use:
className={themeBackgroundSecondary(theme)}
// or
className={themeBackground(theme)}
```

### For Gradients:
```typescript
// Instead of:
className="bg-gradient-to-t from-black to-transparent"

// Use:
className={`bg-gradient-to-t ${themeGradientFrom(theme)} to-transparent`}
```

## Testing Checklist

After implementing fixes, test each page:

1. [ ] Toggle theme on About page - all text should be readable
2. [ ] Toggle theme on Careers page - gradients should match background
3. [ ] Check "Powered by" section on Agents page - text should be fully visible
4. [ ] Verify no jarring color transitions when switching themes
5. [ ] Check that all interactive elements (buttons, links) are visible in both themes

## Common Pitfalls to Avoid

1. **Don't mix theme utilities with hardcoded colors**
   ```typescript
   // BAD:
   className={`${themeBackground(theme)} text-[#B8D8D0]`}
   
   // GOOD:
   className={`${themeBackground(theme)} ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}
   ```

2. **Always import theme hook**
   ```typescript
   import { useComponentTheme } from '../hooks/useComponentTheme';
   const theme = useComponentTheme();
   ```

3. **Test both themes during development**
   - Use the DevTools panel to toggle themes
   - Check visual consistency
   - Ensure readability