import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import custom logos directly
import tableauLogo from '/images/logos/custom/Tableau-Logo.png';
import redshiftLogo from '/images/logos/custom/redshift-logo.png';
import snowflakeLogo from '/images/logos/custom/Snowflake_Logo.png';
import bigqueryLogo from '/images/logos/custom/Google-Cloud-Logo.png';

interface ConnectorCardProps {
  description: string;
  icon: string;
  learnMoreLink?: string;
  internalLink?: string;
  zoomFactor?: number;
}

function ConnectorCard({ description, icon, learnMoreLink, internalLink, zoomFactor = 1 }: ConnectorCardProps) {
  return (
    <div className="bg-white border border-[#2A3B35]/20 hover:shadow-lg transition-all h-full flex flex-col">
      {/* Logo Container with Better Proportions */}
      <div className="h-[140px] flex items-center justify-center p-4 border-b border-[#2A3B35]/10">
        <div className="w-[180px] h-[80px] flex items-center justify-center">
          <img 
            src={icon} 
            alt="" 
            className="max-h-full max-w-full object-contain" 
            style={{ transform: `scale(${zoomFactor})` }} 
          />
        </div>
      </div>
      
      {/* Content with Description */}
      <div className="flex-1 p-5 flex flex-col items-center">
        <p className="text-[#4A665C] text-sm flex-grow mb-4 text-center">
          {description}
        </p>
        
        <div className="mt-auto pt-2 flex gap-4">
          {internalLink && (
            <Link 
              to={internalLink}
              className="inline-flex items-center text-[#2A3B35] hover:text-blue-600 transition-colors text-sm group"
            >
              <span className="mr-2 group-hover:underline">Learn more</span>
            </Link>
          )}
        
        {learnMoreLink && (
            <a 
              href={learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#2A3B35] hover:text-blue-600 transition-colors text-sm group"
            >
              <span className="mr-2 group-hover:underline">Documentation</span>
              <ExternalLink size={14} className="group-hover:text-blue-600" />
            </a>
          )}
          </div>
      </div>
    </div>
  );
}

const supportedConnectors = [
  {
    description: 'Ask questions directly to your Tableau dashboards and unlock insights from both visualizations and raw data.',
    icon: tableauLogo,
    learnMoreLink: 'https://docs.textql.com/core/datasources/business-intel/tableau-connector',
    internalLink: '/integrations/tableau-mcp',
    zoomFactor: 1.2
  },
  {
    description: 'Transform complex Redshift queries into simple questions. Get lightning-fast answers from your data warehouse.',
    icon: redshiftLogo,
    learnMoreLink: 'https://docs.textql.com/core/datasources/databases/redshift'
  },
  {
    description: 'Elastic scaling and secure data sharing with Snowflake. From raw data to insights in seconds.',
    icon: snowflakeLogo,
    learnMoreLink: 'https://docs.textql.com/core/datasources/databases/snowflake',
    internalLink: '/integrations/snowflake-mcp'
  },
  {
    description: 'Explore petabyte-scale BigQuery datasets effortlessly. Intelligence at scale. Powered by Ana.',
    icon: bigqueryLogo,
    learnMoreLink: 'https://docs.textql.com/core/datasources/databases/bigquery',
    zoomFactor: 1.2
  }
];

export function DataSourcesSection() {
  return (
    <section className="pt-16 pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportedConnectors.map((connector) => (
            <ConnectorCard
              key={connector.description}
              description={connector.description}
              icon={connector.icon}
              learnMoreLink={connector.learnMoreLink}
              internalLink={connector.internalLink}
              zoomFactor={connector.zoomFactor}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 