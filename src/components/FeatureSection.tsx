import { Text } from './ui';
import { LucideIcon } from 'lucide-react';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../utils/theme-utils';

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
  const theme = useComponentTheme();
  return (
    <div className={`p-8 rounded-lg space-y-4 ${theme === 'light' ? 'bg-[#2A3B35]/10 border border-[#2A3B35]/20' : 'bg-[#0A1F1C]/40 border border-[#B8D8D0]/10'}`}>
      <div className={`flex items-center justify-center md:justify-start ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
        <Icon size={24} />
      </div>
      <h3 className={`text-xl text-center md:text-left font-extralight ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>{title}</h3>
      <p className={`text-center md:text-left font-light leading-relaxed ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
        {description}
      </p>
    </div>
  );
}

export function FeatureSection({ title, subtitle, features, className = '' }: FeatureSectionProps) {
  const theme = useComponentTheme();
  return (
    <section className={`${themeBackgroundSecondary(theme)} py-16 lg:py-24 ${className}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight leading-tight mb-6 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
            {title}
          </h2>
          <p className={`text-base lg:text-xl font-light leading-relaxed max-w-3xl mx-auto ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
            {subtitle}
          </p>
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