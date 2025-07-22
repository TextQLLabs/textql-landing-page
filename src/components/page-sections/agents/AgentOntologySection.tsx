import { ArrowRight } from 'lucide-react';
import { OntologyPolyhedron } from '../../animations/ontology';
import { Button } from '../../ui';

export function AgentOntologySection() {
  return (
    <div className="relative w-full min-h-[500px] overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Orb animation container - only this should have opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ opacity: 0.5 }}>
          <OntologyPolyhedron />
        </div>
      </div>

      {/* Content container - fully opaque and above the orb */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-6 py-16">
        <h2 
          className="text-5xl font-extralight mb-6 tracking-tight text-center"
          style={{ color: '#B8D8D0' }}
        >
          Powered by The Ontology
        </h2>

        <p 
          className="text-xl max-w-2xl mx-auto text-center mb-8"
          style={{ color: '#729E8C' }}
        >
          AI's Interface for Enterprise Data
        </p>

        <a href="/ontology" className="inline-block">
          <Button 
            variant="primary" 
            size="md"
            className="group"
          >
            Learn How It Works
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </div>
    </div>
  );
}