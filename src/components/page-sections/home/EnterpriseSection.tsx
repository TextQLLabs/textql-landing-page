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
  { src: "/images/logos/aws-white.png", alt: "AWS" },
  { src: "/images/logos/azure-white.png", alt: "Azure" },
  { src: "/images/logos/gcp-white.png", alt: "Google Cloud" }
];

export function EnterpriseSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-site px-6">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-extralight text-[#2A3B35] mb-6">
              Secure & On Your Own Cloud
            </h2>
            
            {/* Cloud Logos */}
            <div className="flex gap-8 mb-8">
              {cloudLogos.map((logo) => (
                <div 
                  key={logo.alt}
                  className="relative w-24 h-12"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain brightness-0 opacity-20"
                  />
                  <div className="absolute inset-0 mix-blend-overlay bg-[#2A3B35]" />
                </div>
              ))}
            </div>
            
            <p className="text-xl text-[#4A665C] mb-8">
              Deploy TextQL in your infrastructure with enterprise-grade security and complete data sovereignty
            </p>

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

          {/* Right Features Grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 bg-[#F0F5F3] border border-[#2A3B35]/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg">
                    <feature.icon className="w-6 h-6 text-[#2A3B35]" />
                  </div>
                  <div>
                    <h3 className="text-[#2A3B35] font-medium mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#4A665C]">
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