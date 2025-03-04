import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import { SEO } from './components/SEO';
import { 
  HomeHero, 
  WorkflowCarousel, 
  JoinsSection,
  OntologySection,
  EnterpriseSection 
} from './components/page-sections/home';
import { CTA } from './components/sections';
import DesignSystem from './pages/DesignSystem';
import Pricing from './pages/Pricing';
import Enterprise from './pages/Enterprise';
import About from './pages/About';
import Agents from './pages/Agents';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Ontology from './pages/Ontology';
import Blog from './pages/blog';
import BlogPost from './pages/blog/[id]';
import WorkflowLibrary from './pages/workflows';
import WorkflowTemplate from './pages/workflows/[id]';

function App() {
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV;

  // Get current page metadata
  const currentPath = location.pathname;
  const baseUrl = 'https://textql.com';
  const canonical = `${baseUrl}${currentPath}`;

  return (
    <>
      <Routes>
        <Route path="/design-system" element={<DesignSystem />} />
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
                <WorkflowCarousel />
                <EnterpriseSection />
                <CTA />
              </main>
            }
          />
          
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/templates" element={<Navigate to="/workflows" replace />} />
          <Route path="/workflows" element={<WorkflowLibrary />} />
          <Route path="/workflows/:id" element={<WorkflowTemplate />} />
          <Route path="/about" element={<About />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/ontology" element={<Ontology />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App