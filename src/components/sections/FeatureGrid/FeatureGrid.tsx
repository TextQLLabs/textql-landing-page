import { type LucideIcon } from 'lucide-react';
import { Badge, Text } from '../../ui';

export interface Feature {
  icon?: LucideIcon;
  image?: {
    src: string;
    alt: string;
    invert?: boolean;
  };
  title: string;
  description: string;
}

export interface FeatureGridProps {
  badge?: {
    text: string;
    variant?: 'default' | 'outline' | 'solid';
  };
  title: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  theme?: 'dark' | 'light';
  columns?: 2 | 3 | 4;
  className?: string;
  imageSize?: 'sm' | 'md' | 'lg';
}

export function FeatureGrid({
  badge,
  title,
  subtitle,
  description,
  features,
  theme = 'dark',
  columns = 3,
  className = '',
  imageSize = 'md'
}: FeatureGridProps) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const borderColor = theme === 'dark' ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]/10' : 'bg-[#F0F5F3]';

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  const imageSizes = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20'
  };

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        {badge && (
          <Badge 
            variant={badge.variant || 'outline'} 
            theme={theme} 
            className="text-lg px-6 py-2"
          >
            {badge.text}
          </Badge>
        )}

        <div className="space-y-4">
          <h2 className={`text-7xl font-extralight ${textColor}`}>
            {title}
          </h2>
          
          {subtitle && (
            <h3 className={`text-3xl font-light ${textColor}`}>
              {subtitle}
            </h3>
          )}
          
          {description && (
            <Text 
              color="muted" 
              theme={theme} 
              className="text-2xl font-light max-w-3xl mx-auto"
            >
              {description}
            </Text>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`
              p-8 border ${borderColor} ${bgColor}
              backdrop-blur-sm
              hover:border-opacity-50 transition-all
              group
            `}
          >
            <div className="space-y-6">
              {feature.icon && (
                <feature.icon className={`w-8 h-8 ${textColor}`} />
              )}
              {feature.image && (
                <div className={`${imageSizes[imageSize]} flex items-center`}>
                  <img 
                    src={feature.image.src}
                    alt={feature.image.alt}
                    className={`
                      h-full w-auto object-contain
                      ${feature.image.invert && theme === 'light' ? 'invert' : ''}
                    `}
                  />
                </div>
              )}
              <Text 
                theme={theme} 
                className="text-xl font-medium"
              >
                {feature.title}
              </Text>
              <Text 
                color="muted" 
                theme={theme}
              >
                {feature.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}