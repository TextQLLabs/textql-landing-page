import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './Layout';
import { SEO } from './SEO';
import { useDevToolsConfig } from '../contexts/DevToolsContext';
import { useGlobalTheme } from './GlobalThemeProvider';
import { 
  SolutionCarousel, 
  JoinsSection,
  OntologySection,
  EnterpriseSection 
} from './page-sections/home';
import { Badge, DemoRequestForm, HeroSection } from './ui';
import { InsightsFeed } from './InsightsFeed/InsightsFeed';
import { getThemeClasses } from '../utils/theme-utils';
import { CTA } from './sections';
import Pricing from '../pages/Pricing';
import Enterprise from '../pages/Enterprise';
import About from '../pages/About';
import Agents from '../pages/Agents';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Cookies from '../pages/Cookies';
import Ontology from '../pages/Ontology';
import Blog from '../pages/blog';
import BlogPost from '../pages/blog/[id]';
import SolutionLibrary from '../pages/solutions';
import SolutionTemplate from '../pages/solutions/[id]';
import Demo from '../pages/Demo';
import AllIntegrations from '../pages/AllIntegrations';
import TableauMcpIntegration from '../pages/integrations/TableauMcpIntegration';
import DatabricksMcpIntegration from '../pages/integrations/Databricks';
import Whitepaper from '../pages/Whitepaper';
import Careers from '../pages/Careers';
import JobPostingPage from '../pages/careers/JobPostingPage';
import Snowflake2025 from '../pages/Snowflake2025';
import Team from '../pages/Team';
import SnowflakeMcpIntegration from '../pages/integrations/SnowflakeMcpIntegration';
import Databricks2025 from '../pages/Databricks2025';
import Test from '../pages/Test';
import ThemeTest from '../pages/ThemeTest';
import Customers from '../pages/Customers';
import DataAssessment from '../pages/DataAssessment';
import Trial from '../pages/Trial';
import RequestDemo from '../pages/RequestDemo';

// Logo definitions with theme variants
const logoData = [
  { dark: '/images/logos/reshift-nobg.png', light: '/images/logos/reshift-nobg.png', alt: 'Redshift' },
  { dark: '/images/logos/snowflake-white.png', light: '/images/logos/snowflake-white.png', alt: 'Snowflake' },
  { dark: '/images/logos/databricks-nobg.png', light: '/images/logos/databricks-nobg.png', alt: 'Databricks' },
  { dark: '/images/logos/looker-white.png', light: '/images/logos/looker-white.png', alt: 'Looker' },
  { dark: '/images/logos/powerbi-white.png', light: '/images/logos/powerbi-white.png', alt: 'Power BI' },
  { dark: '/images/logos/Tableau White.png', light: '/images/logos/Tableau White.png', alt: 'Tableau' },
  { dark: '/images/logos/dbt-nobg.png', light: '/images/logos/dbt-nobg.png', alt: 'dbt' },
  { dark: '/images/logos/azure-white.png', light: '/images/logos/azure-white.png', alt: 'Azure' },
  { dark: '/images/logos/aws-white.png', light: '/images/logos/aws-white.png', alt: 'AWS' },
  { dark: '/images/logos/salesforce-white.png', light: '/images/logos/salesforce-white.png', alt: 'Salesforce' },
  { dark: '/images/logos/gcp-white.png', light: '/images/logos/gcp-white.png', alt: 'Google Cloud' },
  { dark: '/images/logos/teams-white.png', light: '/images/logos/teams-white.png', alt: 'Teams' },
  { dark: '/images/logos/slack-white.png', light: '/images/logos/slack-white.png', alt: 'Slack' },
  { dark: '/images/logos/alation-white.png', light: '/images/logos/alation-white.png', alt: 'Alation' },
  { dark: '/images/logos/sap-white.png', light: '/images/logos/sap-white.png', alt: 'SAP' },
  { dark: '/images/logos/oracle.png', light: '/images/logos/oracle.png', alt: 'Oracle' }
];

export function AppWithGlobalTheme() {
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV;
  const { setThemeControls } = useDevToolsConfig();
  const { isLightMode, toggleTheme } = useGlobalTheme();

  // Register global theme controls with DevTools
  useEffect(() => {
    setThemeControls({
      isLightMode,
      toggleTheme
    });
  }, [isLightMode, toggleTheme, setThemeControls]);

  // Get current page metadata
  const currentPath = location.pathname;
  const baseUrl = 'https://textql.com';

  // Dynamic logos based on theme
  const logos = logoData.map(logo => ({
    src: isLightMode ? logo.light : logo.dark,
    alt: logo.alt
  }));

  // Theme-based styling
  const themeClasses = getThemeClasses(isLightMode);

  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      {isDevelopment && <Route path="/theme-test" element={<ThemeTest />} />}
      <Route path="/trial" element={<Trial />} />
      <Route element={<Layout />}>
        {/* Main Routes */}
        <Route
          path="/"
          element={
            <main className="relative overflow-x-hidden">
              <SEO 
                title="Find Insights With AI | TextQL"
                description="Deploy AI agents to find trends across all of your data that makes you money"
                canonical="https://textql.com"
                ogImage="https://textql.com/social-preview.png"
              />
              <HeroSection
                layout="content-right"
                minHeight="screen"
                showWaveBackground={true}
                waveScale={0.8}
                waveCoverage={1.2}
                showLogoCarousel={true}
                logoCarouselTitle="Ana finds insights in your existing data stack"
                logoItems={logos}
                mobileStackOrder="left-top"
                mobileHideRight={true}
                leftContent={
                  <div className="flex flex-col justify-center">
                    <div className="text-center lg:text-left">
                      <Badge
                        variant="default"
                        className={`inline-flex items-center ${themeClasses.badgeBg} px-2 py-1 mb-6 backdrop-blur-sm border ${themeClasses.badgeBorder} animate-slide-up animation-delay-100 text-sm`}>
                        <div className={`text-center h-1.5 w-1.5 ${themeClasses.badgeDot} animate-pulse-fast mr-2`} />
                        <span className={themeClasses.textPrimary}>Ana is now generally available</span>
                      </Badge>
                    </div>
                    <div className="mb-4 lg:mb-6 text-center lg:text-left">
                      <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-light animate-slide-up animation-delay-100">
                        <span className={`tracking-tight mb-1 block pb-2 ${themeClasses.textPrimary}`}>
                          Agentic Analytics
                        </span>
                        <span className={`${themeClasses.textPrimary} block`}>
                          for Every Decision
                        </span>
                      </h1>
                    </div>
                    <p className={`mb-6 lg:mb-8 text-base md:text-lg lg:text-xl xl:text-2xl font-light ${themeClasses.textSecondary} animate-slide-up animation-delay-300 text-center lg:text-left`}>
                      Deploy Agents designed for enterprise complexity and security
                    </p>
                    <div className="flex justify-center lg:justify-start animate-slide-up animation-delay-400 w-full">
                      <div className="w-full max-w-lg">
                        <DemoRequestForm theme={isLightMode ? 'light' : 'dark'} />
                      </div>
                    </div>
                  </div>
                }
                rightContent={
                  <div className="flex justify-start lg:justify-start items-start lg:items-center lg:h-full lg:min-h-0">
                    {/* Desktop only: Show InsightsFeed */}
                    <div className="hidden lg:block w-full">
                      <InsightsFeed theme={isLightMode ? 'light' : 'dark'} minimal={true} />
                    </div>
                  </div>
                }
              >
                {/* Video appears when hero stacks - starts small, grows gradually */}
                <div className="lg:hidden w-full animate-slide-up animation-delay-500">
                  <div className="aspect-video overflow-hidden shadow-2xl rounded-lg w-full mx-auto" style={{ maxWidth: 'clamp(400px, 50vw, 600px)' }}>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/tql.mov" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </HeroSection>
              <JoinsSection />
              <OntologySection />
              <SolutionCarousel />
              <EnterpriseSection />
              <CTA />
            </main>
          }
        />
        
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/templates" element={<Navigate to="/solutions" replace />} />
        <Route path="/workflows" element={<Navigate to="/solutions" replace />} />
        <Route path="/solutions" element={<SolutionLibrary />} />
        <Route path="/solutions/:id" element={<SolutionTemplate />} />
        <Route path="/workflows/:id" element={<Navigate to={`/solutions/${location.pathname.split('/').pop()}`} replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/ontology" element={<Ontology />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:jobId" element={<JobPostingPage />} />
        <Route path="/integrations" element={<AllIntegrations />} />
        <Route path="/integrations/tableau" element={<TableauMcpIntegration />} />
        <Route path="/integrations/databricks" element={<DatabricksMcpIntegration />} />
        <Route path="/integrations/snowflake" element={<SnowflakeMcpIntegration />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/data-assessment" element={<DataAssessment />} />
        <Route path="/team" element={<Team />} />
        <Route path="/snowflake-2025" element={<Snowflake2025 />} />
        <Route path="/databricks-2025" element={<Databricks2025 />} />
        {isDevelopment && (
          <>
            <Route path="/customers" element={<Customers />} />
          </>
        )}
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        <Route path="/demo" element={<Navigate to="/request-demo" replace />} />
      </Route>
    </Routes>
  );
}