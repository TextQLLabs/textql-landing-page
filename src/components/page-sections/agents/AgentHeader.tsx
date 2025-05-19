import { WaveBackground } from '../../animations';
import { Badge } from '../../ui';

export function AgentHeader() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      <div className="relative z-10 flex items-center min-h-[600px]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge
            variant="default"
            className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 backdrop-blur-sm border border-[#B8D8D0]/20"
          >
            <div className="h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
            <span className="text-[#B8D8D0]">Ana Agent</span>
          </Badge>

          <h1 className="text-7xl font-extralight text-[#B8D8D0] mb-6">
            The Most Intelligent Agent—Ever
          </h1>
          <p className="text-xl font-light text-[#729E8C]">
            How we built the Ana agent
          </p>
        </div>
      </div>
    </section>
  );
}