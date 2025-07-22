# Section Component Migration Guide

This guide helps you migrate existing section implementations to use the standardized `Section` component for consistent width, padding, and styling across the TextQL landing page.

## Overview

The enhanced `Section` component provides:
- 7 width variants (full, content, wide, wider, narrow, narrower, narrowest)
- Flexible padding system with responsive breakpoints
- Built-in theme support for backgrounds
- Layout helpers for common patterns
- Animation and visual effect support

## Migration Examples

### 1. Hero Sections

#### Before (HomeHero)
```tsx
<section className={cn(
  'relative min-h-screen overflow-hidden',
  themeBackground(theme)
)}>
  <div className="absolute inset-0 navbar-offset" />
  <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-32 pb-20">
    {/* content */}
  </div>
</section>
```

#### After
```tsx
<Section
  variant="wide"
  height="hero"
  padding="hero"
  hasNavbarOffset
  background="primary"
  overflow="hidden"
  animate
>
  {/* content */}
</Section>
```

### 2. Content Sections

#### Before (AboutSection)
```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-site px-4 md:px-6">
    {/* content */}
  </div>
</section>
```

#### After
```tsx
<Section variant="content" padding="md">
  {/* content */}
</Section>
```

### 3. Narrow Content (FAQ, Legal)

#### Before
```tsx
<section className="py-24 bg-[#F0F5F3]">
  <div className="mx-auto max-w-3xl px-4">
    {/* content */}
  </div>
</section>
```

#### After
```tsx
<Section 
  variant="narrower" 
  padding="lg"
  background="accent"
>
  {/* content */}
</Section>
```

### 4. Custom Backgrounds

#### Before (PricingHeader)
```tsx
<section className="relative overflow-hidden bg-black">
  <WaveBackground />
  <div className="relative mx-auto max-w-4xl px-6 pb-20 mt-12">
    {/* content */}
  </div>
</section>
```

#### After
```tsx
<Section
  variant="narrow"
  padding="none"
  paddingBottom="lg"
  paddingTop="navbar"
  background="black"
  overflow="hidden"
  animate
>
  <WaveBackground />
  <div className="relative">
    {/* content */}
  </div>
</Section>
```

### 5. Feature Sections with Alternating Backgrounds

#### Before
```tsx
<section className={cn(
  'py-16 md:py-24',
  index % 2 === 0 ? 'bg-white' : 'bg-[#F5F9F8]'
)}>
  <div className="mx-auto max-w-site px-6">
    {/* content */}
  </div>
</section>
```

#### After
```tsx
<Section
  variant="content"
  padding="md"
  background={index % 2 === 0 ? 'secondary' : 'primary'}
>
  {/* content */}
</Section>
```

## Width Variant Mapping

| Current Pattern | Section Variant | Actual Width |
|----------------|-----------------|--------------|
| `max-w-site` | `content` | 80rem (1280px) |
| `max-w-7xl` | `wide` | 80rem (1280px) |
| `max-w-6xl` | `wider` | 72rem (1152px) |
| `max-w-4xl` | `narrow` | 56rem (896px) |
| `max-w-3xl` | `narrower` | 48rem (768px) |
| `max-w-2xl` | `narrowest` | 42rem (672px) |
| No max-width | `full` | 100% |

## Padding Patterns

### Standard Patterns
- **Small sections**: `padding="sm"` → `py-12 md:py-16 px-4 md:px-6`
- **Regular sections**: `padding="md"` → `py-16 md:py-24 px-4 md:px-6`
- **Large sections**: `padding="lg"` → `py-24 md:py-32 px-4 md:px-6`
- **Hero sections**: `padding="hero"` → `py-20 md:py-32 lg:py-40 px-4 md:px-6`

### Custom Padding
```tsx
// Asymmetric padding
<Section
  paddingTop="navbar"    // pt-20 md:pt-24
  paddingBottom="xl"      // pb-32 md:pb-40
  paddingX="md"          // px-6 md:px-8
>

// No vertical padding, only horizontal
<Section
  padding="none"
  paddingX="sm"          // px-4 md:px-6
>
```

## Common Patterns

### Hero with Navbar Offset
```tsx
<Section {...sectionPresets.hero} background="primary">
  {/* Automatically includes navbar offset, centering, and proper padding */}
</Section>
```

### Content Section
```tsx
<Section {...sectionPresets.content}>
  {/* Standard content width and padding */}
</Section>
```

### Feature Section
```tsx
<Section {...sectionPresets.feature}>
  {/* Content width with secondary background */}
</Section>
```

### CTA Section
```tsx
<Section {...sectionPresets.cta}>
  {/* Narrow width with extra padding and primary background */}
</Section>
```

## Special Cases

### Sections with Animations
```tsx
<Section
  variant="full"
  height="min-screen"
  overflow="hidden"
  animate
  className="relative"
>
  <AnimatedBackground className="absolute inset-0" />
  <div className="relative z-10">
    {/* content */}
  </div>
</Section>
```

### Grid Layouts
```tsx
<Section
  variant="content"
  padding="lg"
  layout="grid"
  className="grid-cols-1 md:grid-cols-2 gap-8"
>
  {/* grid items */}
</Section>
```

### Custom Semantic HTML
```tsx
<Section
  as="header"
  variant="content"
  padding="md"
  id="page-header"
  dataTestId="pricing-header"
>
  {/* header content */}
</Section>
```

## Migration Checklist

1. **Identify the section pattern**
   - Check current max-width class
   - Note padding values
   - Identify background color/theme usage

2. **Choose appropriate variant**
   - Use the width variant mapping table
   - Default to `content` for most sections

3. **Set padding**
   - Use standard padding presets when possible
   - Use custom padding for special cases

4. **Handle backgrounds**
   - Use theme-aware backgrounds (`primary`, `secondary`)
   - Use `background="custom"` with `backgroundClass` for special cases

5. **Add special props**
   - `hasNavbarOffset` for hero sections
   - `overflow="hidden"` for animated sections
   - `height` for viewport-based sizing

6. **Test responsiveness**
   - Verify mobile and desktop views
   - Check padding scales appropriately
   - Ensure content remains readable

## Best Practices

1. **Use presets for common patterns**
   ```tsx
   <Section {...sectionPresets.hero}>
   ```

2. **Avoid inline styles**
   - Use Section props instead of className overrides
   - Create new variants if needed

3. **Keep content semantic**
   ```tsx
   <Section as="article" id="blog-post">
   ```

4. **Theme-aware backgrounds**
   - Always use `background` prop instead of hardcoded colors
   - This ensures proper dark/light mode support

5. **Consistent spacing**
   - Use the padding system instead of margins on child elements
   - This maintains vertical rhythm across sections

## Gradual Migration Strategy

1. **Phase 1**: High-traffic pages (Home, Pricing, About)
2. **Phase 2**: Feature pages (Solutions, Integrations)
3. **Phase 3**: Content pages (Blog, Legal)
4. **Phase 4**: Remaining components and edge cases

For each migration:
1. Update the component to use Section
2. Test responsive behavior
3. Verify theme switching works correctly
4. Check accessibility (landmarks, contrast)
5. Update any component-specific documentation