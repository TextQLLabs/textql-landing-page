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
  title = 'Find Insights With AI | TextQL',
  description = 'Deploy AI agents to find trends across all of your data that makes you money',
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
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
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