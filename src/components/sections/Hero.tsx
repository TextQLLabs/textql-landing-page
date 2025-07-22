import { DemoRequestForm } from '../ui';
import { WaveBackground } from '../animations';
import { InsightsFeed } from '../InsightsFeed/InsightsFeed';

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <WaveBackground />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid min-h-[calc(100vh-16rem)] items-center gap-16 navbar-offset lg:grid-cols-[1fr,600px]">
          {/* Left Content */}
          <div>
            <div className="mb-8">
              <h1 className="text-8xl font-light bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] inline-block text-transparent bg-clip-text tracking-tight mb-6 opacity-0 animate-slide-up animation-delay-100">
                Ana
              </h1>
              <h2 className="text-7xl font-light leading-[1.1] text-white opacity-0 animate-slide-up animation-delay-200">
                finds insights
                <br />
                you cannot
              </h2>
            </div>
            <p className="mb-12 text-3xl font-light text-[#B8D8D0] opacity-0 animate-slide-up animation-delay-300">
              Deploy AI agents to find trends across all of your data that makes you money
            </p>
            <div className="opacity-0 animate-slide-up animation-delay-400">
              <DemoRequestForm theme="dark" />
            </div>
          </div>

          {/* Right Content - Insights Feed */}
          <div className="h-[600px]">
            <InsightsFeed />
          </div>
        </div>
      </div>
    </section>
  );
}