import React from 'react';
import { IntegrationCard } from '../../integrations/IntegrationCard';

export function PopularIntegrationsSection() {
  const popularIntegrations = [
    {
      name: 'Snowflake MCP',
      description: 'Seamlessly integrate TextQL with your Snowflake data warehouse for enhanced analytics.',
      category: 'Database',
      logoSrc: '/images/integrations/all/snowflake.png',
      href: '/integrations/snowflake',
      isComingSoon: false
    },
    {
        name: 'Databricks MCP',
        description: 'Leverage TextQL AI capabilities with your Databricks data platform.',
        category: 'Database',
        logoSrc: '/images/integrations/all/databricks.png',
        href: '/integrations/databricks',
        isComingSoon: false
      },
    {
      name: 'Tableau MCP',
      description: 'Connect TextQL with your Tableau dashboards for AI-powered analysis and insights.',
      category: 'Business Intelligence',
      logoSrc: '/images/integrations/all/tableau.png',
      href: '/integrations/tableau',
      isComingSoon: false
    },
  ];

  return (
    <section className="mb-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pb-20">
        <h2 className="text-2xl lg:text-4xl font-extralight mb-6 lg:mb-12 text-[#B8D8D0]">Popular integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularIntegrations.map((integration, index) => (
            <IntegrationCard
              key={index}
              name={integration.name}
              description={integration.description}
              category={integration.category}
              logoSrc={integration.logoSrc}
              href={integration.href}
              isComingSoon={integration.isComingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 