# Project Architecture

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, React Spring
- **Routing**: React Router
- **Charts**: Recharts
- **3D Graphics**: Three.js

## Project Structure

```
textql-landing-page/
├── docs/                     # Documentation
├── public/                   # Static assets
│   ├── images/              # Images organized by feature
│   ├── videos/              # Video assets
│   └── pdf/                 # PDF files
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── page-sections/  # Page-specific sections
│   │   └── ...             # Feature components
│   ├── data/               # Static content & data
│   │   ├── blog/           # Blog posts
│   │   ├── solutions/      # Solution templates
│   │   └── ...             # Other data
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route components
│   ├── styles/             # Global styles & design system
│   ├── types/              # TypeScript definitions
│   └── utils/              # Utility functions
├── scripts/                # Build & utility scripts
└── [config files]         # Vite, TypeScript, etc.
```

## Component Architecture

### Component Types

1. **UI Components** (`src/components/ui/`)
   - Base components: Button, Input, Modal, etc.
   - Reusable across the application
   - Follow design system patterns

2. **Page Sections** (`src/components/page-sections/`)
   - Feature-specific sections
   - Organized by page/feature area
   - Composed of UI components

3. **Page Components** (`src/pages/`)
   - Route-level components
   - Compose page sections and handle routing

### Data Flow

1. **Static Data**: Lives in `src/data/` as TypeScript modules
2. **Dynamic Content**: Loaded via React hooks
3. **State Management**: React hooks and context (no external state library)

## Routing Strategy

- **File-based routing** with React Router
- **Dynamic routes** for blog posts and solutions: `[id].tsx`
- **Nested routing** for complex page structures

## Content Management

### Blog System
- **Metadata**: TypeScript files (`post-id.ts`)
- **Content**: Markdown files (`post-id/content.md`)
- **Images**: Organized in `public/images/blog/post-id/`

### Solutions Library
- Similar structure to blog
- Templates for industry-specific solutions

## Styling Approach

### Tailwind CSS
- **Utility-first** approach
- **Responsive design** with mobile-first breakpoints
- **Custom design system** in `src/styles/design-system.ts`

### Component Patterns
- **Compound components** for complex UI
- **Variant-based styling** using class-variance-authority
- **Consistent spacing** and typography

## Performance Considerations

### Code Splitting
- **Route-based splitting** via React Router
- **Dynamic imports** for heavy components
- **Asset optimization** via Vite

### Static Generation
- **Prerendering** for SEO-critical pages
- **Optimized images** and assets
- **Lazy loading** for non-critical content

## Development Patterns

### TypeScript Usage
- **Strict typing** enabled
- **Interface definitions** in `src/types/`
- **Type-safe data loading**

### Component Composition
- **Props interfaces** for all components
- **Forwarded refs** where needed
- **Consistent naming** conventions

## Build Process

1. **Development**: Vite dev server with HMR
2. **Production**: Optimized bundle with code splitting
3. **Deployment**: Static files served via Netlify
4. **Prerendering**: Static generation for key pages