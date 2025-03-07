import { ExternalLink } from 'lucide-react';

// Import custom logos directly
import tableauLogo from '/images/logos/custom/Tableau-Logo.png';
import redshiftLogo from '/images/logos/custom/redshift-logo.png';
import snowflakeLogo from '/images/logos/custom/Snowflake_Logo.png';
import bigqueryLogo from '/images/logos/custom/Google-Cloud-Logo.png';

// Import app journey images
import setupImage from '/images/appjourneys/addconnector.png';
import syncImage from '/images/appjourneys/sync connector.png';
import previewImage from '/images/appjourneys/viewdata.png';
import adminImage from '/images/appjourneys/listconnectors.png';

interface ConnectorCardProps {
  description: string;
  icon: string;
  learnMoreLink?: string;
  zoomFactor?: number;
}

function ConnectorCard({ description, icon, learnMoreLink, zoomFactor = 1 }: ConnectorCardProps) {
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
      <div className="flex-1 p-5 flex flex-col">
        <p className="text-[#4A665C] text-sm flex-grow mb-4">
          {description}
        </p>
        
        {learnMoreLink && (
          <div className="mt-auto pt-2">
            <a 
              href={learnMoreLink} 
              className="inline-flex items-center text-[#2A3B35] hover:text-[#4A665C] transition-colors text-sm"
            >
              <span className="mr-2">Learn more</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const supportedConnectors = [
  {
    description: 'Connect TextQL with your Tableau server to chat with your dashboards and visualizations.',
    icon: tableauLogo,
    learnMoreLink: '#',
    zoomFactor: 1.2
  },
  {
    description: 'Connect TextQL to your Amazon Redshift database for natural language querying of your data warehouse.',
    icon: redshiftLogo,
    learnMoreLink: '#'
  },
  {
    description: 'Integrate TextQL with your Snowflake instance to query your data using natural language.',
    icon: snowflakeLogo,
    learnMoreLink: '#'
  },
  {
    description: 'Connect TextQL to your Google BigQuery datasets for seamless natural language analytics.',
    icon: bigqueryLogo,
    learnMoreLink: '#',
    zoomFactor: 1.2
  }
];

export const appJourneySteps = [
  {
    title: 'Simple Setup',
    image: setupImage,
    description: 'Get started quickly by connecting your first data source to TextQL.'
  },
  {
    title: 'Automatic Sync',
    image: syncImage,
    description: 'Data syncs automatically in the background, keeping your insights up to date.'
  },
  {
    title: 'Table Preview',
    image: previewImage,
    description: 'Preview tables and assets previously connected to TextQL before running complex queries.'
  },
  {
    title: 'Admin Controls',
    image: adminImage,
    description: 'Manage all your data connections in one centralized dashboard.'
  }
];

export function DataSourcesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            Supported Connectors
          </h2>
        </div> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportedConnectors.map((connector) => (
            <ConnectorCard
              key={connector.description}
              description={connector.description}
              icon={connector.icon}
              learnMoreLink={connector.learnMoreLink}
              zoomFactor={connector.zoomFactor}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 