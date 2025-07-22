import { ArrowRight } from 'lucide-react';
import { Button, Badge, DemoRequestForm } from '../ui';

export default function HeroContent() {
  return (
    <div>
      <Badge
        variant="default"
        className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 backdrop-blur-sm border border-[#B8D8D0]/20"
      >
        <div className="h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
        <span>Ana is now generally available</span>
      </Badge>

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
  );
}