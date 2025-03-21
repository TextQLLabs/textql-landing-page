import { Text } from '../components/ui';
import { SEO } from '../components/SEO';
import { WhitepaperContent } from '../components/page-sections/whitepaper/WhitepaperContent';
import { Button } from '../components/ui';
import { WaveGrid } from '../components/animations';
import { ArrowRight } from 'lucide-react';

export default function Whitepaper() {
  const handleOpenPDF = () => {
    window.open('/pdf/ana-whitepaper-3-21.pdf', '_blank');
  };

  return (
    <>
      <SEO
        title="TextQL | Whitepaper"
        description="Download our technical whitepaper to learn about TextQL's architecture, capabilities, and enterprise applications."
        canonical="https://textql.com/whitepaper"
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-black pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              <div className="max-w-3xl">
                <Text variant="header" className="text-4xl md:text-6xl mb-6 text-white">
                  TextQL Architecture Whitepaper
                </Text>
                <Text color="muted" className="text-xl mb-8 max-w-2xl">
                  Our technical overview of TextQL's three-layer architecture and enterprise applications.
                </Text>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleOpenPDF}
                  theme="dark"
                  className="group"
                >
                  Download Full PDF
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="md:mt-8 w-full md:w-auto">
                <div className="p-5 bg-[#0D4A42]/30 border border-[#B8D8D0]/10 rounded-lg backdrop-blur-sm">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#0f8a7a] mr-3"></div>
                      <Text color="muted" theme="dark">Ontology Layer Architecture</Text>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#0f8a7a] mr-3"></div>
                      <Text color="muted" theme="dark">Secure Compute Environment</Text>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#0f8a7a] mr-3"></div>
                      <Text color="muted" theme="dark">Dakota State Framework</Text>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#0f8a7a] mr-3"></div>
                      <Text color="muted" theme="dark">Benchmark Results</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Whitepaper Content */}
        <div className="bg-white py-16">
          <WhitepaperContent />
        </div>
        
        {/* CTA Section with wave effect and PDF button */}
        <section className="relative min-h-[600px] bg-black overflow-hidden">
          <WaveGrid />
          
          <div className="relative z-10 flex items-center min-h-[600px]">
            <div className="mx-auto max-w-site px-6">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-extralight text-[#B8D8D0] tracking-tight leading-tight">
                    Deep Dive: Read the Full Technical Report
                  </h2>
                  
                  <Text 
                    color="muted" 
                    theme="dark"
                    className="text-xl font-light"
                  >
                    Explore OQL's formal semantics, sandboxing internals, and benchmark methodology.
                  </Text>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleOpenPDF}
                    theme="dark"
                  >
                    Read Full Whitepaper
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 