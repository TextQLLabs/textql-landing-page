# Component Development Guide

## Component Architecture Philosophy

This guide outlines when and how to create components following the best practices established in the main CLAUDE.md context.

## When to Create Reusable Components vs Page-Specific Components

### Create a REUSABLE Component When:

1. **Used in 2+ places**: The component appears on multiple pages or multiple times on the same page
2. **Generic functionality**: The component provides generic UI functionality (buttons, dropdowns, modals, inputs)
3. **Consistent behavior**: The component should behave identically wherever it's used
4. **No page-specific logic**: The component doesn't contain business logic tied to a specific page
5. **Configurable**: The component can be customized through props/options without changing its core behavior

**Examples of Reusable Components:**
- Buttons with tooltips
- Dropdowns (attach files, settings, etc.)
- Modal dialogs
- Chat input areas
- Toggle switches
- Loading spinners
- Error messages
- Search inputs

### Create a PAGE-SPECIFIC Component When:

1. **Unique to one page**: The component only makes sense in the context of a specific page
2. **Contains page logic**: The component includes business logic specific to that page's functionality
3. **Tightly coupled**: The component relies on page-specific state or context
4. **Non-transferable**: Moving the component to another page would require significant changes

**Examples of Page-Specific Components:**
- Landing page welcome header
- Blog post content area
- Pricing calculator
- Contact forms with specific validation
- Tool-specific integrations

## Component Organization Structure

```
src/components/
├── ui/                    # Reusable components
│   ├── Button/
│   ├── Dropdown/
│   ├── Modal/
│   ├── Input/
│   └── Toggle/
├── page-sections/         # Page-specific sections
│   ├── home/              # Home page specific
│   ├── blog/              # Blog page specific
│   ├── pricing/           # Pricing page specific
│   └── integrations/      # Integration pages
└── [feature]/             # Feature-specific shared components
```

## Component File Structure

### Reusable Component Structure
```
src/components/ui/Button/
├── Button.tsx             # Main component
├── index.ts              # Export barrel
├── types.ts              # TypeScript interfaces
├── styles.ts             # Styled variants (CVA)
└── Button.stories.tsx    # Storybook stories (if using)
```

### Page-Specific Component Structure
```
src/components/page-sections/home/
├── HomeHero.tsx
├── OntologySection.tsx
├── EnterpriseSection.tsx
├── index.ts              # Export barrel
└── types.ts              # Shared types for home components
```

## Component Development Patterns

### 1. Reusable Component Pattern

```typescript
// src/components/ui/Button/types.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// src/components/ui/Button/styles.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// src/components/ui/Button/Button.tsx
import React from 'react';
import { buttonVariants } from './styles';
import type { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled,
  loading,
  ...props
}) => {
  return (
    <button
      data-variant={variant} // Add data attribute for CSS targeting
      className={buttonVariants({ variant, size })}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

// src/components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './types';
```

### 2. Page-Specific Component Pattern

```typescript
// src/components/page-sections/home/HomeHero.tsx
import React from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

export const HomeHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            New: AI-Powered Analytics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Data into
            <span className="text-blue-600"> Insights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            TextQL helps you analyze your data using natural language, 
            making complex analytics accessible to everyone.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Watch Demo</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
```

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Responsive Design**: Mobile-first approach
```typescript
// Good: Mobile-first responsive classes
<div className="text-center lg:text-left">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">Title</h1>
</div>
```

2. **Design System Consistency**: Use consistent spacing and colors
```typescript
// Good: Consistent spacing scale
<div className="space-y-4 p-6 md:p-8 lg:p-12">
  <div className="mb-4"> {/* Use mb-4, mb-6, mb-8 consistently */}
</div>
```

3. **Component Variants**: Use CVA for variant-based styling
```typescript
// Good: Structured variants
const cardVariants = cva(
  "rounded-lg border", // Base styles
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        outlined: "bg-transparent border-gray-300",
        elevated: "bg-white border-gray-200 shadow-lg",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
  }
);
```

## TypeScript Guidelines

### Component Props

```typescript
// Good: Comprehensive prop interface
interface ComponentProps {
  // Required props
  title: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onSubmit?: (data: FormData) => void;
  
  // React-specific props
  children?: React.ReactNode;
  className?: string;
  
  // HTML attributes (for extensibility)
} & React.HTMLAttributes<HTMLDivElement>;
```

### Data Types

```typescript
// Good: Structured data types
interface BlogPost {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
    company: string;
  };
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  image: string;
  useLocalImage: boolean;
}
```

## Accessibility Guidelines

### Semantic HTML
```typescript
// Good: Semantic HTML structure
<article className="blog-post">
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.date}>{formatDate(post.date)}</time>
  </header>
  <main>
    {/* Post content */}
  </main>
</article>
```

### ARIA Attributes
```typescript
// Good: Proper ARIA usage
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <CloseIcon aria-hidden="true" />
</button>
```

### Keyboard Navigation
```typescript
// Good: Keyboard event handling
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    onClick();
  }
  if (event.key === 'Escape') {
    onClose();
  }
};
```

## Performance Considerations

### Lazy Loading
```typescript
// Good: Lazy load heavy components
const ChartComponent = React.lazy(() => import('./ChartComponent'));

function AnalyticsDashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <ChartComponent data={data} />
    </Suspense>
  );
}
```

### Memoization
```typescript
// Good: Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Good: Memoize callback functions
const handleSubmit = useCallback((formData: FormData) => {
  onSubmit(formData);
}, [onSubmit]);
```

## CSS and Styling Best Practices

### Avoiding Common CSS Pitfalls

1. **Use Data Attributes for Variant Targeting**
```tsx
// ❌ Bad: Unreliable attribute selectors
<button className="btn-primary">

// CSS: button[class*="primary"] { } // Fragile!

// ✅ Good: Explicit data attributes
<button data-variant="primary" className={buttonVariants({ variant: 'primary' })}>

// CSS: button[data-variant="primary"] { } // Reliable!
```

2. **Avoid Inline Styles for Static Values**
```tsx
// ❌ Bad: Hardcoded inline styles
<div style={{ backgroundColor: '#000000', padding: '16px' }}>

// ✅ Good: Use Tailwind classes
<div className="bg-black p-4">
```

3. **Use CSS Variables for Dynamic Values**
```tsx
// ❌ Bad: Complex inline filters
<img style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />

// ✅ Good: CSS variable with utility class
<img className="filter-white" />
// CSS: .filter-white { filter: var(--filter-white); }
```

4. **Avoid !important in Component Styles**
```css
/* ❌ Bad: Forces specificity wars */
.button {
  color: black !important;
}

/* ✅ Good: Use proper specificity */
.dark-section .button {
  color: var(--theme-text-dark);
}
```

5. **Responsive Design Without Fixed Values**
```tsx
// ❌ Bad: Hardcoded calculations
<div style={{ height: 'calc(100vh - 60px)' }}>

// ✅ Good: Use CSS variables
<div className="h-[calc(100vh-var(--navbar-height))]">
```

### Component Styling Patterns

1. **Dark Section Pattern**
```tsx
// Apply dark theme to entire sections
<section className="dark-section">
  <h2>This inherits white text</h2>
  <p>So does this paragraph</p>
  <Button variant="primary">This maintains its own styling</Button>
</section>
```

2. **Theme-Aware Components**
```tsx
const ThemedComponent: React.FC = () => {
  const theme = useComponentTheme();
  
  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      {/* Content */}
    </div>
  );
};
```

## Testing Guidelines

### Component Testing
```typescript
// Good: Test component behavior
describe('Button Component', () => {
  it('should render with correct variant styles', () => {
    render(<Button variant="primary">Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });
  
  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Refactoring Checklist

When you find similar code in multiple places:

1. **Identify the pattern**: Is this UI element repeated?
2. **Check usage count**: Used in 2+ places? → Make it reusable
3. **Extract common logic**: Pull out shared functionality
4. **Create component interface**: Define clear props/options
5. **Replace duplicates**: Update all instances to use the new component
6. **Test consistency**: Ensure behavior is identical across all uses

## Anti-Patterns to Avoid

### ❌ Don't Do This:
```typescript
// Bad: Duplicated JSX in multiple components
function HeaderButton() {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded">
      Click me
    </button>
  );
}

function SidebarButton() {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded">
      Click me
    </button>
  );
}

// Bad: Page-specific logic in reusable component
function Button({ variant, isHomePage }) {
  if (isHomePage) {
    // Home page specific logic - DON'T DO THIS
  }
}
```

### ✅ Do This Instead:
```typescript
// Good: Single reusable component
function Button({ variant, children, ...props }) {
  return (
    <button 
      className={buttonVariants({ variant })}
      {...props}
    >
      {children}
    </button>
  );
}

// Good: Compose with page-specific logic
function HomePage() {
  const handleHomePageAction = () => {
    // Page-specific logic stays in page component
  };
  
  return (
    <Button onClick={handleHomePageAction}>
      Click me
    </Button>
  );
}
```

## Related Documentation
- [Project Architecture](./architecture.md)
- [Contributing Guidelines](./contributing.md)
- [Testing Guide](./testing.md)