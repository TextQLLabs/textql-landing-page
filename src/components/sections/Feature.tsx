import { type ReactNode } from 'react';
import { Text } from '../ui';

interface Feature {
  icon?: ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  theme?: 'dark' | 'light';
  header: string;
  subheader?: string;
  features?: Feature[];
  image: string;
  imagePosition?: 'left' | 'right';
  bullets?: string[];
  body?: string;
}

export function Feature({
  theme = 'dark',
  header,
  subheader,
  features,
  image,
  imagePosition = 'right',
  bullets,
  body
}: FeatureSectionProps) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const mutedColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]' : 'bg-[#F0F5F3]';
  const borderColor = theme === 'dark' ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';

  const Content = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text variant="header" className={`text-4xl ${textColor}`}>
          {header}
        </Text>
        {subheader && (
          <Text color="muted" className="text-xl">
            {subheader}
          </Text>
        )}
      </div>

      {body && (
        <Text color="muted" className="text-lg">
          {body}
        </Text>
      )}

      {bullets && (
        <ul className="space-y-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 ${theme === 'dark' ? 'bg-[#B8D8D0]' : 'bg-[#2A3B35]'}`} />
              <Text color="muted">{bullet}</Text>
            </li>
          ))}
        </ul>
      )}

      {features && (
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="space-y-3">
              {feature.icon && (
                <div className={`w-10 h-10 rounded-lg ${bgColor} border ${borderColor} flex items-center justify-center`}>
                  {feature.icon}
                </div>
              )}
              <Text className={`font-medium ${textColor}`}>{feature.title}</Text>
              <Text color="muted">{feature.description}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="mx-auto max-w-site px-6">
        <div className={`grid lg:grid-cols-2 gap-16 ${imagePosition === 'left' ? 'lg:grid-flow-col' : ''}`}>
          {/* Content */}
          <Content />

          {/* Image */}
          <div className="relative">
            <div 
              className={`
                aspect-square w-full overflow-hidden rounded-lg
                border ${borderColor}
                transform ${imagePosition === 'left' ? '-rotate-6' : 'rotate-6'}
                transition-transform duration-500 hover:rotate-0
                group
              `}
            >
              <img
                src={image}
                alt={header}
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-500"
              />
              {/* Decorative elements */}
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} opacity-10 group-hover:opacity-0 transition-opacity duration-500`} />
              <div className={`absolute inset-0 border-8 ${borderColor} opacity-20 group-hover:opacity-0 transition-opacity duration-500`} />
            </div>

            {/* Background decoration */}
            <div 
              className={`
                absolute -inset-4 -z-10
                border ${borderColor}
                transform ${imagePosition === 'left' ? 'rotate-3' : '-rotate-3'}
                transition-transform duration-500 group-hover:rotate-0
              `}
            />
          </div>
        </div>
      </div>
    </section>
  );
}