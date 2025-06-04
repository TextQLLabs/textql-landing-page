import { ArrowRight, Shield, Lock, Server, Cloud } from 'lucide-react';
import { Button, Text } from '../../ui';

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
  return (
    <section className="bg-[#F5F9F8] pb-16 md:pb-32">
      <div className="mx-auto max-w-site px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-[#2A3B35] mb-6 lg:mb-6">
              Secure & On Your Own Cloud
            </h2>
            
            {/* Cloud Logos */}
            <div className="flex justify-center lg:justify-start gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
              {cloudLogos.map((logo) => (
                <div 
                  key={logo.alt}
                  className="relative w-16 h-8 md:w-20 md:h-10 lg:w-24 lg:h-12"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain brightness-0 opacity-20"
                  />
                  <div className="absolute inset-0 mix-blend-overlay bg-transparent" />
                </div>
              ))}
            </div>
            
            <p className="text-base md:text-lg lg:text-xl text-[#4A665C] mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
              Deploy TextQL in your infrastructure with enterprise-grade security and complete data sovereignty
            </p>

            <div className="flex justify-center lg:justify-start">
              <a href="/enterprise">
                <Button 
                  variant="primary" 
                  theme="light"
                  size="lg"
                  className="group"
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
                className="p-4 md:p-5 lg:p-6 bg-[#F0F5F3] border border-[#2A3B35]/10 text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4">
                  <div className="p-2 bg-white rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#2A3B35]" />
                  </div>
                  <div>
                    <h3 className="text-[#2A3B35] font-medium mb-2 text-sm md:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-[#4A665C] text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}