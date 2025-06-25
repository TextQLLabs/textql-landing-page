import React, { useState } from 'react';
import { Badge, DemoRequestForm, Carousel, MobileCarousel} from "../../ui";
import { WaveBackground } from "../../animations";
import { InsightsFeed } from "../../InsightsFeed/InsightsFeed";
import { DemoRequestButton } from "../../ui/Button/DemoRequestButton";
import { Sun, Moon } from 'lucide-react';


// const logos = [
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/88a86778-8d48-48a8-4404-a8dcde5c4600/public', alt: 'Redshift' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a216245-435b-4348-4b55-da402a698f00/public', alt: 'Snowflake' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/4dc2884d-6b94-49ab-1136-ab6fdc1d7c00/public', alt: 'Databricks' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a1285d4-97d4-4e98-b093-99300165cd00/public', alt: 'Power BI' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fba5956d-3ad3-492a-8943-4fa48d463e00/public', alt: 'Tableau' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ef3cd838-e421-4c6f-80d6-ff49d1c0ab00/public', alt: 'dbt' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d79a1e91-1cd4-436c-db77-0d71ca6b2c00/public', alt: 'Salesforce' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/5d2c46cb-6a30-42a8-8132-0de8d3b1f600/public', alt: 'Azure' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/2e390190-cd5c-4e49-4dd4-647551ac1b00/public', alt: 'AWS' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/16d6a59b-1326-4bc5-9814-9b1ba007df00/public', alt: 'Google Cloud' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fbf6cea7-3542-471d-6bb5-4a83ff53bc00/public', alt: 'Looker' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/71a636eb-eccd-4803-ee49-b73f5fa8d400/public', alt: 'Teams' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d3e749b8-22b1-4e2f-a5af-f464174f7700/public', alt: 'Slack' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ced403a9-d4a7-4605-2c2e-f074c3583500/public', alt: 'Alation' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ae190ee0-b1d2-4926-3533-60907a475500/public', alt: 'SAP' },
//   { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/0915f386-644d-40ee-e1c7-ff814a3f6b00/public', alt: 'Oracle' }
// ];

// Logo definitions with theme variants
const logoData = [
  { 
    dark: '/images/logos/reshift-nobg.png', 
    light: '/images/logos/reshift-nobg.png', // assuming this works for both
    alt: 'Redshift' 
  },
  { 
    dark: '/images/logos/snowflake-white.png', 
    light: '/images/logos/snowflake-white.png', // fallback to white for now
    alt: 'Snowflake' 
  },
  { 
    dark: '/images/logos/databricks-nobg.png', 
    light: '/images/logos/databricks-nobg.png',
    alt: 'Databricks' 
  },
  { 
    dark: '/images/logos/looker-white.png', 
    light: '/images/logos/looker-white.png',
    alt: 'Looker' 
  },
  { 
    dark: '/images/logos/powerbi-white.png', 
    light: '/images/logos/powerbi-white.png',
    alt: 'Power BI' 
  },
  { 
    dark: '/images/logos/Tableau White.png', 
    light: '/images/logos/Tableau White.png',
    alt: 'Tableau' 
  },
  { 
    dark: '/images/logos/dbt-nobg.png', 
    light: '/images/logos/dbt-nobg.png',
    alt: 'dbt' 
  },
  { 
    dark: '/images/logos/azure-white.png', 
    light: '/images/logos/azure-white.png',
    alt: 'Azure' 
  },
  { 
    dark: '/images/logos/aws-white.png', 
    light: '/images/logos/aws-white.png',
    alt: 'AWS' 
  },
  { 
    dark: '/images/logos/salesforce-white.png', 
    light: '/images/logos/salesforce-white.png',
    alt: 'Salesforce' 
  },
  { 
    dark: '/images/logos/gcp-white.png', 
    light: '/images/logos/gcp-white.png',
    alt: 'Google Cloud' 
  },
  { 
    dark: '/images/logos/teams-white.png', 
    light: '/images/logos/teams-white.png',
    alt: 'Teams' 
  },
  { 
    dark: '/images/logos/slack-white.png', 
    light: '/images/logos/slack-white.png',
    alt: 'Slack' 
  },
  { 
    dark: '/images/logos/alation-white.png', 
    light: '/images/logos/alation-white.png',
    alt: 'Alation' 
  },
  { 
    dark: '/images/logos/sap-white.png', 
    light: '/images/logos/sap-white.png',
    alt: 'SAP' 
  },
  { 
    dark: '/images/logos/oracle.png', 
    light: '/images/logos/oracle.png',
    alt: 'Oracle' 
  }
];

export function HomeHero() {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Add/remove body class for hero-scoped styling
  React.useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('hero-light-mode');
    } else {
      document.body.classList.remove('hero-light-mode');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('hero-light-mode');
    };
  }, [isLightMode]);

  // Theme-based styling
  const bgColor = isLightMode ? 'bg-[#F7F7F7]' : 'bg-black';
  const textPrimary = isLightMode ? 'text-[#2A3B35]' : 'text-white';
  const textSecondary = isLightMode ? 'text-[#4A665C]' : 'text-[#B8D8D0]';
  const accentColor = isLightMode ? '#2A3B35' : '#B8D8D0';
  const accentColorSecondary = isLightMode ? '#4A665C' : '#729E8C';
  const badgeBg = isLightMode ? 'bg-[#2A3B35]/10' : 'bg-[#B8D8D0]/10';
  const badgeBorder = isLightMode ? 'border-[#2A3B35]/20' : 'border-[#B8D8D0]/20';
  const badgeDot = isLightMode ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]';
  
  // Dynamic logos based on theme
  const logos = logoData.map(logo => ({
    src: isLightMode ? logo.light : logo.dark,
    alt: logo.alt
  }));
  
  return (
    <section className={`relative flex flex-col ${bgColor}`}>
    <div className="absolute inset-0 z-0 animate-fade-in animation-delay-400">
      <WaveBackground theme={isLightMode ? 'light' : 'dark'} />
    </div>
    
    {/* Theme Toggle Button - Only visible in development */}
    {import.meta.env.DEV && (
      <button
        onClick={toggleTheme}
        className={`fixed top-20 right-6 z-50 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          isLightMode 
            ? 'bg-[#2A3B35]/10 hover:bg-[#2A3B35]/20 text-[#2A3B35]'
            : 'bg-[#B8D8D0]/10 hover:bg-[#B8D8D0]/20 text-[#B8D8D0]'
        }`}
        aria-label="Toggle theme"
      >
        {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
    )}
  
    {/* Desktop Hero Content - Aligned with navbar */}
    <div className="hidden md:flex relative z-10 flex-1 min-h-safe-screen items-center pb-32">
      <div className="mx-auto max-w-7xl w-full">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 xl:gap-8 xl:grid-cols-[1fr,600px] w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
          {/* Badge */}
          <div>
            <Badge
              variant="default"
              className={`inline-flex items-center ${badgeBg} px-2 py-1 mb-6 backdrop-blur-sm border ${badgeBorder} animate-slide-up animation-delay-100 text-sm`}>
              <div className={`text-center h-1.5 w-1.5 ${badgeDot} animate-pulse mr-2`} />
              <span className={textPrimary}>Ana is now generally available</span>
            </Badge>
          </div>
          {/* Hero Text */}
          <div className="mb-4 lg:mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light animate-slide-up animation-delay-100">
              <span className={`tracking-tight mb-1 block pb-2 ${textPrimary}`}>
                Agentic Analytics
              </span>
              <span className={`${textPrimary} block`}>
                for Every Decision
              </span>
            </h1>
          </div>
          {/* Hero Subtext */}
          <p className={`mb-6 lg:mb-8 text-base md:text-lg lg:text-xl xl:text-2xl font-light ${textSecondary} animate-slide-up animation-delay-300`}>
            Deploy Agents designed for enterprise complexity and security
          </p>
              <div className="hidden md:block animate-slide-up animation-delay-400">
                <DemoRequestForm variant="compact" theme={isLightMode ? 'light' : 'dark'} />
              </div>
            </div>
      
            {/* Right Content - Insights Feed */}
            <div className="h-[450px] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] min-h-[400px] hidden md:flex lg:min-h-0 justify-center xl:justify-start items-center mt-12">
              <div className="w-full max-w-[600px]">
                <InsightsFeed theme={isLightMode ? 'light' : 'dark'} minimal={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    {/* Logo Carousel - DESKTOP - Fixed to bottom */}
    <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className={`text-sm font-medium ${isLightMode ? 'text-[#2A3B35]' : 'text-[#B8D8D0]/80'} mb-4`}>
          Ana finds insights in your existing data stack
        </p>
        <div className="logo-carousel">
          <Carousel items={logos} gradientColor={isLightMode ? '[#F7F7F7]' : 'black'} />
        </div>
      </div>
    </div>


      {/* Mobile Content */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Main mobile content */}
        <div className="flex flex-col items-center justify-center flex-1 mx-auto max-w-7xl px-4 pb-24">
          <Badge
            variant="default"
            className={`inline-flex ${badgeBg} px-3 py-1 mb-8 mt-8 backdrop-blur-sm border ${badgeBorder} animate-slide-up animation-delay-100`}
          >
            <div className={` h-2 w-2 ${badgeDot} animate-pulse mr-2`} />
            <span className={`animate-fade-in animation-delay-200 ${textPrimary}`}>Ana is now generally available</span>
          </Badge>

          <div className="mb-8 w-full text-center">
            <h1 className={`text-5xl md:text-8xl font-light inline-block text-transparent bg-clip-text tracking-tight mb-4 md:mb-6 animate-slide-up animation-delay-200 ${
              isLightMode 
                ? 'bg-gradient-to-r from-[#1a2622] via-[#2A3B35] to-[#3d5249]'
                : 'bg-gradient-to-r from-[#9bc4ba] via-[#B8D8D0] to-[#729E8C]'
            }`}>
              Ana
            </h1>
            <h2 className={`text-4xl md:text-7xl font-light leading-[1.1] ${textPrimary} animate-slide-up animation-delay-300 text-center`}>
              finds insights
              <br />
              you cannot
            </h2>
          </div>
          <p className={`mb-12 text-xl md:text-3xl font-light ${textSecondary} animate-slide-up animation-delay-400 w-full text-center`}>
            Deploy agents across all of your databases & systems of record
          </p>
          <div className="flex justify-center w-full animate-slide-up animation-delay-500 mb-16">
            <DemoRequestButton
              theme={isLightMode ? 'light' : 'dark'}
              buttonText="Get a demo"
            />
          </div>
        </div>
        
        {/* Mobile Logo Carousel - Separate from main content */}
        <div className="bg-transparent backdrop-blur-sm pb-8">
          <div className="mx-auto max-w-7xl px-4">
            <p className={`text-sm font-medium ${isLightMode ? 'text-[#2A3B35]' : 'text-[#B8D8D0]/80'} mb-4 text-center`}>
              Ana finds insights in your existing data stack
            </p>
            <div className="overflow-hidden logo-carousel">
              <MobileCarousel items={logos} speed={30} gradientColor={isLightMode ? '[#F7F7F7]' : 'black'} />
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}

