import { OntologyPolyhedron } from '../../animations/ontology';
import LogoCarousel from '../../LogoCarousel';

export function OntologyHero() {
  return (
    <section className="relative h-screen overflow-hidden -mt-16" style={{ backgroundColor: '#000000' }}>
      {/* Background Animation - Full viewport */}
      <div className="absolute inset-0 opacity-70">
        <OntologyPolyhedron />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-8xl font-extralight text-[#B8D8D0] mb-6 tracking-tight">
            The Ontology
          </h1>

          <p className="text-xl lg:text-2xl text-[#729E8C] max-w-2xl mx-auto">
            AI's Interface for Enterprise Data
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="w-full max-w-6xl">
          <p className="text-center text-lg font-medium text-[#B8D8D0]/80 mb-8">
            Build your ontology out of
          </p>
          <LogoCarousel />
        </div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}