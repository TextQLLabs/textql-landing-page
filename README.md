# TextQL Landing Page

> The official marketing website for TextQL - transforming data into insights through natural language processing and AI-powered analytics.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd textql-landing-page
npm install

# Start development server
npm run dev
# Open http://localhost:5173
```

## 📖 Documentation

**Complete documentation is available in the [`docs/`](./docs/) folder:**

- **[Getting Started](./docs/development-setup.md)** - Development environment setup
- **[Project Architecture](./docs/architecture.md)** - Codebase structure and patterns
- **[Contributing Guidelines](./docs/contributing.md)** - How to contribute
- **[Component Development](./docs/component-development.md)** - UI component guidelines
- **[Blog System](./docs/blog-system.md)** - Content management workflow
- **[Deployment Guide](./docs/deployment.md)** - Production deployment
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## ✨ Features

### 🎯 Core Features
- **Product Showcase**: Interactive demos and feature highlights
- **Blog System**: TypeScript + Markdown content management
- **Integration Gallery**: Snowflake, Databricks, Tableau showcases
- **Pricing Calculator**: Dynamic pricing with enterprise options
- **Company Info**: About, careers, and team information

### 🛠 Technical Features
- **React 18** with TypeScript and strict typing
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** with mobile-first responsive design
- **Framer Motion** and React Spring for smooth animations
- **Three.js** for 3D visualizations and interactive graphics
- **Recharts** for data visualization and analytics displays

## 🏗 Project Structure

```
textql-landing-page/
├── docs/                    # 📖 Complete documentation
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (buttons, modals, etc.)
│   │   └── page-sections/  # Page-specific sections
│   ├── data/               # Static content and data
│   │   ├── blog/           # Blog posts (TypeScript + Markdown)
│   │   └── solutions/      # Solution templates
│   ├── pages/              # Route components
│   ├── styles/             # Global styles and design system
│   └── utils/              # Utility functions
├── public/                 # Static assets
│   ├── images/             # Organized by feature/page
│   ├── videos/             # Demo and marketing videos
│   └── pdf/                # Whitepapers and documents
└── [config files]         # Vite, TypeScript, Tailwind configs
```

## 🚦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:5173` |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run prerender` | Generate static pages for SEO |

## 🧪 Quality Assurance

### Pre-Commit Checklist
Always run these before committing:

```bash
npm run lint         # ✅ Code style and quality
npx tsc --noEmit     # ✅ TypeScript type checking
npm run build        # ✅ Production build verification
```

### Performance Targets
- **Lighthouse Score**: 90+ performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: < 250KB JavaScript, < 50KB CSS

## 🌐 Deployment

### Production Deployment
- **Platform**: Netlify
- **Trigger**: Automatic on push to `main` branch
- **Preview**: Unique URLs for all pull requests
- **Environment**: Variables managed via Netlify dashboard

### Environment Variables
```bash
# Example .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
VITE_ENABLE_DEBUG=true
```

All client-side variables must start with `VITE_` prefix.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/contributing.md) for details on:

- Development workflow
- Code standards and patterns
- Component architecture
- Testing procedures
- Pull request process

### Development Guidelines
- **Components**: Create reusable components for 2+ use cases
- **Styling**: Use Tailwind CSS with mobile-first approach
- **TypeScript**: Strict typing with proper interfaces
- **Performance**: Monitor bundle size and Core Web Vitals
- **Accessibility**: WCAG compliance and semantic HTML

## 📊 Tech Stack Details

### Frontend Framework
- **React 18**: Latest features including concurrent rendering
- **TypeScript**: Strict typing for better developer experience
- **Vite**: Fast development server and optimized production builds

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Type-safe component variants
- **Lucide React**: Consistent icon system
- **Framer Motion**: Declarative animations and gestures

### Content Management
- **TypeScript Metadata**: Type-safe content definitions
- **Markdown**: Human-readable content format
- **React Router**: Client-side routing and navigation
- **Dynamic Imports**: Code splitting for performance

## 🔍 Monitoring & Analytics

### Performance Monitoring
- **Lighthouse**: Automated performance audits
- **Core Web Vitals**: Real user experience metrics
- **Bundle Analysis**: Monitor JavaScript and CSS size

### Quality Gates
- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety and IntelliSense
- **Build Verification**: Ensure production builds succeed

## 📚 Learning Resources

### Documentation Deep Dives
- [Component Architecture](./docs/component-development.md) - When to create reusable vs page-specific components
- [Performance Optimization](./docs/performance.md) - Bundle optimization and Core Web Vitals
- [Asset Management](./docs/asset-management.md) - Images, videos, and static file optimization

### External Resources
- [React Documentation](https://react.dev) - Official React guides
- [Vite Guide](https://vitejs.dev/guide/) - Build tool documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system guide

## 🆘 Getting Help

### Quick References
- **Common Issues**: See [Troubleshooting Guide](./docs/troubleshooting.md)
- **Development Setup**: See [Development Setup](./docs/development-setup.md)
- **Architecture Questions**: See [Project Architecture](./docs/architecture.md)

### Support Channels
- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: Comprehensive guides in [`docs/`](./docs/) folder
- **Pull Requests**: Code contributions and improvements

## 📄 License

This project is proprietary software. All rights reserved by TextQL.

---

**Built with ❤️ by the TextQL Team**

For detailed information about any aspect of this project, please refer to the comprehensive documentation in the [`docs/`](./docs/) folder.