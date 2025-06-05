import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui';
import { WaveBackground } from '../../animations';
import { ArrowRight } from 'lucide-react';
import { Text } from '../../ui';

export function PricingHeader() {
  const navigate = useNavigate();

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/demo');
  };

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center pb-20 mt-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {/* Tech-inspired decorative element */}
          <div className="mb-8 pt-10 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-[#B8D8D0]/10 px-4 py-2 rounded-full border border-[#B8D8D0]/20 backdrop-blur-sm">
              <div className="h-2 w-2 bg-[#B8D8D0] rounded-full animate-pulse" />
              <span className="text-[#B8D8D0] text-xs lg:text-sm">Agent Compute Units (ACU)</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-extralight text-[#B8D8D0] mb-6">
            Empower Your Business with{' '}
            <span className="bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] inline-block text-transparent bg-clip-text">
              Outcome-Driven AI
            </span>
          </h1>

          {/* Subheadline */}
          <h2 className="text-base lg:text-2xl font-light text-[#729E8C] mb-12 max-w-3xl mx-auto">
            Transparent Pricing, Predictable ROI – Every task measured in Agent Compute Units
          </h2>

          {/* CTA */}
          <Button 
            variant="primary" 
            size="lg"
            className="group"
            onClick={onDemoRequest}
          >
            Schedule a Demo
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}