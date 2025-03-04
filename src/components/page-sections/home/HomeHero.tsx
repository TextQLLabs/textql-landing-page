import { Badge, DemoRequestForm, Carousel } from '../../ui';
import { WaveBackground } from '../../animations';
import { InsightsFeed } from '../../InsightsFeed/InsightsFeed';
import { logos } from './constants';

interface HomeHeroProps {
  showLogoCarousel?: boolean;
}

export function HomeHero({ showLogoCarousel = true }: HomeHeroProps) {
  return (
    <section className="relative flex flex-col min-h-screen bg-black">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      {/* Main Content - Centered with flex */}
      <div className="relative z-10 flex-grow mx-auto max-w-7xl px-6 pt-32 pb-20 flex flex-col justify-center">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr,600px]">
          {/* Left Content */}
          <div>
            <Badge
              variant="default"
              className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 backdrop-blur-sm border border-[#B8D8D0]/20"
            >
              <div className="h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
              <span>Ana is now generally available</span>
            </Badge>

            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl font-light bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] inline-block text-transparent bg-clip-text tracking-tight mb-6 opacity-0 animate-slide-up animation-delay-100">
                Ana
              </h1>
              <h2 className="text-4xl md:text-7xl font-light leading-[1.1] text-white opacity-0 animate-slide-up animation-delay-200">
                finds insights
                <br />
                you cannot
              </h2>
            </div>
            <p className="mb-12 text-xl md:text-3xl font-light text-[#B8D8D0] opacity-0 animate-slide-up animation-delay-300">
              Deploy agents across all of your databases & systems of record.
            </p>
            <div className="opacity-0 animate-slide-up animation-delay-400">
              <DemoRequestForm />
            </div>
          </div>

          {/* Right Content - Insights Feed */}
          <div className="h-[600px]">
            <InsightsFeed />
          </div>
        </div>
      </div>

      {/* Logo Carousel - Relative on mobile, Absolute on desktop */}
      {showLogoCarousel && (
        <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-black/80 backdrop-blur-sm py-8">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm font-medium text-[#B8D8D0]/80 mb-4">
              Ana finds insights in your existing data stack
            </p>
            <Carousel items={logos} />
          </div>
        </div>
      )}
    </section>
  );
}