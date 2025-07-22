# Contributing Guidelines

## Getting Started

Thank you for your interest in contributing to the TextQL Landing Page! This guide will help you get started with the development process.

## Prerequisites

- Read the [Development Setup Guide](./development-setup.md)
- Familiarize yourself with the [Project Architecture](./architecture.md)
- Ensure you have the required tools installed

## Development Workflow

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/your-username/textql-landing-page.git
cd textql-landing-page
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Create Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

## Code Standards

### TypeScript Guidelines
- **Strict typing**: Use proper TypeScript types
- **Interface definitions**: Define interfaces for all props and data structures
- **Type exports**: Export types from appropriate modules

```typescript
// Good: Proper interface definition
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Good: Type-safe component
const Button: React.FC<ButtonProps> = ({ variant, size, children, onClick }) => {
  // Component implementation
};
```

### React Component Guidelines
- **Functional components**: Use function components with hooks
- **Component composition**: Prefer composition over inheritance
- **Props interfaces**: Define clear prop interfaces
- **Forwarded refs**: Use forwardRef for reusable components

### Styling Guidelines
- **Tailwind CSS**: Use utility classes for styling
- **Responsive design**: Mobile-first approach
- **Design system**: Follow existing color and spacing patterns
- **Component variants**: Use class-variance-authority for variant-based styling

```typescript
// Good: Component with variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
  }
);
```

## File Organization

### Component Structure
```
src/components/
├── ui/                    # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── styles.ts
├── page-sections/         # Page-specific sections
│   ├── home/
│   ├── blog/
│   └── ...
└── [feature]/            # Feature-specific components
```

### Naming Conventions
- **Components**: PascalCase (`ButtonComponent.tsx`)
- **Files**: kebab-case for non-components (`utils.ts`)
- **Directories**: kebab-case (`page-sections/`)
- **Variables**: camelCase (`isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

## Testing Guidelines

### Quality Checks
Run these before submitting:

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build
```

### Manual Testing
1. **Test responsive design**: Check all breakpoints
2. **Test functionality**: Verify all interactive elements
3. **Test performance**: Check load times and animations
4. **Cross-browser testing**: Test in Chrome, Firefox, Safari

## Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples
```bash
feat(blog): add new blog post template
fix(header): resolve mobile navigation issue
docs(readme): update setup instructions
style(button): improve hover states
```

## Pull Request Process

### 1. Prepare Your Changes
```bash
# Ensure your branch is up to date
git checkout main
git pull origin main
git checkout your-feature-branch
git rebase main

# Run quality checks
npm run lint
npm run build
```

### 2. Create Pull Request
- **Title**: Clear, descriptive title
- **Description**: Explain what changes were made and why
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested the changes

### 3. Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested locally
- [ ] Checked responsive design
- [ ] Verified accessibility
- [ ] Cross-browser tested

## Screenshots
[Include screenshots for UI changes]
```

## Code Review Guidelines

### For Reviewers
- **Focus on**: Logic, performance, accessibility, maintainability
- **Check**: TypeScript types, component patterns, responsive design
- **Test**: Pull down changes and test locally
- **Be constructive**: Provide helpful feedback and suggestions

### For Contributors
- **Be responsive**: Address feedback promptly
- **Ask questions**: If feedback is unclear, ask for clarification
- **Test changes**: Verify fixes work as expected
- **Update docs**: Update documentation if needed

## Component Development Guidelines

### Creating Reusable Components
See [Component Development Guide](./component-development.md) for detailed guidelines on:
- When to create reusable vs page-specific components
- Component API design
- Styling patterns
- Accessibility considerations

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to React Router configuration
3. Update navigation if needed
4. Add SEO metadata
5. Test responsive design

### Adding Blog Posts
Follow the [Blog System Guide](./blog-system.md) for:
- Blog post structure
- Content creation process
- Image optimization
- SEO optimization

## Accessibility Guidelines

### Requirements
- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Add ARIA attributes where needed
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Maintain WCAG AA compliance
- **Screen readers**: Test with screen reader tools

### Testing Tools
- **Lighthouse**: Built-in accessibility audit
- **axe DevTools**: Browser extension for accessibility testing
- **Keyboard testing**: Tab through all interactive elements

## Performance Guidelines

### Best Practices
- **Lazy loading**: Implement for non-critical content
- **Image optimization**: Use appropriate formats and sizes
- **Bundle analysis**: Monitor JavaScript bundle size
- **Core Web Vitals**: Maintain good performance metrics

### Monitoring
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Run Lighthouse audit
npx lighthouse http://localhost:5173 --view
```

## Getting Help

### Resources
- [Project Architecture](./architecture.md)
- [Troubleshooting Guide](./troubleshooting.md)
- [Environment Variables](./environment-variables.md)

### Contact
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Team Slack**: For internal team communication (if applicable)

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes (for significant contributions)

Thank you for contributing to the TextQL Landing Page! 🎉