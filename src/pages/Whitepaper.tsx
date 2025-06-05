import { Text } from '../components/ui';
import { SEO } from '../components/SEO';
import { WhitepaperContent } from '../components/page-sections/whitepaper/WhitepaperContent';
import { Button } from '../components/ui';
import { WaveGrid } from '../components/animations';
import { ArrowRight, Map, BarChart2, XCircle, Settings } from 'lucide-react';
import { Badge } from '../components/ui';

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
        <div className="bg-black pt-20 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              <div className="max-w-3xl">
                <Badge 
                  variant="outline"
                  theme="dark" 
                  className="text-lg px-6 py-2 mb-8"
                >
                  Technical Documentation
                </Badge>
                
                <h1 className="text-5xl font-extralight mb-10 text-[#B8D8D0]">
                  The Definitive Architecture for Novel Insights Discovery
                </h1>
                
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
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center">
                      <Map className="w-5 h-5 mr-3 flex-shrink-0 text-[#B8D8D0]" />
                      <Text color="muted" theme="dark">What is TextQL and how can it help you explore your data?</Text>
                    </div>
                    <div className="flex items-center">
                      <BarChart2 className="w-5 h-5 mr-3 flex-shrink-0 text-[#B8D8D0]" />
                      <Text color="muted" theme="dark">How does it beat existing, pure-LLM systems?</Text>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="w-5 h-5 mr-3 flex-shrink-0 text-[#B8D8D0]" />
                      <Text color="muted" theme="dark">Why won't AI advances alone completely solve the problem?</Text>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-5 h-5 mr-3 flex-shrink-0 text-[#B8D8D0]" />
                      <Text color="muted" theme="dark">How exactly does it work from the inside?</Text>
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
