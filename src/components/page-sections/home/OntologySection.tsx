import { ArrowRight } from 'lucide-react';
import { OntologyPolyhedron } from '../../animations/ontology';
import { Button } from '../../ui';

export function OntologySection() {
  return (
    <section className="ontology-section relative min-h-[600px] bg-black">
      <div className="mx-auto max-w-site px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center py-16 lg:py-0">
            <h2 className="z-10 text-center lg:text-left text-4xl lg:text-6xl font-extralight text-[#B8D8D0] mb-6 tracking-tight">
              Powered by The Ontology
            </h2>

            <p className="z-10 text-center lg:text-left text-xl lg:text-2xl text-[#729E8C] mx-auto  mb-8">
              Learn about the framework that lets TextQL join 100x more data together than other products
            </p>

            <div className="flex justify-center z-20 lg:justify-start">
              <a href="/ontology">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  Learn How It Works
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>

           <div className="lg:hidden absolute inset-0 opacity-40">
              <OntologyPolyhedron config={{ interactive: false }} />
            </div>

          {/* Right Animation Container */}
          <div className="hidden lg:flex justify-end relative overflow-visible pr-16 -mr-16">            
            {/* Desktop version */}
              <OntologyPolyhedron config={{ interactive: false }} /> 
          </div>
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}