import React from 'react';
import { IntegrationCard } from '../../integrations/IntegrationCard';

export function PopularIntegrationsSection() {
  const popularIntegrations = [
    {
        name: 'Snowflake MCP',
        description: 'Seamlessly integrate TextQL with your Snowflake data warehouse for enhanced analytics.',
        category: 'Data Warehouse',
        logoSrc: '/images/integrations/all/snowflake.png',
        href: '/integrations/snowflake-mcp',
        isComingSoon: false
      },
    {
      name: 'Tableau MCP',
      description: 'Connect TextQL with your Tableau dashboards for AI-powered analysis and insights.',
      category: 'BI Tools',
      logoSrc: '/images/integrations/all/tableau.png',
      href: '/integrations/tableau-mcp',
      isComingSoon: false
    },
    {
      name: 'Redshift',
      description: 'Connect TextQL to Amazon Redshift for intelligent analysis of your cloud data warehouse.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/redshift.png',
      href: '/integrations/redshift',
      isComingSoon: false
    }
  ];

  return (
    <section className="mb-4">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-extralight mb-12 text-[#B8D8D0]">Popular integrations</h2>
        
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