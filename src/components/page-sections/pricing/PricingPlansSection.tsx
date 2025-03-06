import { ArrowRight, Cloud, Shield, Palette } from 'lucide-react';
import { Text, Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Cloud',
    icon: Cloud,
    tagline: 'Scale Effortlessly in the Cloud',
    description: 'Deploy instantly and scale automatically with our fully-managed cloud solution. Perfect for teams that want to focus on insights, not infrastructure.',
    features: [
      'Instant deployment',
      'Auto-scaling infrastructure',
      'Built-in integrations (Slack, Salesforce)',
      'Real-time monitoring',
      'Automatic updates & maintenance',
      'Standard support SLA'
    ]
  },
  {
    name: 'On-Premise',
    icon: Shield,
    tagline: 'Enterprise-Grade Security & Total Control',
    description: 'Deploy TextQL in your own infrastructure with complete data sovereignty and customization options. Ideal for enterprises with specific security requirements.',
    features: [
      'Full data sovereignty',
      'Custom integrations',
      'Dedicated support team',
      'Enhanced security features',
      'Deployment flexibility',
      'Custom SLAs available'
    ]
  },
  {
    name: 'Embed',
    icon: Palette,
    tagline: 'Seamless Integration, Branded Brilliance',
    description: 'Integrate TextQL\'s powerful capabilities directly into your application with full white-labeling support. Perfect for building AI-powered solutions.',
    features: [
      'Custom branding options',
      'Seamless API integration',
      'White-glove technical support',
      'Developer-friendly SDKs',
      'Custom feature development',
      'Priority support channel'
    ]
  }
];

export function PricingPlansSection() {
  const navigate = useNavigate();

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/demo');
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extralight text-[#2A3B35] mb-4">
            Deployment Options
          </h2>
          <Text theme="light" color="muted" className="text-xl max-w-2xl mx-auto">
            Choose the perfect deployment option for your needs, all powered by our transparent ACU pricing model
          </Text>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            
            return (
              <div
                key={plan.name}
                className="relative p-8 bg-white border border-[#2A3B35]/10 hover:border-[#2A3B35]/20 transition-all flex flex-col h-full"
              >
                {/* Icon & Name */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl text-[#2A3B35]">
                      {plan.name}
                    </h3>
                  </div>
                  <Icon className="w-8 h-8 text-[#2A3B35]" />
                </div>

                {/* Tagline */}
                <Text theme="light" className="text-lg font-medium mb-4">
                  {plan.tagline}
                </Text>

                {/* Description */}
                <Text theme="light" color="muted" className="mb-6">
                  {plan.description}
                </Text>

                {/* Features */}
                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-1 text-[#2A3B35]">•</div>
                      <Text theme="light" color="muted" className="flex-1">
                        {feature}
                      </Text>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="primary"
                  theme="light"
                  fullWidth
                  className="group"
                  onClick={onDemoRequest}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}