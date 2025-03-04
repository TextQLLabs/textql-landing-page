import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

export function SEO({
  title = 'Find Insights With AI | TextQL',
  description = 'Deploy AI agents to find trends across all of your data that makes you money',
  canonical = 'https://textql.com',
  ogImage = 'https://textql.com/social-preview.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}: SEOProps) {
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Favicon and app icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#0A1F1C" />
      <meta name="theme-color" content="#0A1F1C" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="TextQL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@textql" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Indexing control */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured data for rich results */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TextQL',
          url: 'https://textql.com',
          logo: 'https://textql.com/images/logo.png',
          sameAs: [
            'https://twitter.com/textql',
            'https://linkedin.com/company/textql'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'ethan@textql.com',
            contactType: 'customer service'
          }
        })}
      </script>
    </Helmet>
  );
}