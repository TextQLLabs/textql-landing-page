import { ArrowRight, Cloud, Shield, Palette, Database, Check, X } from 'lucide-react';
import { Text, Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Standard',
    icon: Cloud,
    tagline: 'The introductory offering with everything connected',
    description: 'Perfect for teams getting started with TextQL\'s AI-powered data analysis capabilities.',
    price: '$2.00',
    unit: 'per 100 ACUs',
    // location: 'AWS, US East (Northern Virginia)',
    features: [
      { text: 'Everything connected', included: true },
      { text: 'Basic dashboards', included: true },
      { text: 'RBAC controls', included: false }
    ],
    popular: false,
    buttonText: 'GET STARTED',
    viewFeaturesLink: '#'
  },
  {
    name: 'Enterprise',
    icon: Shield,
    tagline: 'For companies with large-scale data initiatives',
    description: 'Designed for organizations that need advanced security features and user management capabilities.',
    price: '$3.00',
    unit: 'per 100 ACUs',
    // location: 'AWS, US East (Northern Virginia)',
    features: [
      { text: 'Everything in Standard', included: true },
      { text: 'RBAC controls', included: true },
      { text: 'Extended capabilities', included: true }
    ],
    popular: true,
    buttonText: 'GET STARTED',
    viewFeaturesLink: '#'
  },
  {
    name: 'Private Cloud',
    icon: Database,
    tagline: 'For regulated industries with sensitive data',
    description: 'Enhanced security features and controls for organizations with strict compliance requirements.',
    price: '$4.00',
    unit: 'per 100 ACUs',
    // location: 'AWS, US East (Northern Virginia)',
    features: [
      { text: 'Everything in Enterprise', included: true },
      { text: 'Enhanced security', included: true },
      { text: 'Disaster recovery', included: true }
    ],
    popular: false,
    buttonText: 'GET STARTED',
    viewFeaturesLink: '#'
  },
  {
    name: 'White Label',
    icon: Palette,
    tagline: 'Fully embedded solution with custom branding',
    description: 'Deploy TextQL\'s powerful capabilities with your own branding in an isolated environment.',
    price: 'Custom Pricing',
    unit: 'Based on requirements',
    location: '', // No location for this plan
    features: [
      { text: 'Everything in Private Cloud', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Deep integration', included: true }
    ],
    popular: false,
    buttonText: 'TALK TO SALES',
    viewFeaturesLink: '#'
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
          <h2 className="text-2xl lg:text-4xl font-extralight text-[#2A3B35] mb-4">
            Pricing Options
          </h2>
          <Text theme="light" color="muted" className="text-base lg:text-xl max-w-2xl mx-auto">
            Choose the perfect plan for your organization's needs, all powered by our transparent ACU pricing model
          </Text>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            
            return (
              <div
                key={plan.name}
                className={`relative p-8 bg-white border-2 transition-all flex flex-col h-full ${
                  plan.popular 
                    ? 'border-[#2A3B35] shadow-lg scale-105 z-10' 
                    : 'border-[#2A3B35]/10 hover:border-[#2A3B35]/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#2A3B35] text-white text-xs font-medium py-1 px-3 -mt-3 -mr-3">
                    Most Popular
                  </div>
                )}
                
                {/* Icon & Name */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl text-[#2A3B35]">
                      {plan.name}
                    </h3>
                  </div>
                  <Icon className="w-8 h-8 text-[#2A3B35]" />
                </div>

                {/* Tagline */}
                <Text theme="light" className="text-base lg:text-lg font-medium mb-4">
                  {plan.tagline}
                </Text>

                {/* Description */}
                <Text theme="light" color="muted" className="text-xs lg:text-base mb-6">
                  {plan.description}
                </Text>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <Text theme="light" className="text-2xl font-bold text-[#2A3B35]">
                      {plan.price}
                    </Text>
                    <Text theme="light" color="muted" className="ml-2">
                      {plan.unit}
                    </Text>
                  </div>
                  {plan.location && (
                    <Text theme="light" color="muted" className="text-sm">
                      {plan.location}
                    </Text>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                      <Text theme="light" className="flex-1 text-xs lg:text-base">
                        {feature.text}
                      </Text>
                    </li>
                  ))}
                </ul>

                {/* View Features Link */}
                <a 
                  href={plan.viewFeaturesLink} 
                  className="text-[#2A3B35]/80 hover:text-[#2A3B35] text-xs lg:text-sm mb-6 inline-block transition-colors"
                >
                  View All Features →
                </a>

                {/* CTA */}
                <Button
                  variant={plan.name === 'White Label' ? 'secondary' : 'primary'}
                  theme="light"
                  fullWidth
                  className="group"
                  onClick={onDemoRequest}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-3 lg:w-4 h-3 lg:h-4 ml-2 text-xs lg:text-sm transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}