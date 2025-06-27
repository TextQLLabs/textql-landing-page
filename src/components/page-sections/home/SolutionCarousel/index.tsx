import { ArrowRight } from 'lucide-react';
import { Text, Heading } from '../../../ui';
import { Carousel } from './Carousel';
import { MobileCarousel } from './MobileCarousel';

export function SolutionCarousel() {
  return (
    <section className="bg-[#F5F9F8] py-12 md:py-24">
      <div className="max-w-site mx-auto px-6">
        {/* Header */}
        <div className="hidden md:flex items-center justify-center mb-12">
          <div className="max-w-2xl">
            <Heading level={2} theme="light" className="mb-4">
              Discover How Ana Transforms Industries
            </Heading>
            <Text theme="light" color="muted" className="text-xl">
              Explore our library of AI-powered solutions that Ana is using to help enterprises unlock insights and drive value today.
            </Text>
          </div>
          <a 
            href="/solutions" 
            className="group flex items-center gap-2 px-8 py-4 bg-[#2A3B35] text-white hover:bg-[#4A665C] transition-colors"
          >
            <span className="text-lg">Explore All Solutions</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="md:hidden mb-8 md:mb-0">
          <h2 className="text-center mb-4 text-3xl font-extralight text-[#2A3B35]">
            Discover How Ana Transforms Industries
          </h2>          
          <p className="text-sm text-center text-[#729E8C]">
            Explore our library of AI-powered solutions that Ana is using to help enterprises unlock insights and drive value today.
          </p>
        </div>

        {/* Desktop Carousel - Hidden on mobile */}
        <div className="hidden md:block">
          <Carousel />
        </div>

        {/* Mobile Carousel - Only shown on mobile */}
        <div className="block md:hidden">
          <MobileCarousel />
        </div>
      </div>
    </section>
  );
}