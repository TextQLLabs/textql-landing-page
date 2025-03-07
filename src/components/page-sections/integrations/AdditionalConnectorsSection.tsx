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
import databricksLogo from '/images/logos/miscconnectors/databricks.png';
import powerBILogo from '/images/logos/miscconnectors/New_Power_BI_Logo.svg.png';

const additionalConnectors = [
  { 
    name: 'Secoda', 
    logo: secodaLogo 
  },
  { 
    name: 'Census', 
    logo: censusLogo 
  },
  { 
    name: 'Datafold', 
    logo: datafoldLogo 
  },
  { 
    name: 'Fabric', 
    logo: fabricLogo 
  },
  { 
    name: 'Collibra', 
    logo: collibraLogo 
  },
  { 
    name: 'Acryl Data', 
    logo: acryldataLogo 
  },
  {
    name: 'Heron',
    logo: heronLogo
  },
  {
    name: 'Starburst',
    logo: starburstLogo
  },
  {
    name: 'Power BI',
    logo: powerBILogo
  },
  {
    name: 'Databricks',
    logo: databricksLogo
  }
];

interface ConnectorLogoProps {
  name: string;
  logo: string;
}

function ConnectorLogo({ name, logo }: ConnectorLogoProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-[#2A3B35]/10 h-24 flex items-center justify-center group cursor-pointer">
      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="max-h-16 max-w-full object-contain group-hover:scale-110 transition-transform"
      />
    </div>
  );
}

export function AdditionalConnectorsSection() {
  return (
    <section className="py-12 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* <div className="text-center mb-10">
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            All Integrations
          </h2>
          <p className="text-[#4A665C] mt-3 text-lg">
            TextQL seamlessly connects with additional data platforms and tools
          </p>
        </div> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {additionalConnectors.map((connector, index) => (
            <ConnectorLogo
              key={index}
              name={connector.name}
              logo={connector.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 