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
  // Update only page-specific meta tags
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