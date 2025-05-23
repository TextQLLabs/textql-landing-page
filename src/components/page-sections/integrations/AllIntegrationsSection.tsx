import React, { useState } from 'react';
import { IntegrationCard } from '../../integrations/IntegrationCard';
import { ChevronRight, Search } from 'lucide-react';

type IntegrationType = {
  name: string;
  description: string;
  category: 'Data Warehouse' | 'BI Tool' | 'Communication';
  logoSrc: string;
  href?: string;
  isComingSoon: boolean;
};

type CategoryInfo = {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  icon?: string;
};

export function AllIntegrationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Integrations');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allIntegrations: IntegrationType[] = [
    // Data Warehouses
    {
      name: 'Snowflake',
      description: 'Seamlessly integrate TextQL with your Snowflake data warehouse for enhanced analytics.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/snowflake.png',
      href: '/integrations/snowflake-mcp',
      isComingSoon: false
    },
    {
      name: 'Tableau',
      description: 'Connect TextQL with your Tableau dashboards for AI-powered analysis and insights.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/tableau.png',
      href: '/integrations/tableau-mcp',
      isComingSoon: false
    },
    {
      name: 'Redshift',
      description: 'Connect TextQL to Amazon Redshift for intelligent analysis of your cloud data warehouse.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/redshift.png',
      isComingSoon: false
    },
    {
      name: 'BigQuery',
      description: 'Integrate with Google BigQuery to leverage TextQL AI capabilities on your cloud data.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/bigquery.svg',
      isComingSoon: false
    },
    {
      name: 'Azure',
      description: 'Connect TextQL with Azure data services for comprehensive AI-driven analytics.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/azure.png',
      isComingSoon: false
    },
    {
      name: 'Aurora',
      description: 'Connect TextQL with Amazon RDS for intelligent database analysis.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/AWS RDS.svg',
      isComingSoon: false
    },
    {
      name: 'Databricks',
      description: 'Leverage TextQL AI capabilities with your Databricks data platform.',
      category: 'Data Warehouse',
      logoSrc: '/images/integrations/all/databricks.png',
      isComingSoon: false
    },
    
    // BI Tool
    {
      name: 'Superset',
      description: 'Integrate with Apache Superset to add AI analytics to your data visualization platform.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/superset.png',
      isComingSoon: false
    },
    {
      name: 'Metabase',
      description: 'Connect TextQL to Metabase for intelligent insights from your business data.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/metabase.png',
      isComingSoon: false
    },
    
    // Communication
    {
      name: 'Email',
      description: 'Receive AI-generated insights and reports directly to your inbox.',
      category: 'Communication',
      logoSrc: '/images/integrations/all/email.png',
      isComingSoon: false
    },
    {
      name: 'Slack',
      description: 'Get TextQL insights delivered to your Slack channels for team collaboration.',
      category: 'Communication',
      logoSrc: '/images/integrations/all/slack.webp',
      isComingSoon: false
    },
    {
      name: 'Teams',
      description: 'Integrate TextQL with Microsoft Teams for seamless team communication of insights.',
      category: 'Communication',
      logoSrc: '/images/integrations/all/teams.png',
      isComingSoon: false
    }
  ];

  const categories: CategoryInfo[] = [
    {
      id: 'All Integrations',
      name: 'All Integrations',
      title: 'All integrations',
      subtitle: 'Connect TextQL with your favorite tools and platforms'
    },
    {
      id: 'Data Warehouse',
      name: 'Data Warehouse',
      title: 'Data Warehouse',
      subtitle: 'Connect your data storage and warehousing solutions'
    },
    {
      id: 'BI Tool',
      name: 'BI Tool',
      title: 'Business Intelligence',
      subtitle: 'Enhance your analytics and visualization platforms'
    },
    {
      id: 'Communication',
      name: 'Communication',
      title: 'Communication',
      subtitle: 'Get insights delivered to your communication channels'
    }
  ];

  const quickLinks = [
    { name: 'Create free account', href: '/signup' },
    { name: 'Get a demo', href: '/demo' },
    { name: 'Intro to TextQL', href: '/intro' }
  ];
  
  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];
  
  const filteredIntegrations = selectedCategory === 'All Integrations'
    ? allIntegrations.filter(integration => 
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIntegrations.filter(integration => 
        integration.category === selectedCategory &&
        (integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <section className="py-20 bg-[#F5F9F8]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 shadow-sm">
              {/* Category Navigation */}
              <div className="mb-8">
                <h3 className="text-sm ml-2font-medium text-[#0A1F1C]/60 mb-4 uppercase tracking-wide">Unified APIs</h3>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left transition-all ${
                        selectedCategory === category.id
                          ? 'bg-[#0A1F1C]/5 text-[#0A1F1C] font-medium'
                          : 'text-[#0A1F1C]/70 hover:bg-[#0A1F1C]/5'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-sm">{category.name}</span>
                      </span>
                      {selectedCategory === category.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-medium text-[#0A1F1C]/60 mb-4 uppercase tracking-wide">Quick links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-[#0A1F1C]/70 hover:text-[#0A1F1C] transition-colors group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-4xl font-extralight text-[#0A1F1C] mb-2 ml-5">
                    {currentCategory.title}
                  </h2>
                  <p className="text-[#0A1F1C]/60 text-lg ml-5">
                    {currentCategory.subtitle}
                  </p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md ml-5">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0A1F1C]/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#0A1F1C]/10 focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]/50 focus:border-[#B8D8D0] transition-all"
                />
              </div>
            </div>
            
            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration, index) => (
                <div key={index} className="transform scale-90">
                  <IntegrationCard
                    name={integration.name}
                    description={integration.description}
                    category={integration.category}
                    logoSrc={integration.logoSrc}
                    href={integration.href}
                    isComingSoon={integration.isComingSoon}
                  />
                </div>
              ))}
            </div>
            
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#0A1F1C]/60">No integrations found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 