# Blog System Documentation

## Overview

The TextQL Landing Page includes a comprehensive blog system built with TypeScript, React, and markdown content management. This guide covers the complete blog architecture and content management workflow.

## Blog Architecture

### File Structure
```
src/data/blog/
├── index.ts                    # Main blog index and content loader
├── types.ts                    # TypeScript interfaces
├── [post-id].ts               # Post metadata files
└── [post-id]/
    └── content.md             # Post content in markdown

public/images/blog/
└── [post-id]/
    ├── header.png             # Post header image
    └── [additional-assets]    # Additional images/assets
```

### Component Structure
```
src/components/page-sections/blog/
├── BlogHeader.tsx             # Featured post hero section
├── BlogGrid.tsx              # Grid layout for post listings
├── BlogCard.tsx              # Individual post preview cards
└── types.ts                  # Blog component interfaces

src/pages/blog/
├── index.tsx                 # Blog listing page
└── [id].tsx                  # Individual post page
```

## Content Creation Workflow

### 1. Create Post Metadata

Create a new file `src/data/blog/{post-id}.ts`:

```typescript
import type { BlogPost } from '../../components/page-sections/blog/types';

export const post: BlogPost = {
  id: 'your-post-id',
  title: 'Your Post Title',
  description: 'Brief description for SEO and preview cards',
  image: '/images/blog/your-post-id/header.png',
  useLocalImage: true,
  author: {
    name: 'Author Name',
    role: 'Title/Position',
    company: 'TextQL'
  },
  date: 'Month DD, YYYY',
  readTime: 'X min read',
  category: 'category-name',
  featured: false  // Set to true for hero display
};
```

### 2. Create Content File

Create `src/data/blog/{post-id}/content.md`:

```markdown
# Your Post Title

## Introduction

Your post content goes here using standard markdown syntax.

### Subheadings

Use H2 and H3 headings to structure your content.

## Code Examples

```typescript
// Code blocks support syntax highlighting
const example = "hello world";
```

## Lists and Links

- Bullet points work
- [Links to external sites](https://example.com)
- **Bold** and *italic* text

## Images

![Alt text](./image.png)
```

### 3. Add Images

1. Create directory: `public/images/blog/{post-id}/`
2. Add header image: `header.png` (recommended: 1200×630px)
3. Add any additional images referenced in content
4. Optimize images for web (WebP format recommended)

### 4. Update Blog Index

Edit `src/data/blog/index.ts`:

```typescript
// 1. Import the new post
import { post as yourPostId } from './your-post-id';

// 2. Add to blogPosts array (most recent first)
export const blogPosts: BlogPost[] = [
  yourPostId,  // Add new post here
  existingPost1,
  existingPost2,
  // ... other posts
];

// 3. Add content loading function
const yourPostIdContentLoader = () => 
  import('./your-post-id/content.md?raw').then(m => m.default);

// 4. Add case to getPostContent() switch statement
export async function getPostContent(postId: string): Promise<string> {
  switch (postId) {
    case 'your-post-id':
      return yourPostIdContentLoader();
    // ... other cases
    default:
      throw new Error(`Post not found: ${postId}`);
  }
}
```

## Blog Features

### Post Types

#### Regular Posts
Standard blog posts with full content and metadata.

#### Featured Posts
```typescript
export const post: BlogPost = {
  // ... other properties
  featured: true  // Displays in hero section
};
```

Featured posts appear prominently on the blog index page.

### Categories
Organize posts by category for filtering and organization:

```typescript
// Common categories:
- 'ai-ml'
- 'data-engineering' 
- 'company-news'
- 'integrations'
- 'technical'
```

### Author Information
```typescript
author: {
  name: 'Full Name',
  role: 'Job Title',
  company: 'TextQL'  // Usually TextQL for company posts
}
```

### Reading Time Estimation
Provide estimated reading time:
```typescript
readTime: '5 min read'  // Manual estimation based on content length
```

## Content Guidelines

### Writing Style
- **Clear and concise**: Write for technical and non-technical audiences
- **Scannable**: Use headings, bullet points, and short paragraphs
- **Actionable**: Include practical examples and takeaways
- **SEO-friendly**: Include relevant keywords naturally

### Markdown Best Practices

#### Headings
```markdown
# H1 - Post Title (use once)
## H2 - Main sections
### H3 - Subsections
#### H4 - Rarely needed
```

#### Code Blocks
```markdown
```typescript
// Always specify language for syntax highlighting
const example: string = "hello world";
```
```

#### Images
```markdown
![Descriptive alt text](./image-name.png)
<!-- Images should be in the same post directory -->
```

#### Links
```markdown
[Descriptive link text](https://example.com)
<!-- Avoid "click here" or "read more" -->
```

### Image Optimization

#### Header Images
- **Dimensions**: 1200×630px (optimal for social sharing)
- **Format**: PNG or WebP
- **File size**: < 200KB
- **Content**: Visually relevant to post topic

#### Content Images
- **Format**: WebP preferred, PNG/JPG acceptable
- **Responsive**: Provide multiple sizes if needed
- **Alt text**: Always include descriptive alt text
- **File size**: Optimize for web (< 100KB for most images)

## SEO Optimization

### Metadata Requirements
```typescript
{
  title: 'Descriptive Title (60 characters max)',
  description: 'Compelling description for search results (155 characters max)',
  // ... other fields
}
```

### URL Structure
- Posts use clean URLs: `/blog/post-id`
- Post ID should be URL-friendly (lowercase, hyphens)
- Keep URLs concise but descriptive

### Content SEO
- Include target keywords naturally in title and content
- Use descriptive headings (H2, H3) for content structure  
- Add internal links to other relevant posts
- Optimize images with alt text

## Performance Considerations

### Content Loading
```typescript
// Content is loaded dynamically via import()
const contentLoader = () => import('./content.md?raw').then(m => m.default);
```

Benefits:
- **Code splitting**: Content not loaded until needed
- **Caching**: Browser can cache content separately
- **Performance**: Faster initial page load

### Image Optimization
- Use appropriate image formats (WebP when possible)
- Implement lazy loading for non-critical images
- Provide responsive image sizes
- Compress images without quality loss

## Development Workflow

### Adding New Posts
1. **Plan content**: Outline key points and structure
2. **Create metadata**: Set up post metadata file
3. **Write content**: Draft in markdown format  
4. **Add images**: Create and optimize visual assets
5. **Update index**: Add to blog system
6. **Test locally**: Verify everything works
7. **Review**: Check formatting, links, and SEO

### Content Updates
1. **Edit content file**: Update markdown content
2. **Test changes**: Verify in development
3. **Deploy**: Changes deploy automatically

### Image Management
```bash
# Recommended image processing workflow
1. Create/edit images at 2x size for retina displays
2. Compress using tools like TinyPNG or ImageOptim
3. Convert to WebP format when possible
4. Test loading performance
```

## Troubleshooting

### Common Issues

#### Post Not Appearing
- Check post is imported in `index.ts`
- Verify post ID matches filename
- Ensure post is added to `blogPosts` array

#### Images Not Loading
- Verify image path starts with `/images/blog/`
- Check file exists in `public/images/blog/post-id/`
- Confirm filename matches exactly (case-sensitive)

#### Content Not Loading
- Check content loader function exists
- Verify switch statement includes post ID case
- Confirm markdown file exists and is valid

#### Build Errors
```bash
# Common TypeScript errors
- Missing imports in index.ts
- Invalid BlogPost interface properties
- Incorrect file paths
```

## Analytics and Insights

### Tracking Blog Performance
Consider implementing:
- Page view tracking
- Reading time analytics
- Social sharing metrics
- Comment engagement (if comments added)

### Content Strategy
- Monitor which categories perform best
- Track most shared/viewed posts
- Analyze user engagement patterns
- A/B test different content formats

## Future Enhancements

### Potential Features
- **Search functionality**: Full-text search across posts
- **Tag system**: More granular categorization
- **Related posts**: Automatic post recommendations
- **Comments**: Reader engagement system
- **Newsletter**: Email subscription integration
- **RSS feed**: Syndication support

### Technical Improvements
- **Automated image optimization**: Build-time image processing
- **Content validation**: Automated checks for required fields
- **Preview system**: Draft preview before publishing
- **Content scheduling**: Publish posts at specific times

## Related Documentation
- [Component Development](./component-development.md)
- [Asset Management](./asset-management.md)
- [SEO Guidelines](./performance.md)
- [Contributing Guidelines](./contributing.md)