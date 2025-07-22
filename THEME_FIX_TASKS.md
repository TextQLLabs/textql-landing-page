# Theme Fix Tasks - Incremental Fixes

## Task List for Subagents

### 1. About Page Components (HIGH PRIORITY)
- **File**: `src/components/page-sections/about/AboutHero.tsx`
  - Fix hardcoded `backgroundColor: '#000000'`
  - Fix hardcoded `text-[#B8D8D0]` colors
  - Add theme support using `useComponentTheme()`

- **File**: `src/pages/About.tsx`
  - Fix mission essay hardcoded `text-[#B8D8D0]` (line 26)
  - Ensure all text adapts to theme

### 2. Careers Page Components (HIGH PRIORITY)
- **File**: `src/pages/Careers.tsx`
  - Fix all hardcoded text colors (`text-[#B8D8D0]`, `text-[#729E8C]`)
  - Fix gradient issues (line 79)
  - Fix hero section colors (lines 62-74)

- **File**: `src/components/careers/ValuesBlock.tsx`
  - Already partially themed but needs review
  - Verify all conditional theme logic is correct

### 3. Agent Page "Powered by" Section (MEDIUM PRIORITY)
- **File**: `src/components/page-sections/agents/AgentOntologySection.tsx`
  - Fix hardcoded `bg-black` background
  - Fix text colors to be theme-aware
  - Fix gradient overlays

### 4. Solution Library Components
- **File**: `src/components/page-sections/solution-library/SolutionCard.tsx`
  - Fix hardcoded gradient overlay (line 19)
  
- **File**: `src/components/page-sections/solution-library/SolutionLibraryHeader.tsx`
  - Fix hardcoded gradient (line 31)

### 5. Home Page Components
- **File**: `src/components/page-sections/home/OntologySection.tsx`
  - Fix hardcoded gradients (lines 48-49)
  
- **File**: `src/components/page-sections/home/SolutionCarousel/Carousel.tsx`
  - Fix hardcoded gradient overlays (lines 55-56)

### 6. Other Components with Hardcoded Colors
- **File**: `src/pages/Team.tsx`
  - Review gradient usage (line 106)
  - Fix hover gradient (line 116)

- **File**: `src/components/JobPostingTemplate.tsx`
  - Review gradient (line 63)

- **File**: `src/components/page-sections/blog/BlogCard.tsx`
  - Fix hardcoded gradient overlay (line 30)

- **File**: `src/components/page-sections/pricing/PricingHeader.tsx`
  - Fix hardcoded gradient (line 60)

### 7. Theme Utility Enhancements
- **File**: `src/utils/theme.ts`
  - Add gradient utility functions
  - Add more comprehensive color utilities

## Execution Order

1. **Phase 1 - Critical User-Facing Pages**
   - About page fixes
   - Careers page fixes
   - Agent page "Powered by" fix

2. **Phase 2 - Component Libraries**
   - Solution cards
   - Blog cards
   - Pricing components

3. **Phase 3 - Infrastructure**
   - Theme utility enhancements
   - Testing and verification

Each task should be completed and tested before moving to the next.