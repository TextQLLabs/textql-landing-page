import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './Layout';
import { SEO } from './SEO';
import { useDevToolsConfig } from '../contexts/DevToolsContext';
import { useGlobalTheme } from './GlobalThemeProvider';
import { 
  HomeHero, 
  SolutionCarousel, 
  JoinsSection,
  OntologySection,
  EnterpriseSection 
} from './page-sections/home';
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
  const canonical = `${baseUrl}${currentPath}`;

  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      {isDevelopment && <Route path="/theme-test" element={<ThemeTest />} />}
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
              <HomeHero />
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

        <Route path="/demo" element={<Demo />} />
      </Route>
    </Routes>
  );
}