# Environment Variables Guide

## Overview

This project uses environment variables for configuration management. Variables are managed through `.env` files and deployment platform settings.

## Environment Files

### Development
- **`.env.local`**: Local development overrides (git-ignored)
- **`.env.development`**: Development defaults (git-ignored)
- **`.env.example`**: Template file (committed to git)

### Production
- Environment variables are managed through **Netlify dashboard**
- No `.env` files are deployed to production

## Variable Categories

### Build-Time Variables
These variables are available during the build process and embedded in the client bundle:

```bash
# Vite variables (must start with VITE_)
VITE_API_BASE_URL=https://api.textql.com
VITE_ENVIRONMENT=development
VITE_ANALYTICS_ID=
```

### Runtime Configuration
For client-side runtime configuration:

```bash
# Feature flags
VITE_ENABLE_DEBUG=false
VITE_ENABLE_BLOG=true
VITE_ENABLE_SOLUTIONS=true
```

## Security Guidelines

### ❌ Never Include in Client Bundle
- API keys or secrets
- Database credentials
- Internal service URLs
- Authentication tokens

### ✅ Safe for Client Bundle
- Public API endpoints
- Feature flags
- Public analytics IDs
- Environment identifiers

## Setup Instructions

### 1. Create Local Environment File
```bash
# Copy the example file
cp .env.example .env.local

# Edit with your local values
# Note: .env.local is automatically git-ignored
```

### 2. Configure Variables
```bash
# .env.local example
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
VITE_ENABLE_DEBUG=true
```

### 3. Accessing Variables in Code
```typescript
// In your TypeScript/JavaScript files
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isDebug = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Type-safe environment variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_ENABLE_DEBUG: string;
}
```

## Deployment Configuration

### Netlify Environment Variables
Set these in the Netlify dashboard under Site Settings > Environment Variables:

```bash
VITE_API_BASE_URL=https://api.textql.com
VITE_ENVIRONMENT=production
VITE_ANALYTICS_ID=your-analytics-id
```

### Build Context Variables
Netlify automatically provides these:

```bash
CONTEXT=production|deploy-preview|branch-deploy
BRANCH=main|feature-branch
COMMIT_REF=git-commit-hash
```

## Best Practices

### 1. Variable Naming
- Use `VITE_` prefix for client-accessible variables
- Use SCREAMING_SNAKE_CASE
- Be descriptive but concise

### 2. Default Values
```typescript
// Provide sensible defaults
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
```

### 3. Type Safety
```typescript
// Create typed environment interface
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
}
```

### 4. Validation
```typescript
// Validate required variables
function validateEnv() {
  const required = ['VITE_API_BASE_URL'];
  required.forEach(key => {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}
```

## Troubleshooting

### Variables Not Loading
1. Check variable name starts with `VITE_`
2. Restart development server after changes
3. Verify `.env.local` file exists and is readable

### Build Issues
1. Ensure production variables are set in Netlify
2. Check for typos in variable names
3. Verify no sensitive data in client bundle

### Common Patterns
```typescript
// Environment-specific behavior
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Feature flags
const showDebugInfo = import.meta.env.VITE_ENABLE_DEBUG === 'true' && isDev;
```

## Related Documentation
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Development Setup](./development-setup.md)