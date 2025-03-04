import { ArrowRight } from 'lucide-react';
import { OntologyPolyhedron } from '../../animations/ontology';
import { Button } from '../../ui';

export function AgentOntologySection() {
  return (
    <section className="relative min-h-[500px] bg-black overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-50">
        <OntologyPolyhedron />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-6">
        <h2 className="text-5xl font-extralight text-[#B8D8D0] mb-6 tracking-tight text-center">
          Powered by The Ontology
        </h2>

        <p className="text-xl text-[#729E8C] max-w-2xl mx-auto text-center mb-8">
          AI's Interface for Enterprise Data
        </p>

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

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}