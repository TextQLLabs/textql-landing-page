import { useState } from 'react';
import { LucideIcon, CheckCircle, Zap, Target, ArrowRight } from 'lucide-react';
import { Text, Heading } from '../../ui';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  details?: string[]; // Additional details shown when expanded
  learnMoreHref?: string;
  imageSrc?: string; // Image to show when this feature is selected
}

interface FeatureSectionProps {
  badge: string;
  title: string;
  description: string;
  features: FeatureItem[];
  defaultImageSrc?: string; // Default image when no feature is selected
  defaultImageAlt?: string;
  layout?: "text-left" | "text-right";
  className?: string;
  onTryNow?: (e: React.MouseEvent) => void; // Try Now button handler
}

// Default icons for features if not provided
const defaultIcons = [CheckCircle, Zap, Target];

export function FeatureSection({
  badge,
  title,
  description,
  features,
  defaultImageSrc,
  defaultImageAlt = "Feature illustration",
  layout = "text-right",
  className = "",
  onTryNow,
}: FeatureSectionProps) {
  const theme = useComponentTheme();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  
  // Determine which image to show
  const currentImageSrc = selectedFeature !== null && features[selectedFeature]?.imageSrc 
    ? features[selectedFeature].imageSrc 
    : defaultImageSrc;
  
  const contentSection = (
    <div className="w-full text-center lg:text-left space-y-8">
      {/* Header */}
      <div>
        <div className="mb-4">
          <Text color="secondary" theme={theme} className="text-sm font-medium uppercase tracking-wide">
            {badge}
          </Text>
        </div>
        <Heading level={2} theme={theme} className="text-3xl md:text-5xl font-extralight mb-6 leading-tight">
          {title}
        </Heading>
        <Text color="muted" theme={theme} className="text-base md:text-xl leading-relaxed">
          {description}
        </Text>
      </div>

      {/* Interactive Features List */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon || defaultIcons[index % defaultIcons.length];
          const isSelected = selectedFeature === index;
          
          return (
            <motion.div 
              key={index} 
              className={`border transition-all duration-200 ${
                theme === 'light' 
                  ? 'border-[#2A3B35]/10 hover:border-[#2A3B35]/20' 
                  : 'border-[#B8D8D0]/10 hover:border-[#B8D8D0]/20'
              } ${isSelected ? (theme === 'light' ? 'border-[#2A3B35]/30' : 'border-[#B8D8D0]/30') : ''}`}
              layout
              initial={false}
              animate={{
                backgroundColor: isSelected 
                  ? (theme === 'light' ? 'rgba(42, 59, 53, 0.03)' : 'rgba(184, 216, 208, 0.05)')
                  : 'transparent'
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {/* Feature Header - Clickable */}
              <button
                onClick={() => setSelectedFeature(isSelected ? null : index)}
                className={`w-full flex items-center gap-4 p-4 text-left transition-colors duration-200 ${isSelected ? 'bg-white' : 'hover:bg-[var(--theme-bg-secondary)]'}`}
              >
                <div className={`p-3 ${theme === 'light' ? 'bg-[#2A3B35]/10 border border-[#2A3B35]/20' : 'bg-[#0A1F1C]/80 border border-[#B8D8D0]/10'} flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`} />
                </div>
                <div className="flex-1">
                  <Text variant="header" theme={theme} className="text-lg md:text-xl">
                    {feature.title}
                  </Text>
                </div>
                <motion.div
                  animate={{ rotate: isSelected ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className={`w-4 h-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`} />
                </motion.div>
              </button>

              {/* Expanded Content - Inside the same border */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 space-y-4 bg-white">
                      <Text color="secondary" theme={theme} className="text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </Text>
                      
                      {/* Additional details if provided */}
                      {feature.details && feature.details.length > 0 && (
                        <div className="space-y-2">
                          {feature.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]'
                              }`} />
                              <Text color="muted" theme={theme} className="text-sm">
                                {detail}
                              </Text>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Try Now Button */}
                      <div className="pt-2">
                        {feature.learnMoreHref ? (
                          <a
                            href={feature.learnMoreHref}
                            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                              theme === 'light' 
                                ? 'text-[#2A3B35] hover:text-[#4A665C]' 
                                : 'text-[#B8D8D0] hover:text-[#729E8C]'
                            }`}
                          >
                            Learn more
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        ) : onTryNow ? (
                          <button
                            onClick={onTryNow}
                            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                              theme === 'light' 
                                ? 'text-[#2A3B35] hover:text-[#4A665C]' 
                                : 'text-[#B8D8D0] hover:text-[#729E8C]'
                            }`}
                          >
                            Try Now
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const imageSection = (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageSrc}
          src={currentImageSrc}
          alt={selectedFeature !== null ? features[selectedFeature]?.title : defaultImageAlt}
          className="w-full h-auto mx-auto max-w-md lg:max-w-none rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.04, 0.62, 0.23, 0.98] }}
        />
      </AnimatePresence>
    </div>
  );

  return (
    <section className={`py-12 md:py-16 ${className}`} style={{backgroundColor: 'var(--theme-bg-primary)'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {layout === "text-left" ? (
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">
              <div className="flex-1 w-full lg:max-w-xl">{contentSection}</div>
              <div className="flex-1 w-full lg:max-w-lg">{imageSection}</div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">
              <div className="flex-1 w-full lg:max-w-lg order-2 lg:order-1">{imageSection}</div>
              <div className="flex-1 w-full lg:max-w-xl order-1 lg:order-2">{contentSection}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Export types for reusability
export type { FeatureItem, FeatureSectionProps };