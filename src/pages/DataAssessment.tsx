import { Section, Heading, Text, Button, DemoRequestForm } from '../components/ui';
import { SEO } from '../components/SEO';
import { CTA } from '../components/sections';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { OntologyPolyhedron } from '../components/animations/ontology';

export default function DataAssessment() {
  const theme = useComponentTheme();
  const navigate = useNavigate();

  const onRequestDemo = () => {
    navigate('/request-demo');
  };

  return (
    <div className="min-h-screen bg-[#F5F9F8]">
      <SEO 
        title="Free Data Architecture Assessment | TextQL"
        description="Discover how much of your enterprise data is invisible to AI. Get a free assessment showing exactly what your AI agents can and can't analyze."
        canonical="https://textql.com/data-assessment/"
        ogImage="https://textql.com/images/blog/big-data/header.png"
      />
      
      {/* Hero Section with Dark Background */}
      <section className="relative min-h-screen overflow-hidden -mt-16 flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-60">
          <OntologyPolyhedron />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Heading level={1} className="text-4xl md:text-6xl font-light text-[#B8D8D0] mb-8 tracking-tight">
              Free Data Architecture Assessment
            </Heading>
            <Text className="text-xl md:text-2xl mb-8 text-[#729E8C]">
              Discover exactly how much of your enterprise data is invisible to AI
            </Text>
            <Text className="text-lg text-[#B8D8D0]/80 max-w-3xl mx-auto mb-12">
              Most Fortune 500 companies discover that 99.9% of their data is unreachable by AI agents. 
              Find out where your blind spots are.
            </Text>
            
            {/* Email Form */}
            <div className="max-w-lg mx-auto">
              <DemoRequestForm 
                theme="dark"
                buttonText="Free Consultation"
              />
            </div>
          </div>
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
      </section>



      {/* How It Works */}
      <Section
        variant="narrow"
        padding="lg"
        background="transparent"
      >
        <div className="text-center mb-12">
          <Heading level={2} className="text-3xl font-light text-black mb-4">
            How Your Assessment Works
          </Heading>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#B8D8D0] text-black rounded-full flex items-center justify-center text-xl font-semibold mb-4 mx-auto">
              1
            </div>
            <Heading level={3} className="text-xl font-medium text-black mb-3">
              Data Inventory
            </Heading>
            <Text className="text-black">
              We map your current data landscape - every database, warehouse, lake, and system
            </Text>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#B8D8D0] text-black rounded-full flex items-center justify-center text-xl font-semibold mb-4 mx-auto">
              2
            </div>
            <Heading level={3} className="text-xl font-medium text-black mb-3">
              AI Accessibility Audit
            </Heading>
            <Text className="text-black">
              We analyze what your current AI tools can actually reach and process
            </Text>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#B8D8D0] text-black rounded-full flex items-center justify-center text-xl font-semibold mb-4 mx-auto">
              3
            </div>
            <Heading level={3} className="text-xl font-medium text-black mb-3">
              Custom Roadmap
            </Heading>
            <Text className="text-black">
              Get a tailored plan to unlock your invisible data and maximize AI potential
            </Text>
          </div>
        </div>
      </Section>


      {/* Related Resource CTA */}
      <CTA 
        theme={theme}
        showWave={true}
        heading="Want the Technical Deep Dive?"
        subheader="Read about how we built AI that can process 1,000,000x more data"
        buttonText="Read the Article"
        buttonLink="/blog/big-data"
      />
    </div>
  );
}