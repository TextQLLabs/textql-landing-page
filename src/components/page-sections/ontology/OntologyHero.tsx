import { OntologyPolyhedron } from '../../animations/ontology';

export function OntologyHero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden -mt-16">
      {/* Background Animation - Full viewport */}
      <div className="absolute inset-0 opacity-70">
        <OntologyPolyhedron />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-5xl lg:text-8xl font-extralight text-[#B8D8D0] mb-6 tracking-tight text-center">
          The Ontology
        </h1>

        <p className="text-xl lg:text-2xl text-[#729E8C] max-w-2xl mx-auto text-center">
          AI's Interface for Enterprise Data
        </p>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}