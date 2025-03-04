import { ArrowRight } from 'lucide-react';
import { OntologyPolyhedron } from '../../animations/ontology';
import { Button } from '../../ui';

export function OntologySection() {
  return (
    <section className="relative min-h-[600px] bg-black overflow-hidden">
      <div className="mx-auto max-w-site px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center py-16 lg:py-0">
            <h2 className="text-4xl lg:text-6xl font-extralight text-[#B8D8D0] mb-6 tracking-tight">
              Powered by The Ontology
            </h2>

            <p className="text-xl lg:text-2xl text-[#729E8C] max-w-xl mb-8">
              Learn about the framework that lets TextQL join 100x more data together than other products
            </p>

            <div>
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

          {/* Right Animation Container */}
          <div className="relative h-[400px] lg:h-full">
            {/* Mobile version */}
            <div className="lg:hidden absolute inset-0 opacity-20">
              <OntologyPolyhedron config={{ interactive: false }} />
            </div>
            
            {/* Desktop version */}
            <div className="hidden lg:block absolute inset-0">
              <OntologyPolyhedron config={{ interactive: true }} />
            </div>
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