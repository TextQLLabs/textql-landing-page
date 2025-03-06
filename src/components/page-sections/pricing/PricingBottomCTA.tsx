import { ArrowRight } from 'lucide-react';
import { Text, Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

export function PricingBottomCTA() {
  const navigate = useNavigate();

  const handleDemoRequest = () => {
    navigate('/demo');
  };

  return (
    <section className="relative py-32 bg-[#2A3B35] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(184,216,208,0.2)_25%,rgba(184,216,208,0.2)_50%,transparent_50%,transparent_75%,rgba(184,216,208,0.2)_75%,rgba(184,216,208,0.2)_100%)] bg-[length:64px_64px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <Text variant="header" className="text-5xl mb-6">
          Ready to Transform Your Data?
        </Text>

        {/* Description */}
        <Text color="muted" className="text-xl mb-12 max-w-2xl mx-auto">
          Join leading enterprises using TextQL to unlock insights and drive value from their data today.
        </Text>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg"
            className="group min-w-[200px]"
            onClick={handleDemoRequest}
          >
            Request Demo
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button 
            variant="ghost" 
            size="lg"
            className="min-w-[200px]"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}