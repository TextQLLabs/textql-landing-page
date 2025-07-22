import React, { useState } from 'react';
import { IntegrationCard } from '../../integrations/IntegrationCard';
import { Search } from 'lucide-react';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeBackground, themeText, themeTextSecondary } from '../../../utils/theme-utils';
import { Section } from '../../ui/Section';

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
  count?: number;
};

export function AllIntegrationsSection() {
  const theme = useComponentTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
      href: '/integrations/databricks',
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
      name: 'SAP S/4 HANA',
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
    
    // BI Tools
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
      name: 'QuickSight',
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
    
    // Semantic Layers
    {
      name: 'dbt MetricFlow',
      description: 'Connect TextQL with dbt MetricFlow for consistent metric definitions.',
      category: 'Semantic Layer',
      logoSrc: '/images/integrations/all/dbt.png',
      href: 'https://docs.getdbt.com/docs/build/about-metricflow',
      isComingSoon: false
    },
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
    
    // Data Catalog
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
    {
      name: 'Airflow',
      description: 'Integrate TextQL with Apache Airflow for data pipeline orchestration.',
      category: 'Framework',
      logoSrc: '/images/integrations/all/airflow.png',
      isComingSoon: false
    },
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
      id: 'All',
      name: 'All Integrations',
    },
    {
      id: 'Database',
      name: 'Databases',
    },
    {
      id: 'BI Tool',
      name: 'BI Tools',
    },
    {
      id: 'Semantic Layer',
      name: 'Semantic Layers',
    },
    {
      id: 'Data Catalog',
      name: 'Data Catalogs',
    },
    {
      id: 'Business Context',
      name: 'Business Context',
    },
    {
      id: 'Framework',
      name: 'Frameworks',
    }
  ];

  // Add counts to categories
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'All' 
      ? allIntegrations.length 
      : allIntegrations.filter(i => i.category === cat.id).length
  }));
  
  const filteredIntegrations = allIntegrations.filter(integration => {
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section
      variant="wide"
      padding="md"
      background={theme === 'light' ? 'secondary' : 'primary'}
    >
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme === 'light' ? 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400' : 'bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500'}`}
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categoriesWithCounts.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? (theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900')
                      : (theme === 'light' ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600')
                  }`}
                >
                  {category.name}
                  {category.count !== undefined && (
                    <span className="ml-2 text-xs opacity-70">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            Showing {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
        
        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIntegrations.map((integration, index) => (
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
        
        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>No integrations found matching your search.</p>
          </div>
        )}
    </Section>
  );
}