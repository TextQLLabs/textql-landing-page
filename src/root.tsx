import React from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import './index.css';

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ background: '#0A1F1C', overscrollBehavior: 'none' }}>
      <head>
        <meta charSet="UTF-8" />
        
        {/* Essential meta tags for SEO - these appear in the pre-rendered HTML */}
        <meta name="description" content="TextQL helps enterprises discover valuable insights with AI agents that analyze all your data sources to identify profit-driving trends and opportunities" />
        <meta name="keywords" content="AI data analysis, business intelligence, enterprise data, data insights, ontology, AI agents" />
        <meta name="author" content="TextQL Inc." />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Find Insights With AI | TextQL" />
        <meta property="og:description" content="Deploy AI agents to find trends across all of your data that makes you money" />
        <meta property="og:url" content="https://textql.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://textql.com/social-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TextQL" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@textql" />
        <meta name="twitter:title" content="Find Insights With AI | TextQL" />
        <meta name="twitter:description" content="Deploy AI agents to find trends across all of your data that makes you money" />
        <meta name="twitter:image" content="https://textql.com/social-preview.png" />
        
        <title>Find Insights With AI | TextQL</title>
        
        <Meta />
        <Links />
        
        {/* Organization schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TextQL",
            "url": "https://textql.com",
            "logo": "https://textql.com/images/logo.png",
            "sameAs": [
              "https://twitter.com/textql",
              "https://linkedin.com/company/textql"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "ethan@textql.com",
              "contactType": "customer service"
            }
          }
        `}</script>
        
        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          html { background: #0A1F1C; }
          body { display: block !important; }
          #root { opacity: 1 !important; }
        `}} />
      </head>
      <body style={{ background: '#0A1F1C', margin: 0, overscrollBehavior: 'none' }}>
        <div id="root" style={{ opacity: 1 }}>
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />

        {/* Breadcrumb schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://textql.com"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Agents",
              "item": "https://textql.com/agents"
            }]
          }
        `}</script>
      </body>
    </html>
  );
}

// Root component using React Router's outlet
export default function Root() {
  return <Outlet />;
} 