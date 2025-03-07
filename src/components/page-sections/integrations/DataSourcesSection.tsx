import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

interface AppJourneyStepProps {
  title: string;
  image: string;
  index: number;
}

function AppJourneyStep({ title, image, index }: AppJourneyStepProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col"
    >
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#2A3B35]/20 shadow-sm hover:shadow-lg transition-all">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-16 z-10" />
        <h3 className="absolute top-4 left-4 text-white font-medium z-20 flex items-center">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm mr-2">
            {index + 1}
          </span>
          {title}
        </h3>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="w-full h-full"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: (index * 0.2) + 0.2 }}
        className="text-[#4A665C] text-sm mt-3 text-center"
      >
        Step {index + 1}: {title}
      </motion.p>
    </motion.div>
  );
}

const appJourneySteps = [
  {
    title: 'Simple Setup',
    image: setupImage,
    description: 'Get started by adding your first connector'
  },
  {
    title: 'Automatic Sync',
    image: syncImage,
    description: 'Data syncs automatically in the background'
  },
  {
    title: 'Table Preview',
    image: previewImage,
    description: 'Preview and explore your connected data'
  },
  {
    title: 'Admin Controls',
    image: adminImage,
    description: 'Manage all your connectors in one place'
  }
];

export function DataSourcesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            Supported Connectors
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            Connector Management
          </h2>
          <p className="text-[#4A665C] mt-4">
            Setting up your data connectors is simple and straightforward
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {appJourneySteps.map((step, index) => (
            <AppJourneyStep
              key={step.title}
              title={step.title}
              image={step.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 