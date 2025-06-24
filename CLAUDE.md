# TextQL Landing Page - Codebase Map & Analysis

## Project Overview
This is a React-based landing page for TextQL built with:
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Animation**: Framer Motion, React Spring, Three.js
- **Deployment**: Netlify (with static prerendering)

## Architecture

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **Build Tool**: Vite 5.4.8
- **Styling**: TailwindCSS 3.4.1
- **Router**: React Router DOM 6.22.3
- **Animation**: Framer Motion 11.0.8, React Spring 9.7.3
- **3D Graphics**: Three.js 0.162.0
- **Charts**: Recharts 2.12.2
- **Markdown**: React Markdown 9.0.1
- **Icons**: Lucide React 0.344.0

### Build Configuration
- **Vite Config**: `vite.config.ts` - MDX support, React plugin, SSR manifest generation
- **React Router Config**: `react-router.config.ts` - Static prerendering for key routes
- **Tailwind Config**: `tailwind.config.js` - Custom animations and site width utilities
- **ESLint Config**: `eslint.config.js` - TypeScript and React linting rules

## Routing Structure

### Main Application Routes (`src/App.tsx`)
```
/ (Home) - HomeHero, JoinsSection, OntologySection, WorkflowCarousel, EnterpriseSection
├── /pricing - Pricing page
├── /enterprise - Enterprise features
├── /workflows - Workflow library (redirects from /templates)
│   └── /workflows/:id - Individual workflow templates
├── /about - About page
├── /agents - AI agents information
├── /ontology - Ontology explanation
├── /careers - Careers page
│   └── /careers/:jobId - Individual job postings
├── /integrations - All integrations overview
│   ├── /integrations/tableau - Tableau MCP integration
│   ├── /integrations/databricks - Databricks integration
│   └── /integrations/snowflake - Snowflake MCP integration
├── /terms - Terms of service
├── /privacy - Privacy policy
├── /whitepaper - Technical whitepaper
├── /team - Team page
├── /snowflake-2025 - Snowflake 2025 event page
├── /databricks-2025 - Databricks 2025 event page
├── /blog - Blog index
│   └── /blog/:id - Individual blog posts
└── /demo - Demo request page
```

### Prerendered Routes
Static routes defined in `react-router.config.ts`:
- `/`, `/pricing`, `/enterprise`, `/workflows`, `/about`, `/agents`
- `/ontology`, `/terms`, `/privacy`, `/blog`, `/demo`, `/snowflake-2025`

## Directory Structure

### `/src` - Main Source Code
```
src/
├── App.tsx - Main router and route definitions
├── main.tsx - React app entry point
├── index.css - Global styles
├── vite-env.d.ts - Vite type definitions
├── components/ - Reusable UI components
│   ├── Layout.tsx - Main layout wrapper
│   ├── Navbar/ - Navigation components
│   ├── ui/ - Base UI components (Button, Card, Input, etc.)
│   ├── animations/ - 3D animations and effects
│   ├── page-sections/ - Page-specific sections
│   └── sections/ - Generic reusable sections
├── pages/ - Page components
├── data/ - Static data and content
├── hooks/ - Custom React hooks
├── types/ - TypeScript type definitions
├── utils/ - Utility functions
└── styles/ - Style configurations
```

### Key Components Organization

#### UI Components (`/src/components/ui/`)
- **Button/** - Styled button components with variants
- **Card/** - Card components with different styles
- **Form/**, **Input/**, **Select/** - Form components
- **Typography/** - Text and heading components
- **Modal/**, **Carousel/** - Interactive components
- **Badge/** - Status and label badges

#### Animations (`/src/components/animations/`)
- **FunnelFlow.tsx** - Data flow visualizations
- **WaveBackground.tsx**, **WaveGrid.tsx** - Background animations
- **ontology/** - 3D ontology visualization using Three.js
  - Uses WebGL, rotation controls, animation loops
  - Complex 3D polyhedron rendering

#### Page Sections (`/src/components/page-sections/`)
Organized by page type:
- **home/** - Homepage sections
- **pricing/** - Pricing page components
- **enterprise/** - Enterprise feature sections
- **blog/** - Blog components
- **integrations/** - Integration-specific components
- **agents/**, **ontology/**, **about/** - Feature pages

### Data Structure (`/src/data/`)
```
data/
├── blog/ - Blog post content and metadata
│   ├── [post-name].ts - Post metadata
│   └── [post-name]/content.md - Markdown content
├── workflows/ - Workflow templates
│   └── [workflow-name]/
│       ├── insight.ts - Workflow metadata
│       └── workflow.md - Workflow description
├── insights/ - Industry-specific insights
│   └── [industry]/ - Banking, healthcare, retail, etc.
├── events.ts - Event data
├── industries.ts - Industry definitions
└── legal/ - Legal documents (privacy, terms)
```

## Dead/Unused Code Analysis

### Unused Files
1. **`/src/pages/DeprecatedIntegrations.tsx`** ❌
   - Contains integration components but not imported anywhere
   - References missing components (IntegrationsHero, DataSourcesSection, etc.)
   - **Status**: Dead code - should be removed

2. **`/src/pages/DesignSystem.tsx`** ⚠️
   - Accessible at `/design-system` route
   - Likely development/testing component
   - Not linked in navigation
   - **Status**: Development tool - keep for design reference

### Unused Imports (5 files total)
1. **`src/components/Logo.tsx:1`** - `import React from 'react'` (unnecessary with JSX transform)
2. **`src/components/Testimonial.tsx:1`** - `import React from 'react'` (unnecessary)
3. **`src/components/StaggeredScreenshots.tsx:1`** - `import React from 'react'` (unnecessary)
4. **`src/components/page-sections/blog/BlogGrid.tsx:4`** - `Badge` component imported but unused
5. **`src/components/FeatureSection.tsx:1`** - `Text` component imported but unused

### Debug Code
1. **`src/components/integrations/IntegrationCard.tsx`** - Contains `console.log` statement

## Key Features & Integrations

### Data Platform Integrations
- **Snowflake** - MCP integration with video demonstrations
- **Databricks** - Full integration support
- **Tableau** - MCP integration with multi-slide demonstrations
- **AWS**, **Azure**, **GCP** - Cloud platform support
- **dbt**, **Looker**, **PowerBI** - BI tool integrations

### Content Management
- **Blog System** - Markdown-based with metadata
- **Workflow Library** - Template-based workflow documentation  
- **Industry Insights** - Sector-specific data analysis templates
- **Whitepaper** - Technical documentation with visualizations

### Interactive Features
- **3D Ontology Visualization** - Three.js powered interactive graphics
- **Animated Search** - Wave ripple effects and search animations  
- **Video Players** - Integration demonstrations
- **Charts & Graphs** - Recharts for data visualization
- **Carousel Components** - Multi-slide content display

## Performance Considerations

### Build Optimizations
- Static prerendering for SEO
- Asset optimization with Vite
- Lazy loading for routes
- WebGL optimizations for 3D content

### Bundle Analysis
- Three.js adds significant bundle size for 3D features
- Multiple animation libraries (Framer Motion + React Spring)
- Large image assets in `/public/images/`

## Development Commands
```bash
npm run dev      # Development server
npm run build    # Production build  
npm run lint     # ESLint checking
npm run preview  # Preview production build
```

## Deployment
- **Platform**: Netlify
- **Configuration**: `netlify.toml`, `_redirects`, `serve.json`
- **Prerendering**: Handled by React Router
- **Assets**: Served from `/public/` directory

## Recommendations

### Code Cleanup
1. Remove `DeprecatedIntegrations.tsx` - confirmed dead code
2. Clean up 5 unused imports identified
3. Remove `console.log` from `IntegrationCard.tsx`
4. Consider consolidating animation libraries (Framer Motion vs React Spring)

### Performance
1. Implement lazy loading for heavy Three.js components
2. Optimize image assets (some are very large)
3. Consider bundle splitting for integration-specific code

### Maintenance
1. Standardize React import patterns (remove unnecessary React imports)
2. Add type safety to workflow and blog data structures
3. Consider moving inline styles to CSS modules for complex animations