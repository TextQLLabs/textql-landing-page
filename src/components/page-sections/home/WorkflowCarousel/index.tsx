import { ArrowRight } from 'lucide-react';
import { Text, Heading } from '../../../ui';
import { Carousel } from './Carousel';

export function WorkflowCarousel() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-site mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="max-w-2xl">
            <Heading level={2} theme="light" className="mb-4">
              Discover How Ana Transforms Industries
            </Heading>
            <Text theme="light" color="muted" className="text-xl">
              Explore our library of AI-powered workflows that Ana is using to help enterprises unlock insights and drive value today.
            </Text>
          </div>
          <a 
            href="/workflows" 
            className="group flex items-center gap-2 px-8 py-4 bg-[#2A3B35] text-white hover:bg-[#4A665C] transition-colors"
          >
            <span className="text-lg">Explore All Workflows</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Carousel */}
        <Carousel />
      </div>
    </section>
  );
}