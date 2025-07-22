# Theme Unification Plan - TextQL Landing Page

## Current State Analysis

### 1. **Multiple Theme Implementations Found:**
- **Global Theme Provider**: `GlobalThemeProvider` component with `isLightMode` state
- **Component-specific theme state**: Test page uses local `useState<'light' | 'dark'>('dark')`
- **Fallback pattern**: HomeHero uses `globalTheme?.isLightMode ?? localIsLightMode`
- **Hook pattern**: `useComponentTheme()` wraps `useGlobalTheme()` to return theme string

### 2. **Theme Application Methods:**
- Direct conditional classes: `isLightMode ? 'bg-gray-100' : 'bg-gray-900'`
- Theme utility functions: `themeBackground(theme)`, `themeText(theme)`, etc.
- Inline ternary operators in Navbar components
- CSS variables for smooth transitions (mentioned in theme.ts comments)

### 3. **Components Currently Using Theme:**
- ✅ Footer (uses `useComponentTheme` + theme utilities)
- ❌ Test page (local theme state)
- ⚠️ HomeHero (fallback to local state)
- ✅ Navbar components (uses `useGlobalTheme`)
- Various other pages need checking

## Proposed Solution: Breaking Change Strategy

### Phase 1: Make Old Pattern Break (Force Migration)
```typescript
// 1. Rename the existing theme utilities to break all usages
// In theme.ts, rename all functions:
export function DEPRECATED_themeBackground() { throw new Error('Use global theme!'); }
export function DEPRECATED_themeText() { throw new Error('Use global theme!'); }

// 2. Create new centralized theme hook that's the ONLY way to get theme
// In useTheme.ts:
export function useTheme() {
  const { isLightMode, toggleTheme } = useGlobalTheme();
  return {
    theme: isLightMode ? 'light' : 'dark',
    isLight: isLightMode,
    isDark: !isLightMode,
    toggle: toggleTheme,
    // Include utility functions here
    bg: isLightMode ? 'bg-[#F7F7F7]' : 'bg-[#0F1712]',
    text: isLightMode ? 'text-[#2A3B35]' : 'text-white',
    // ... etc
  };
}
```

### Phase 2: Systematic Page-by-Page Fix

#### Priority Order (based on navbar visibility):
1. **Home** (`/`) - Fix HomeHero fallback pattern
2. **Pricing** (`/pricing`)
3. **Enterprise** (`/enterprise`)
4. **Solutions** (`/solutions`)
5. **About** (`/about`)
6. **Agents** (`/agents`)
7. **Ontology** (`/ontology`)
8. **Blog** (`/blog`)
9. **Integrations** (`/integrations`)
10. **Careers** (`/careers`)
11. **Test** (`/test`) - Remove local state

### Phase 3: Implementation Steps

1. **Create migration script** to:
   - Find all files using old patterns
   - List them in a checklist
   - Track migration progress

2. **Update each component**:
   ```typescript
   // OLD
   const [theme, setTheme] = useState<'light' | 'dark'>('dark');
   const isLightMode = theme === 'light';
   
   // NEW
   const { theme, isLight, isDark, toggle } = useTheme();
   ```

3. **Remove all**:
   - Local theme state (`useState`)
   - Direct `isLightMode` conditionals
   - Fallback patterns
   - Old theme utility imports

4. **Standardize to**:
   - Single `useTheme()` hook
   - Consistent class application
   - No component-level theme state

### Phase 4: Verification

1. **Create test script** that:
   - Toggles theme globally
   - Screenshots each page in both modes
   - Checks for inconsistencies

2. **Manual verification**:
   - Click through all pages
   - Verify theme persists across navigation
   - Check mobile/desktop consistency

## Benefits of This Approach

1. **Immediate visibility**: Breaking changes make it impossible to miss old implementations
2. **Systematic migration**: Clear checklist of what needs fixing
3. **Single source of truth**: One hook, one theme state
4. **Better DX**: Clear error messages guide developers
5. **Type safety**: TypeScript will catch all broken imports

## Alternative: Gradual Migration (Not Recommended)

Could use search/replace, but risks:
- Missing edge cases
- Inconsistent patterns
- No forced migration
- Harder to track progress

## Next Steps

1. Implement Phase 1 (breaking changes) - **5 minutes**
2. Run build to get full list of errors - **1 minute**
3. Create migration checklist from errors - **5 minutes**
4. Fix pages systematically - **2-3 hours**
5. Verify and test - **30 minutes**

Total estimated time: **~4 hours**