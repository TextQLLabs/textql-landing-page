import { ArrowRight } from 'lucide-react';
import { Text } from '../ui';

interface Feature {
  number: string;
  title: string;
  description: string;
  platforms?: string[];
  bullets?: {
    icon?: string;
    text: string;
  }[];
  tools?: string[];
  cta?: {
    text: string;
    href: string;
  };
}

interface FeaturesProps {
  features: Feature[];
  theme?: 'dark' | 'light';
  className?: string;
}

export function Features({ 
  features,
  theme = 'dark',
  className = ''
}: FeaturesProps) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const mutedColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';
  const accentColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]/10' : 'bg-[#F0F5F3]';

  return (
    <div className={`grid gap-16 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {features.map((feature) => (
        <div key={feature.title} className="relative">
          {/* Feature Number */}
          <div className={`mb-4 text-sm font-medium ${accentColor}`}>
            {feature.number}
          </div>

          {/* Title */}
          <h3 className={`mb-4 text-2xl font-semibold ${textColor}`}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className={`mb-6 ${mutedColor}`}>
            {feature.description}
          </p>

          {/* Platforms */}
          {feature.platforms && feature.platforms.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {feature.platforms.map((platform) => (
                <span 
                  key={platform} 
                  className={`rounded ${bgColor} px-3 py-1 text-sm ${accentColor}`}
                >
                  {platform}
                </span>
              ))}
            </div>
          )}

          {/* Bullets */}
          {feature.bullets && feature.bullets.length > 0 && (
            <ul className={`mb-6 space-y-4 ${mutedColor}`}>
              {feature.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className={`mr-2 ${accentColor}`}>
                    {bullet.icon || '↳'}
                  </span>
                  {bullet.text}
                </li>
              ))}
            </ul>
          )}

          {/* Tools */}
          {feature.tools && feature.tools.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {feature.tools.map((tool) => (
                <span 
                  key={tool} 
                  className={`rounded ${bgColor} px-3 py-1 text-sm ${accentColor}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          {feature.cta && (
            <a 
              href={feature.cta.href}
              className={`group inline-flex items-center ${accentColor}`}
            >
              {feature.cta.text}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}