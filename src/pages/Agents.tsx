import { 
  AgentHeader, 
  AgentFeature1, 
  JoinsSection,
  AgentOntologySection 
} from '../components/page-sections/agents';
import { SolutionCarousel } from '../components/page-sections/home';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../utils/theme-utils';

export default function Agents() {
  const theme = useComponentTheme();
  return (
    <div className={`min-h-screen ${themeBackgroundSecondary(theme)}`}>
      <SEO 
        title="AI Agents | TextQL"
        description="Learn about Ana, the most intelligent agent for enterprise data analysis. Discover how we built the Ana agent and its capabilities."
        canonical="https://textql.com/agents/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <AgentHeader />
      <Section 
        variant="content"
        paddingTop="sm"
        paddingBottom="sm"
        background="primary"
      >
        <AgentFeature1 />
      </Section>

      {/* Joins Section */}
      <JoinsSection />

      {/* Ontology Section */}
      <AgentOntologySection />

      {/* Solution Carousel */}
      <SolutionCarousel />

      {/* CTA Section */}
      <CTA 
        theme={theme}
        showWave={true}
        variant="wide"
        heading="Ready to deploy Ana in your organization?"
        subheader="Get started with TextQL's intelligent agent technology today"
        useSimpleButton={true}
      />
    </div>
  );
}