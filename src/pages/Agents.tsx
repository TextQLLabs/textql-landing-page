import { 
  AgentHeader, 
  AgentFeature1, 
  JoinsSection,
  AgentOntologySection 
} from '../components/page-sections/agents';
import { SolutionCarousel } from '../components/page-sections/home';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';

export default function Agents() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="AI Agents | TextQL"
        description="Learn about Ana, the most intelligent agent for enterprise data analysis. Discover how we built the Ana agent and its capabilities."
        canonical="https://textql.com/agents/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <AgentHeader />
      <section className="py-12 bg-[#F7F7F7]">
        <div className="mx-auto max-w-site px-6">
          <AgentFeature1 />
        </div>
      </section>

      {/* Joins Section */}
      <JoinsSection />

      {/* Ontology Section */}
      <AgentOntologySection />

      {/* Solution Carousel */}
      <SolutionCarousel />

      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to deploy Ana in your organization?"
        subheader="Get started with TextQL's intelligent agent technology today"
        useSimpleButton={true}
      />
    </div>
  );
}