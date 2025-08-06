import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

/**
 * The SEO component adds page-specific metadata
 * Note: Basic meta tags are already in root.tsx
 * This component only overrides those defaults for specific pages
 */
export function SEO({
  title,
  description = "TextQL helps enterprises discover valuable insights with AI agents that analyze all your data sources to identify profit-driving trends and opportunities",
  canonical = 'https://textql.com',
  ogImage = 'https://textql.com/social-preview.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}: SEOProps) {
  // Update meta tags dynamically
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta tags by selector
    const updateMetaTag = (selector: string, content: string) => {
      let metaTag = document.querySelector(selector);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        // Create meta tag if it doesn't exist
        metaTag = document.createElement('meta');
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) metaTag.setAttribute('property', property);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    if (title) {
      updateMetaTag('meta[property="og:title"]', title);
      updateMetaTag('meta[name="twitter:title"]', title);
    }

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
    updateMetaTag('meta[name="twitter:card"]', twitterCard);
    updateMetaTag('meta[property="og:type"]', ogType);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonical);
      document.head.appendChild(canonicalLink);
    }
  }, [title, description, canonical, ogImage, ogType, twitterCard]);

  // Return static meta tags as fallback (but useEffect above will override them)
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonical} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      {/* Open Graph and Twitter image tags */}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content={twitterCard} />
      <meta property="og:type" content={ogType} />

      {/* Indexing control */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Only add page-specific JSON-LD if needed */}
      {ogType === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': title,
            'description': description,
            'image': ogImage,
            'publisher': {
              '@type': 'Organization',
              'name': 'TextQL',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://textql.com/images/logo.png'
              }
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': canonical
            }
          })}
        </script>
      )}
    </>
  );
}