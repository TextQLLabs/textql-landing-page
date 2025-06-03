import { Badge, DemoRequestForm, Carousel} from "../../ui";
import { WaveBackground } from "../../animations";
import { InsightsFeed } from "../../InsightsFeed/InsightsFeed";
import { DemoRequestButton } from "../../ui/Button/DemoRequestButton";


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

const logos = [
  { src: '/images/logos/reshift-nobg.png', alt: 'Redshift' },
  { src: '/images/logos/snowflake-white.png', alt: 'Snowflake' },
  { src: '/images/logos/databricks-nobg.png', alt: 'Databricks' },
  { src: '/images/logos/looker-white.png', alt: 'Looker' },
  { src: '/images/logos/powerbi-white.png', alt: 'Power BI' },
  { src: '/images/logos/Tableau White.png', alt: 'Tableau' },
  { src: '/images/logos/dbt-nobg.png', alt: 'dbt' },
  { src: '/images/logos/azure-white.png', alt: 'Azure' },
  { src: '/images/logos/aws-white.png', alt: 'AWS' },
  { src: '/images/logos/salesforce-white.png', alt: 'Salesforce' },
  { src: '/images/logos/gcp-white.png', alt: 'Google Cloud' },
  { src: '/images/logos/teams-white.png', alt: 'Teams' },
  { src: '/images/logos/slack-white.png', alt: 'Slack' },
  { src: '/images/logos/alation-white.png', alt: 'Alation' },
  { src: '/images/logos/sap-white.png', alt: 'SAP' },
  { src: '/images/logos/oracle.png', alt: 'Oracle' }
];


interface HomeHeroProps {
  showLogoCarousel?: boolean;
}

export function HomeHero({ showLogoCarousel = true }: HomeHeroProps) {
  return (
    <section className="relative flex flex-col min-h-screen bg-black">
      <div className="absolute inset-0 z-0 mt-4 animate-fade-in animation-delay-400">
        <WaveBackground />
      </div>

      <div className="hidden md:flex relative z-10 flex-1 mx-auto max-w-7xl px-6 md:pb-20 flex-col justify-start md:justify-center pt-12 md:pt-0">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr,600px]">
          {/* Left Content */}
          <div>
            <Badge
              variant="default"
              className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 backdrop-blur-sm border border-[#B8D8D0]/20"
            >
              <div className="text-center h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
              <span>Ana is now generally available</span>
            </Badge>

            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl font-light bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] inline-block text-transparent bg-clip-text tracking-tight mb-4 md:mb-6 animate-slide-up animation-delay-100">
                Ana
              </h1>
              <h2 className="text-4xl md:text-7xl font-light leading-[1.1] text-white animate-slide-up animation-delay-200">
                finds insights
                <br />
                you cannot
              </h2>
            </div>
            <p className="mb-12 text-xl md:text-3xl font-light text-[#B8D8D0] animate-slide-up animation-delay-300">
              Deploy agents across all of your databases & systems of record
            </p>
            <div className="hidden md:block animate-slide-up animation-delay-400">
              <DemoRequestForm />
            </div>
            <div className="md:hidden flex justify-center">
              <DemoRequestButton
                theme="dark"
                buttonText="Get a demo"
              />
            </div>
          </div>

          {/* Right Content - Insights Feed */}
          <div className="h-[600px] hidden md:block">
            <InsightsFeed />
          </div>
        </div>
      </div>


      {/* Mobile Content */}
      <div className="md:hidden flex flex-col items-center justify-center text-center px-4">
        <Badge
          variant="default"
          className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 mt-8 backdrop-blur-sm border border-[#B8D8D0]/20 animate-slide-up animation-delay-100"
        >
          <div className="text-center h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
          <span className="animate-fade-in animation-delay-200">Ana is now generally available</span>
        </Badge>

        <div className="mb-8 w-full">
          <h1 className="text-5xl md:text-8xl font-light bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] inline-block text-transparent bg-clip-text tracking-tight mb-4 md:mb-6 animate-slide-up animation-delay-200">
            Ana
          </h1>
          <h2 className="ml-3 text-4xl md:text-7xl font-light leading-[1.1] text-white animate-slide-up animation-delay-300">
            finds insights
            <br />
            you cannot
          </h2>
        </div>
        <p className="mb-12 text-xl md:text-3xl font-light text-[#B8D8D0] animate-slide-up animation-delay-400 w-full">
          Deploy agents across all of your databases & systems of record
        </p>
        <div className="md:hidden flex justify-center w-full animate-slide-up animation-delay-500">
          <DemoRequestButton
            theme="dark"
            buttonText="Get a demo"
          />
        </div>
      </div>

      {/* Logo Carousel - MOBILE - Fixed at bottom */}
      {showLogoCarousel && (
        <div className="md:hidden bg-none backdrop-blur-sm mt-40 pb-4">
          <div className="mx-auto max-w-7xl px-6 ">
            <p className="text-sm font-medium text-[#B8D8D0]/80 mt-4 mb-4 text-center">
              Ana finds insights in your existing data stack
            </p>
            <div className="">
              <Carousel items={logos} />
            </div>
          </div>
        </div>
      )}

      {/* Logo Carousel - DESKTOP */}
      {showLogoCarousel && (
        <div className="hidden md:block lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-black/80 backdrop-blur-sm md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-medium text-[#B8D8D0]/80 mb-4">
              Ana finds insights in your existing data stack
            </p>
            <div className="mt-8"></div>
            <Carousel items={logos} />
          </div>
        </div>
      )}
    </section>
  );
}
