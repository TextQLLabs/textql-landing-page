# Development Setup Guide

## Prerequisites

- **Node.js**: Latest LTS version (v18+)
- **npm**: Comes with Node.js
- **Git**: For version control

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd textql-landing-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173/`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run prerender` | Generate static pages |
| `npm run cleanup` | Clean up assets |
| `npm run assets:organize` | Organize asset files |

## Development Environment

### IDE Setup
- **Recommended**: VS Code with ESLint and TypeScript extensions
- **ESLint**: Configured in `eslint.config.js`
- **TypeScript**: Configured in `tsconfig.json`

### Browser DevTools
- **React DevTools**: For component debugging
- **Vite DevTools**: For build debugging

## Hot Reload
The development server supports hot module replacement (HMR) for:
- React components
- CSS/Tailwind changes
- TypeScript files

## Environment Configuration
See [Environment Variables Guide](./environment-variables.md) for configuration details.

## Next Steps
- Review [Project Architecture](./architecture.md)
- Read [Contributing Guidelines](./contributing.md)
- Check [Component Development Guide](./component-development.md)