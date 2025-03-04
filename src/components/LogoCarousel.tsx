import { Carousel } from './ui';

const logos = [
  { src: '/images/logos/snowflake-white.png', alt: 'Snowflake' },
  { src: '/images/logos/databricks-nobg.png', alt: 'Databricks' },
  { src: '/images/logos/powerbi-white.png', alt: 'Power BI' },
  { src: '/images/logos/Tableau White.png', alt: 'Tableau' },
  { src: '/images/logos/dbt-nobg.png', alt: 'dbt' },
  { src: '/images/logos/salesforce-white.png', alt: 'Salesforce' },
  { src: '/images/logos/azure-white.png', alt: 'Azure' },
  { src: '/images/logos/aws-white.png', alt: 'AWS' },
  { src: '/images/logos/gcp-white.png', alt: 'Google Cloud' },
  { src: '/images/logos/looker-white.png', alt: 'Looker' },
  { src: '/images/logos/teams-white.png', alt: 'Teams' },
  { src: '/images/logos/slack-white.png', alt: 'Slack' },
  { src: '/images/logos/alation-white.png', alt: 'Alation' },
  { src: '/images/logos/sap-white.png', alt: 'SAP' },
  { src: '/images/logos/oracle.png', alt: 'Oracle' },
  { src: '/images/logos/reshift-nobg.png', alt: 'Redshift' }
].map(logo => ({
  ...logo,
  src: logo.src.startsWith('/') ? logo.src : `/${logo.src}`
}));

export default function LogoCarousel() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-sm font-medium text-[#B8D8D0]/80 mb-4">
          Ana finds insights in your existing data stack
        </p>
        <Carousel items={logos} />
      </div>
    </div>
  );
}