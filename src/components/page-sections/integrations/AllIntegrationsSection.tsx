import React, { useState } from 'react';
import { IntegrationCard } from '../../integrations/IntegrationCard';
import { ChevronRight, Search } from 'lucide-react';

type IntegrationType = {
  name: string;
  description: string;
  category: 'Database' | 'BI Tool' | 'Semantic Layer' | 'Data Catalog' | 'Business Context' | 'Framework';
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
    // Databases
    {
      name: 'Snowflake',
      description: 'Seamlessly integrate TextQL with your Snowflake data warehouse for enhanced analytics.',
      category: 'Database',
      logoSrc: '/images/integrations/all/snowflake.png',
      href: '/integrations/snowflake',
      isComingSoon: false
    },
    {
      name: 'Redshift',
      description: 'Connect TextQL to Amazon Redshift for intelligent analysis of your cloud data warehouse.',
      category: 'Database',
      logoSrc: '/images/integrations/all/redshift.png',
      href: 'https://aws.amazon.com/redshift/',
      isComingSoon: false
    },
    {
      name: 'BigQuery',
      description: 'Integrate with Google BigQuery to leverage TextQL AI capabilities on your cloud data.',
      category: 'Database',
      logoSrc: '/images/integrations/all/bigquery.svg',
      href: 'https://cloud.google.com/bigquery',
      isComingSoon: false
    },
    {
      name: 'Databricks',
      description: 'Leverage TextQL AI capabilities with your Databricks data platform.',
      category: 'Database',
      logoSrc: '/images/integrations/all/databricks.png',
      href: 'https://databricks.com/',
      isComingSoon: false
    },
    {
      name: 'MotherDuck',
      description: 'Connect TextQL with MotherDuck for serverless analytics on DuckDB.',
      category: 'Database',
      logoSrc: '/images/integrations/all/motherduck.png',
      href: 'https://motherduck.com/',
      isComingSoon: false
    },
    {
      name: 'SAP S/4 Hana',
      description: 'Integrate TextQL with SAP HANA for real-time analytics on enterprise data.',
      category: 'Database',
      logoSrc: '/images/integrations/all/saphana.png',
      isComingSoon: false
    },
    {
      name: 'Salesforce',
      description: 'Analyze your Salesforce data with TextQL AI-powered insights.',
      category: 'Database',
      logoSrc: '/images/integrations/all/salesforce.png',
      href: 'https://www.salesforce.com/',
      isComingSoon: false
    },
    {
      name: 'Azure Synapse',
      description: 'Connect TextQL with Azure Synapse Analytics for comprehensive data analysis.',
      category: 'Database',
      logoSrc: '/images/integrations/all/azure-synapse.png',
      href: 'https://azure.microsoft.com/en-us/products/synapse-analytics',
      isComingSoon: false
    },
    {
      name: 'IBM DB2',
      description: 'Integrate TextQL with IBM DB2 for enterprise-grade data analytics.',
      category: 'Database',
      logoSrc: '/images/integrations/all/ibm-db2.png',
      href: 'https://www.ibm.com/products/db2',
      isComingSoon: false
    },
    {
      name: 'Firebolt',
      description: 'Connect TextQL with Firebolt for ultra-fast analytics on big data.',
      category: 'Database',
      logoSrc: '/images/integrations/all/firebolt.svg',
      href: 'https://www.firebolt.io/',
      isComingSoon: false
    },
    {
      name: 'Oracle',
      description: 'Integrate TextQL with Oracle Database for powerful enterprise analytics.',
      category: 'Database',
      logoSrc: '/images/integrations/all/oracle png.png',
      href: 'https://www.oracle.com/database/',
      isComingSoon: false
    },
    
    // BI Tool
    {
      name: 'Tableau',
      description: 'Connect TextQL with your Tableau dashboards for AI-powered analysis and insights.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/tableau.png',
      href: '/integrations/tableau',
      isComingSoon: false
    },
    {
      name: 'Looker',
      description: 'Enhance your Looker analytics with TextQL AI capabilities.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/looker.png',
      href: 'https://cloud.google.com/looker',
      isComingSoon: false
    },
    {
      name: 'Mode',
      description: 'Integrate TextQL with Mode Analytics for collaborative data analysis.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/mode.png',
      href: 'https://mode.com/',
      isComingSoon: false
    },
    {
      name: 'Hex',
      description: 'Connect TextQL with Hex for modern analytics and data science workflows.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/hex.png',
      href: 'https://hex.tech/',
      isComingSoon: false
    },
    {
      name: 'Superset',
      description: 'Integrate with Apache Superset to add AI analytics to your data visualization platform.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/superset.png',
      href: 'https://superset.apache.org/',
      isComingSoon: false
    },
    {
      name: 'Sisense',
      description: 'Enhance Sisense dashboards with TextQL AI-driven insights.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/sisense.png',
      href: 'https://www.sisense.com/',
      isComingSoon: false
    },
    {
      name: 'SAP Business One',
      description: 'Connect TextQL with SAP Business One for comprehensive business analytics.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/sap-business-one.png',
      href: 'https://www.sap.com/products/erp/business-one.html',
      isComingSoon: false
    },
    {
      name: 'Quicksight',
      description: 'Integrate TextQL with Amazon QuickSight for cloud-native business intelligence.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/Quicksight.png',
      href: 'https://aws.amazon.com/quicksight/',
      isComingSoon: false
    },
    {
      name: 'Power BI',
      description: 'Connect TextQL with Microsoft Power BI for enhanced business analytics.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/PowerBI.png',
      href: 'https://powerbi.microsoft.com/',
      isComingSoon: false
    },
    {
      name: 'IBM Cognos',
      description: 'Integrate TextQL with IBM Cognos Analytics for enterprise reporting.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/IBM Cognos.png',
      href: 'https://www.ibm.com/products/cognos-analytics',
      isComingSoon: false
    },
    {
      name: 'Sigma',
      description: 'Connect TextQL with Sigma Computing for cloud-native analytics.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/Sigma.png',
      href: 'https://www.sigmacomputing.com/',
      isComingSoon: false
    },
     {
      name: 'Metabase',
      description: 'Connect TextQL to Metabase for intelligent insights from your business data.',
      category: 'BI Tool',
      logoSrc: '/images/integrations/all/metabase.png',
      href: 'https://www.metabase.com/',
      isComingSoon: false
    },
    {
      name: 'dbt MetricFlow',
      description: 'Connect TextQL with dbt MetricFlow for consistent metric definitions.',
      category: 'Semantic Layer',
      logoSrc: '/images/integrations/all/dbt.png',
      href: 'https://docs.getdbt.com/docs/build/about-metricflow',
      isComingSoon: false
    },
    
    // Semantic Layers
    {
      name: 'Cube',
      description: 'Integrate TextQL with Cube for semantic layer analytics and metrics.',
      category: 'Semantic Layer',
      logoSrc: '/images/integrations/all/Cube.png',
      href: 'https://cube.dev/',
      isComingSoon: false
    },
    {
      name: 'LookML',
      description: 'Integrate TextQL with LookML for Looker semantic modeling.',
      category: 'Semantic Layer',
      logoSrc: '/images/integrations/all/lookML.png',
      href: 'https://cloud.google.com/looker/docs/what-is-lookml',
      isComingSoon: false
    },
    // {
    //   name: 'Lightdash',
    //   description: 'Connect TextQL with Lightdash for open-source BI and semantic modeling.',
    //   category: 'Semantic Layer',
    //   logoSrc: '/images/integrations/all/Lightdash.png',
    //   isComingSoon: false
    // },
    
    // Data Catalog
    // {
    //   name: 'Airflow',
    //   description: 'Connect TextQL with Apache Airflow for workflow orchestration and data lineage.',
    //   category: 'Data Catalog',
    //   logoSrc: '/images/integrations/all/airflow.png',
    //   isComingSoon: false
    // },
    {
      name: 'DataHub',
      description: 'Integrate TextQL with DataHub for modern data catalog and discovery.',
      category: 'Data Catalog',
      logoSrc: '/images/integrations/all/DataHub.png',
      href: 'https://datahubproject.io/',
      isComingSoon: false
    },
    {
      name: 'Alation',
      description: 'Connect TextQL with Alation for enterprise data catalog and governance.',
      category: 'Data Catalog',
      logoSrc: '/images/integrations/all/alation.png',
      href: 'https://www.alation.com/',
      isComingSoon: false
    },
    {
      name: 'Collibra',
      description: 'Integrate TextQL with Collibra for data governance and catalog management.',
      category: 'Data Catalog',
      logoSrc: '/images/integrations/all/collibra.png',
      href: 'https://www.collibra.com/',
      isComingSoon: false
    },
    {
      name: 'Atlan',
      description: 'Connect TextQL with Atlan for active metadata and data discovery.',
      category: 'Data Catalog',
      logoSrc: '/images/integrations/all/atlan.png',
      href: 'https://atlan.com/',
      isComingSoon: false
    },
    {
      name: 'dbt',
      description: 'Integrate TextQL with dbt for data transformation and catalog management.',
      category: 'Data Catalog',
      logoSrc: '/images/integrations/all/dbt.png',
      href: 'https://www.getdbt.com/',
      isComingSoon: false
    },
    // {
    //   name: 'Select Star',
    //   description: 'Integrate TextQL with Select Star for automated data discovery.',
    //   category: 'Data Catalog',
    //   logoSrc: '/images/integrations/all/Select Star.png',
    //   isComingSoon: false
    // },
    // {
    //   name: 'Secoda',
    //   description: 'Connect TextQL with Secoda for data discovery and documentation.',
    //   category: 'Data Catalog',
    //   logoSrc: '/images/integrations/all/Secoda.png',
    //   isComingSoon: false
    // },
    // {
    //   name: 'Informatica',
    //   description: 'Integrate TextQL with Informatica for enterprise data management.',
    //   category: 'Data Catalog',
    //   logoSrc: '/images/integrations/all/Informatica.png',
    //   isComingSoon: false
    // },
    
    // Business Context
    {
      name: 'Google Sheets',
      description: 'Analyze your Google Sheets data with TextQL AI capabilities.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/google sheets.png',
      href: 'https://workspace.google.com/products/sheets',
      isComingSoon: false
    },
    {
      name: 'Excel',
      description: 'Analyze Excel spreadsheets and data with TextQL AI-powered insights.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/excel.png',
      href: 'https://www.microsoft.com/en-us/microsoft-365/excel',
      isComingSoon: false
    },
    {
      name: 'Jupyter Notebook',
      description: 'Integrate TextQL with Jupyter Notebook for interactive data analysis and AI insights.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/jupyter.png',
      href: 'https://jupyter.org/',
      isComingSoon: false
    },
    {
      name: 'Google Docs',
      description: 'Extract insights from Google Docs content using TextQL AI.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/google-docs.png',
      href: 'https://workspace.google.com/products/docs',
      isComingSoon: false
    },
    {
      name: 'Google Drive',
      description: 'Access and analyze documents from Google Drive with TextQL.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/google drive.png',
      href: 'https://workspace.google.com/products/drive',
      isComingSoon: false
    },
    {
      name: 'Microsoft Office',
      description: 'Integrate TextQL with Microsoft Office for document and spreadsheet analysis.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/microsoft-office.png',
      href: 'https://www.microsoft.com/en-us/microsoft-365',
      isComingSoon: false
    },
    {
      name: 'Notion',
      description: 'Connect TextQL with Notion for knowledge base and document analysis.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/notion.png',
      href: 'https://www.notion.com',
      isComingSoon: false
    },
    {
      name: 'Confluence',
      description: 'Integrate TextQL with Confluence for team documentation analysis.',
      category: 'Business Context',
      logoSrc: '/images/integrations/all/confluence.png',
      href: 'https://www.atlassian.com/software/confluence',
      isComingSoon: false
    },
    
    // Framework
    {
      name: 'dbt',
      description: 'Leverage TextQL with dbt for data transformation and analytics engineering.',
      category: 'Framework',
      logoSrc: '/images/integrations/all/dbt.png',
      href: 'https://www.getdbt.com/',
      isComingSoon: false
    },
    // {
    //   name: 'Airflow',
    //   description: 'Integrate TextQL with Apache Airflow for data pipeline orchestration.',
    //   category: 'Framework',
    //   logoSrc: '/images/integrations/all/airflow.png',
    //   isComingSoon: false
    // },
    {
      name: 'SQLMesh',
      description: 'Connect TextQL with SQLMesh for DataOps and data transformation.',
      category: 'Framework',
      logoSrc: '/images/integrations/all/sql-mesh.png',
      href: 'https://sqlmesh.com/',
      isComingSoon: false
    }
  ];

  const categories: CategoryInfo[] = [
    {
      id: 'All Integrations',
      name: 'All Integrations',
      title: 'All integrations',
      subtitle: 'Plug in TextQL anywhere data lives in your stack'
    },
    {
      id: 'Database',
      name: 'Database',
      title: 'Database',
      subtitle: 'Connect your data storage and warehousing solutions'
    },
    {
      id: 'BI Tool',
      name: 'BI Tool',
      title: 'BI Tool',
      subtitle: 'Enhance your analytics and visualization platforms'
    },
    {
      id: 'Semantic Layer',
      name: 'Semantic Layer',
      title: 'Semantic Layers',
      subtitle: 'Integrate with semantic modeling and metrics platforms'
    },
    {
      id: 'Data Catalog',
      name: 'Data Catalog',
      title: 'Data Catalog',
      subtitle: 'Connect with data discovery and governance tools'
    },
    {
      id: 'Business Context',
      name: 'Business Context',
      title: 'Business Context',
      subtitle: 'Analyze documents and knowledge management systems'
    },
    {
      id: 'Framework',
      name: 'Framework',
      title: 'Orchestration & Framework',
      subtitle: 'Integrate with data orchestration and framework tools'
    }
  ];

  const quickLinks = [
    { name: 'Get a demo', href: '/demo' },
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 shadow-sm">
              {/* Category Navigation */}
              <div className="mb-8">
                <h3 className="text-sm ml-2font-medium text-[#0A1F1C]/60 mb-4 uppercase tracking-wide">Categories</h3>
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
                <div className="space-y-3 ml-2">
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
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#0A1F1C]/10 text-[#0A1F1C] placeholder:text-[#0A1F1C]/40 focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]/50 focus:border-[#B8D8D0] transition-all"
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