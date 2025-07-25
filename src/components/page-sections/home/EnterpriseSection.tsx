import { ArrowRight, Shield, Lock, Server, Cloud } from 'lucide-react';
import { Button, Text } from '../../ui';
import { Section } from '../../ui/Section';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeText } from '../../../utils/theme-utils';
import { trackButtonClick } from '../../../utils/analytics';

const features = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II certified with end-to-end encryption"
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    description: "Deploy in your own cloud with complete control"
  },
  {
    icon: Server,
    title: "Private Infrastructure",
    description: "Dedicated resources in your VPC"
  },
  {
    icon: Cloud,
    title: "Cloud Agnostic",
    description: "AWS, Azure, or GCP deployment options"
  }
];

const cloudLogos = [
  { src: "/images/logos/azure-white.png", alt: "Azure" },
  { src: "/images/logos/aws-white.png", alt: "AWS" },
  { src: "/images/logos/gcp-white.png", alt: "Google Cloud" }
];

export function EnterpriseSection() {
  const theme = useComponentTheme();
  return (
    <Section
      variant="content"
      padding="md"
      background="secondary"
      className="security-section"
    >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extralight ${themeText(theme)} mb-6 lg:mb-8`}>
              Secure & On Your Own Cloud
            </h2>
            
            {/* Cloud Logos */}
            <div className="flex justify-center lg:justify-start gap-4 md:gap-6 mb-6 md:mb-8">
              {cloudLogos.map((logo) => (
                <div 
                  key={logo.alt}
                  className={`flex items-center justify-center w-20 h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 rounded-lg transition-colors ${theme === 'light' ? 'bg-[#2A3B35]/10 border border-[#2A3B35]/20 hover:border-[#2A3B35]/40' : 'bg-[#B8D8D0]/10 border border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40'}`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-[80%] max-h-[70%] object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
            
            <p className={`text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
              Deploy TextQL in your infrastructure with enterprise-grade security and complete data sovereignty
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="/enterprise">
                <Button 
                  variant="primary" 
                  theme="dark"
                  size="md"
                  className="group"
                  onClick={() => trackButtonClick('Learn More About Enterprise', 'home_enterprise_section', { destination: 'enterprise' })}
                >
                  Learn More About Enterprise
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-8 lg:mt-0">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className={`p-4 md:p-5 lg:p-6 transition-colors text-center sm:text-left ${theme === 'light' ? 'bg-[#2A3B35]/10 border border-[#2A3B35]/20 hover:border-[#2A3B35]/40' : 'bg-[#0A1F1C] border border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40'}`}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${theme === 'light' ? 'bg-[#2A3B35]/10' : 'bg-[#B8D8D0]/10'}`}>
                    <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`} />
                  </div>
                  <div>
                    <h3 className={`${themeText(theme)} font-medium mb-2 text-sm md:text-base`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm md:text-base ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Section>
  );
}