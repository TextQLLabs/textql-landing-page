import React from 'react';

// Import all logos
import secodaLogo from '/images/logos/miscconnectors/secoda.png';
import censusLogo from '/images/logos/miscconnectors/census.png';
import datafoldLogo from '/images/logos/miscconnectors/datafold.png';
import fabricLogo from '/images/logos/miscconnectors/fabric.png';
import collibraLogo from '/images/logos/miscconnectors/collibra.png';
import acryldataLogo from '/images/logos/miscconnectors/acryldata.png';
import heronLogo from '/images/logos/miscconnectors/heronlogo.png';
import starburstLogo from '/images/logos/miscconnectors/starburst.png';
import powerBILogo from '/images/logos/miscconnectors/New_Power_BI_Logo.svg.png';

const additionalConnectors = [
  { 
    name: 'Secoda', 
    logo: secodaLogo,
    url: 'https://www.secoda.co/'
  },
  { 
    name: 'Census', 
    logo: censusLogo,
    url: 'https://www.getcensus.com/'
  },
  { 
    name: 'Datafold', 
    logo: datafoldLogo,
    url: 'https://www.datafold.com/'
  },
  { 
    name: 'Fabric', 
    logo: fabricLogo,
    url: 'https://fabric.microsoft.com/'
  },
  { 
    name: 'Collibra', 
    logo: collibraLogo,
    url: 'https://www.collibra.com/'
  },
  { 
    name: 'Acryl Data', 
    logo: acryldataLogo,
    url: 'https://www.acryldata.io/'
  },
  {
    name: 'Heron',
    logo: heronLogo,
    url: 'https://herondata.io/'
  },
  {
    name: 'Starburst',
    logo: starburstLogo,
    url: 'https://www.starburst.io/'
  },
  {
    name: 'Power BI',
    logo: powerBILogo,
    url: 'https://powerbi.microsoft.com/'
  }
];

interface ConnectorLogoProps {
  name: string;
  logo: string;
  url: string;
}

function ConnectorLogo({ name, logo, url }: ConnectorLogoProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-white p-4 shadow-sm hover:shadow-md transition-all border border-[#2A3B35]/10 h-24 flex items-center justify-center group cursor-pointer"
      aria-label={`Visit ${name} website`}
    >
      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="max-h-16 max-w-full object-contain group-hover:scale-110 transition-transform"
      />
    </a>
  );
}

export function AdditionalConnectorsSection() {
  return (
    <section className="py-12 bg-[#F9FCFB] border-t border-[#2A3B35]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            More Integrations
          </h2>
          <p className="text-[#4A665C] mt-3 text-lg">
            TextQL seamlessly connects with additional data platforms and tools
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {additionalConnectors.map((connector, index) => (
            <ConnectorLogo
              key={index}
              name={connector.name}
              logo={connector.logo}
              url={connector.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 