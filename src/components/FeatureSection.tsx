import { Text } from './ui';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  className?: string;
}

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="bg-[#0A1F1C]/40 border border-[#B8D8D0]/10 p-8 rounded-lg space-y-4">
      <div className="text-[#B8D8D0]">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-extralight text-[#B8D8D0]">{title}</h3>
      <Text color="muted" className="font-light leading-relaxed">
        {description}
      </Text>
    </div>
  );
}

export function FeatureSection({ title, subtitle, features, className = '' }: FeatureSectionProps) {
  return (
    <section className={`bg-black py-24 border-t border-[#B8D8D0]/10 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extralight text-[#B8D8D0] tracking-tight leading-tight mb-6">
            {title}
          </h2>
          <Text color="muted" className="text-xl font-light leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 