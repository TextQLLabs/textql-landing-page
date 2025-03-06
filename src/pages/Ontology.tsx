import { OntologyHero, OntologyExplanation, JoinsSection } from '../components/page-sections/ontology';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';

export default function Ontology() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="The Ontology | TextQL"
        description="Discover how TextQL's Ontology connects your enterprise data at scale. AI's Interface for Enterprise Data."
        canonical="https://textql.com/ontology"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <OntologyHero />
      <OntologyExplanation />
      <JoinsSection />
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to unlock insights with TextQL's Ontology?"
        subheader="Deploy our intelligent data framework in your organization today"
        useSimpleButton={true}
      />
    </div>
  );
}