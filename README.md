# TextQL Landing Page

The official landing page for TextQL, built with React, TypeScript, and Vite.

## Overview

This is TextQL's marketing website featuring:
- Product information and demos
- Blog posts and technical content
- Integration showcases (Snowflake, Databricks, Tableau)
- Pricing and enterprise features
- Company information and careers

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, React Spring
- **Routing**: React Router
- **Charts**: Recharts
- **3D Graphics**: Three.js

## Development

### Prerequisites
- Node.js (latest LTS)
- npm

### Setup
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
The site will be available at `http://localhost:5173/`

### Building
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Route components
- `src/data/` - Static content (blog posts, workflows, etc.)
- `public/` - Static assets (images, videos, PDFs)

## Deployment

The site is deployed via Netlify with configuration in `netlify.toml`.