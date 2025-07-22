# Light/Dark Mode Fixes Required

## Overview
This document tracks all the different dark mode control mechanisms found in the TextQL landing page codebase. The goal is to consolidate these into a unified global theme system.

## Current Dark Mode Systems

### 1. Global Theme System (NEW - Main System)
**Status**: ✅ **IMPLEMENTED**
- **Location**: `/src/components/GlobalThemeProvider.tsx`
- **Context**: `/src/contexts/DevToolsContext.tsx`
- **Integration**: `/src/components/AppWithGlobalTheme.tsx`
- **DevTools**: `/src/components/DevTools.tsx`

**How it works**:
- Global theme state with localStorage persistence
- Integrates with DevTools panel for theme switching
- Uses `global-light-mode` and `global-dark-mode` CSS classes on body
- Only used by HomeHero component currently

### 2. Individual Component Theme Props (LEGACY - Needs Consolidation)
**Status**: ❌ **NEEDS FIXING**

**Pages with hardcoded theme="dark"**:
- `/src/pages/Ontology.tsx:19` - `theme="dark"`
- `/src/pages/Customers.tsx:595` - `theme="dark"`
- `/src/pages/Whitepaper.tsx` - Multiple `theme="dark"` (lines 30, 48, 61, 65, 69, 73, 101, 113)
- `/src/pages/blog/[id].tsx:70` - `theme="dark"`
- `/src/pages/Pricing.tsx:26` - `theme="dark"`
- `/src/pages/solutions/[id].tsx:52` - `theme="dark"`
- `/src/pages/solutions/index.tsx:111` - `theme="dark"`
- `/src/pages/Agents.tsx:39` - `theme="dark"`
- `/src/pages/Enterprise.tsx:39` - `theme="dark"`
- `/src/pages/integrations/SnowflakeMcpIntegration.tsx:300` - `theme="dark"`
- `/src/pages/integrations/TableauMcpIntegration.tsx:310` - `theme="dark"`
- `/src/pages/integrations/Databricks.tsx:302` - `theme="dark"`

**Pages with hardcoded theme="light"**:
- `/src/pages/AllIntegrations.tsx:19` - `theme="light"`
- `/src/pages/Terms.tsx:29` - `theme="light"`
- `/src/pages/Enterprise.tsx:24` - `theme="light"`
- `/src/pages/Enterprise.tsx:31` - `theme="light"`
- `/src/pages/customers/Fortune500Financial.tsx:246` - `theme="light"`
- `/src/pages/customers/CaseStudyTemplate.tsx:176` - `theme="light"`

### 3. Navbar isDarkPage System (LEGACY - Needs Consolidation)
**Status**: ❌ **NEEDS FIXING**
- **Location**: `/src/components/Navbar/index.tsx:110,115`
- **Usage**: `theme={isDarkPage ? "dark" : "light"}`
- **Problem**: Separate logic from global theme system

### 4. Test Page Local Theme State (DEVELOPMENT ONLY)
**Status**: ✅ **OK TO KEEP**
- **Location**: `/src/pages/Test.tsx`
- **Usage**: Local theme state for testing UI components
- **Note**: This is for development testing only, not production

### 5. Components with Theme Prop Support
**Status**: ✅ **GOOD - KEEP EXISTING**

**UI Components that support theme prop**:
- Button (`/src/components/ui/Button/`)
- Badge (`/src/components/ui/Badge/`)
- Text (`/src/components/ui/Typography/`)
- Card (`/src/components/ui/Card/`)
- DemoRequestForm (`/src/components/ui/DemoRequestForm/`)
- InsightsFeed components
- Various page-sections components

### 6. Direct CSS Class Usage (LEGACY - Needs Consolidation)
**Status**: ❌ **NEEDS FIXING**

**Pages with hardcoded dark backgrounds**:
- Multiple files with `bg-[#0A0B0E]`, `bg-[#1A1A1A]`, `bg-gray-900`, `bg-black`
- These should use theme-aware CSS classes or component theme props

## Consolidation Plan

### Phase 1: Connect Global Theme to Pages ❌ **TODO**
1. **Update all pages to use global theme context**
   - Replace hardcoded `theme="dark"` with `useGlobalTheme().isLightMode ? "light" : "dark"`
   - Replace hardcoded `theme="light"` with `useGlobalTheme().isLightMode ? "light" : "dark"`

### Phase 2: Fix Navbar Integration ❌ **TODO**
1. **Update Navbar to use global theme**
   - Replace `isDarkPage` logic with global theme context
   - Remove duplicate theme detection logic

### Phase 3: CSS Class Consolidation ❌ **TODO**
1. **Create theme-aware CSS classes**
   - Add CSS classes that respond to `.global-light-mode` and `.global-dark-mode`
   - Replace hardcoded dark background classes

### Phase 4: Component Theme Prop Enhancement ❌ **TODO**
1. **Add theme prop fallback to global theme**
   - Update components to use global theme when theme prop is not provided
   - Maintain backward compatibility

## Files to Modify

### Critical Files (High Priority)
1. `/src/pages/Ontology.tsx` - Remove hardcoded theme="dark"
2. `/src/pages/Customers.tsx` - Remove hardcoded theme="dark"
3. `/src/pages/Whitepaper.tsx` - Remove hardcoded theme="dark"
4. `/src/pages/blog/[id].tsx` - Remove hardcoded theme="dark"
5. `/src/pages/Pricing.tsx` - Remove hardcoded theme="dark"
6. `/src/pages/solutions/[id].tsx` - Remove hardcoded theme="dark"
7. `/src/pages/solutions/index.tsx` - Remove hardcoded theme="dark"
8. `/src/pages/Agents.tsx` - Remove hardcoded theme="dark"
9. `/src/pages/Enterprise.tsx` - Remove hardcoded theme="dark"
10. `/src/components/Navbar/index.tsx` - Replace isDarkPage with global theme

### Secondary Files (Medium Priority)
1. Integration pages (Snowflake, Tableau, Databricks) - Remove hardcoded theme="dark"
2. Customer pages - Remove hardcoded theme="light"
3. Legal pages - Remove hardcoded theme="light"

### Low Priority Files
1. Test page - Keep as is (development only)
2. Component files - Enhance with global theme fallback

## Testing Checklist

### Before Starting
- [ ] Verify global theme system works in DevTools
- [ ] Check localStorage persistence
- [ ] Test theme switching functionality

### During Implementation
- [ ] Each page responds to global theme toggle
- [ ] No hardcoded theme values remain
- [ ] CSS classes update correctly
- [ ] Component themes update correctly
- [ ] Navbar theme updates correctly

### After Implementation
- [ ] All pages have consistent theming
- [ ] Theme persists across page navigation
- [ ] DevTools theme toggle works globally
- [ ] No console errors
- [ ] CSS transitions are smooth

## Notes
- The global theme system is already implemented and working
- Only HomeHero component currently uses it
- The main task is to connect all other components to use the global theme
- Maintain backward compatibility for components that explicitly set theme props
- The Test page should keep its local theme state for development purposes

## Session Progress
- **Session 1**: ✅ **COMPLETE** - Discovered and documented all dark mode systems
- **Session 2**: ❌ **TODO** - Begin Phase 1 implementation
- **Session 3**: ❌ **TODO** - Continue Phase 1 and start Phase 2
- **Session 4**: ❌ **TODO** - Complete remaining phases and testing