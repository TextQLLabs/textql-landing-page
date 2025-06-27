# TextQLLabs Project Information

## GitHub Account
- **Logged in as**: TheEthanDing
- **Token scopes**: admin:org, delete:packages, repo, workflow, write:packages

## Organizations
- project-alexander
- TextQLLabs

## TextQLLabs Repositories
- demo
- blog  
- dbt-documentor
- fe
- TqlApi
- mkprompt
- dbt-redshift
- textql-frontend
- ana-engine
- dbt-doc-py
- ana
- ana-services
- ana-sandbox
- looker2dbt
- dialogue-engine
- dbt-doc-web
- aws-users
- dbt_test
- context-hub
- flow-hs-example
- thread-ux-study (this repository)

## Project Mappings
- **Frontend**: textql-frontend, fe
- **Backend API**: TqlApi, ana-engine, ana-services
- **Analytics**: ana, ana-sandbox
- **Documentation**: dbt-documentor, dbt-doc-py, dbt-doc-web, blog
- **Data Tools**: dbt-redshift, looker2dbt, dbt_test
- **AI/ML**: dialogue-engine, mkprompt, context-hub
- **Infrastructure**: aws-users
- **Examples**: demo, flow-hs-example

## MCP (Model Context Protocol) Server Configuration

### Critical Paths
- **MCP Server Modules**: `/Users/ethanding/projects/node_modules/@modelcontextprotocol/`
- **Claude Config Location (macOS)**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Config Location (Windows)**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Claude Config Location (Linux)**: `~/.config/Claude/claude_desktop_config.json`

### Currently Installed MCP Servers
1. **Puppeteer Server** - Browser automation
   - Package: `@modelcontextprotocol/server-puppeteer`
   - Version: ^2025.5.12
   - Path: `/Users/ethanding/projects/node_modules/@modelcontextprotocol/server-puppeteer/dist/index.js`

### How to Add MCP Servers to Claude

1. **Install the MCP server package**:
   ```bash
   cd /Users/ethanding/projects
   npm install @modelcontextprotocol/server-<name>
   ```

2. **Open Claude's config file**:
   ```bash
   # macOS
   open ~/Library/Application\ Support/Claude/claude_desktop_config.json
   
   # Or use your preferred editor
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Add the server configuration**:
   ```json
   {
     "mcpServers": {
       "puppeteer": {
         "command": "node",
         "args": ["/Users/ethanding/projects/node_modules/@modelcontextprotocol/server-puppeteer/dist/index.js"]
       },
       "your-new-server": {
         "command": "node",
         "args": ["/path/to/server/index.js"]
       }
     }
   }
   ```

4. **Restart Claude** to load the new MCP server

### Available MCP Servers
Common MCP servers you can install:
- `@modelcontextprotocol/server-puppeteer` - Browser automation
- `@modelcontextprotocol/server-filesystem` - Enhanced file system access
- `@modelcontextprotocol/server-git` - Git operations
- `@modelcontextprotocol/server-github` - GitHub API access
- `@modelcontextprotocol/server-postgres` - PostgreSQL database access
- `@modelcontextprotocol/server-sqlite` - SQLite database access

### Maintenance

1. **Update MCP servers**:
   ```bash
   cd /Users/ethanding/projects
   npm update @modelcontextprotocol/server-<name>
   ```

2. **Check installed versions**:
   ```bash
   npm list | grep @modelcontextprotocol
   ```

3. **Remove an MCP server**:
   - Uninstall the package: `npm uninstall @modelcontextprotocol/server-<name>`
   - Remove its configuration from Claude's config file
   - Restart Claude

4. **Troubleshooting**:
   - If MCP server doesn't appear in Claude, check the config file for JSON syntax errors
   - Ensure the path in the config matches the actual installation path
   - Check Claude's developer console for error messages
   - Verify the server package is properly installed with `npm list`

### Best Practices
- Keep all MCP servers in a central location (e.g., `/Users/ethanding/projects`)
- Document which projects use which MCP servers
- Regularly update MCP servers for security and feature updates
- Test MCP server configurations before critical work sessions

# TextQL Landing Page Blog Structure

## Blog Architecture Overview
This project implements a structured blog system with TypeScript definitions and markdown content management. The blog is built using React Router, React components, and Vite for the build system.

## Key Blog Components

### 1. Blog Data Structure
- **Location**: `src/data/blog/`
- **Main index**: `src/data/blog/index.ts`
- **Type definitions**: `src/data/blog/types.ts`

### 2. Blog Post Structure
Each blog post consists of:
- **Metadata file**: `{post-id}.ts` - Contains title, description, author, date, etc.
- **Content file**: `{post-id}/content.md` - Markdown content for the post
- **Images**: `public/images/blog/{post-id}/` - Header images and assets

### 3. Blog Components
- **Blog Index Page**: `src/pages/blog/index.tsx`
- **Individual Post Page**: `src/pages/blog/[id].tsx`
- **Blog Components**: `src/components/page-sections/blog/`
  - `BlogHeader.tsx` - Featured post hero section
  - `BlogGrid.tsx` - Grid layout for posts
  - `BlogCard.tsx` - Individual post cards
  - `types.ts` - TypeScript interfaces

## Adding New Blog Posts

### Step 1: Create Metadata File
Create `src/data/blog/{post-id}.ts`:
```typescript
import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'your-post-id',
  title: 'Your Post Title',
  description: 'Brief description',
  image: '/images/blog/your-post-id/header.png',
  useLocalImage: true,
  author: {
    name: 'Author Name',
    role: 'Title',
    company: 'TextQL'
  },
  date: 'Month DD, YYYY',
  readTime: 'X min read',
  category: 'category-name',
  featured: false // Set to true for featured posts
};
```

### Step 2: Create Content File
Create `src/data/blog/{post-id}/content.md` with your markdown content.

### Step 3: Add Images
Place header image at `public/images/blog/{post-id}/header.png` and any additional assets.

### Step 4: Update Index File
Add to `src/data/blog/index.ts`:
1. Import the post: `import { post as yourPostId } from './your-post-id';`
2. Add to blogPosts array (most recent first)
3. Add case to getPostContent() switch statement
4. Add content loading function

## Content Loading System
The blog uses Vite's `import.meta.glob()` to dynamically load markdown content:
- Content is loaded as raw text using `?raw` query
- Each post has a dedicated content loading function
- Content is loaded eagerly for better performance

## Image Management
- **Header images**: Stored in `public/images/blog/{post-id}/`
- **Local images**: Use `useLocalImage: true` flag in metadata
- **External images**: Set `useLocalImage: false` and provide full URL

## Blog Features
- **Featured posts**: Set `featured: true` in metadata for hero display
- **Categories**: Organize posts by category for filtering
- **Reading time**: Estimated reading time for each post
- **Author information**: Name, role, and company for each author
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **SEO optimization**: Meta tags and structured data

## Styling & UI
- **CSS Framework**: Tailwind CSS
- **Components**: Custom UI components in `src/components/ui/`
- **Icons**: Lucide React icons
- **Typography**: Custom heading and text components
- **Theme**: Consistent design system with dark/light variants

## Build & Deployment
- **Dev server**: `npm run dev` (localhost:5173)
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Prerendering**: `npm run prerender` (for static generation)

## Current Blog Posts
The blog currently contains 18 posts covering topics like:
- AI/ML and text-to-SQL technology
- Data engineering and analytics
- Company announcements and fundraising
- Technical deep-dives (Haskell, embeddings, benchmarks)
- Industry integrations (Tableau, NBA, SOC2)

## Development Workflow
1. Create post metadata and content files
2. Add images to public directory
3. Update index.ts with new post
4. Test locally with `npm run dev`
5. Build and deploy when ready

# Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

# Development Workflow - Make Changes and Test on Localhost

## Overview
When making changes to the TextQL landing page, follow this workflow to ensure changes are properly tested before committing.

## Prerequisites
- **Development server is already running** on http://localhost:5173
- You DON'T need to run `npm run dev` - it's already running
- Use MCP Playwright tools to test changes in the browser

## Browser-Safe Testing Dimensions
Always test responsive layouts at these viewport sizes that account for typical browser chrome heights (~100-140px):

1. **Mobile**: 375px × 667px (standard mobile viewport)
2. **Tablet**: 768px × 850px (tablet with browser UI)
3. **Laptop**: 1280px × 680px (laptop with browser chrome)
4. **Desktop**: 1920px × 900px (desktop with browser UI)

### Testing with MCP Playwright
```bash
# Test all standard viewports
mcp__playwright__browser_resize -> width: 375, height: 667   # Mobile
mcp__playwright__browser_resize -> width: 768, height: 850   # Tablet
mcp__playwright__browser_resize -> width: 1280, height: 680  # Laptop
mcp__playwright__browser_resize -> width: 1920, height: 900  # Desktop
```

### Chrome DevTools Testing (Alternative)
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M on Mac)
3. Choose "Responsive" mode
4. Manually set these exact dimensions
5. The viewport will show the actual content area excluding browser UI

**Note**: MCP Playwright browser tools already show the viewport excluding browser chrome, so these dimensions are perfect for testing real-world scenarios.

## Workflow Steps

### 1. Get Instructions
- Receive specific change request from user
- Understand what needs to be modified (e.g., "fix heading alignment on medium screens")

### 2. Find the Relevant Files
- Use search tools (Grep, Glob, or Task) to locate the component
- For component changes, typically look in `/src/components/`
- Read the file to understand current implementation

### 3. Make the Change
- Edit the file with the required changes
- For responsive design, use Tailwind CSS classes:
  - `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
  - Example: `text-center xl:text-left` (center on small, left on xl+)

### 4. Test on Localhost Using MCP Playwright
```bash
# Navigate to localhost
mcp__playwright__browser_navigate -> http://localhost:5173

# Test different viewport sizes
mcp__playwright__browser_resize -> width: 768, height: 600   # Mobile
mcp__playwright__browser_resize -> width: 1024, height: 768  # Tablet
mcp__playwright__browser_resize -> width: 1920, height: 1080 # Desktop

# Take screenshots to verify changes
mcp__playwright__browser_take_screenshot -> filename: "after-changes.png"
```

### 5. Verify the Fix
- Check that the change works at all breakpoints
- Ensure no unintended side effects
- Confirm the fix addresses the original issue

## Example: Fixing Hero Section Alignment

**Problem**: Heading stays left-aligned when layout stacks on medium screens

**Solution Applied**:
1. Located the file: `/src/components/page-sections/home/HomeHero.tsx`
2. Added responsive text alignment classes:
   - Badge: `text-center xl:text-left`
   - Heading: `text-center xl:text-left`
   - Subtext: `text-center xl:text-left`
   - Form container: `justify-center xl:justify-start`
3. Tested at 1024px width to confirm center alignment
4. Tested at 1920px width to confirm left alignment on xl screens

**Result**: Content properly centers on medium screens and stays left-aligned on extra-large screens

# InsightsFeed Animation Sequence (Correct Implementation)

## Current Animation Phases
1. **initial** (RED debug bar) - Starting state
2. **cards-entering** (YELLOW debug bar) - Cards animating in
3. **cards-visible** (GREEN debug bar) - All cards visible and settled
4. **first-expanding** (BLUE debug bar) - First card expanding

## Correct Animation Flow

### On Page Load:
1. **initial** → Search animation plays → **cards-entering**
2. **cards-entering** → Cards slide in (all collapsed) with stagger → **cards-visible**
3. **cards-visible** → Brief pause (500ms) → **first-expanding**
4. **first-expanding** → First card expands

### On Industry Pill Click:
1. **first-expanding** → Reset expansion state → **initial**
2. **initial** → Brief pause (100ms) → **cards-entering**  
3. **cards-entering** → New cards slide in (all collapsed) → **cards-visible**
4. **cards-visible** → Brief pause (500ms) → **first-expanding**
5. **first-expanding** → First card expands

## Card States During Animation
- **cards-entering**: ALL cards collapsed, animating in with stagger
- **cards-visible**: ALL cards collapsed, stationary
- **first-expanding**: First card expanded, others collapsed

## Known Issues
- **Flash during cards-entering**: Cards animate to wrong position, then flash to correct position
- **Suspected cause**: Searchbar length change causing layout shift when industry pill clicked
- **Debug approach**: Check if searchbar width changes during industry transitions

## Animation Implementation Details
- Uses CSS transitions with stagger delays instead of Framer Motion
- `displayInsights` state keeps cards stable during industry transitions
- `cardsAnimationStage` controls opacity/transform for entrance animation
- Debug colors show current phase visually