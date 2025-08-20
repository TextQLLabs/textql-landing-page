import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { themeText, themeTextSecondary } from '../../../utils/theme-utils';

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  badge: string;
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc: string;
  imageAlt: string;
  layout?: "text-left" | "text-right";
  className?: string;
  theme?: 'light' | 'dark';
}

export function FeatureSection({
  badge,
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  layout = "text-right",
  className = "",
  theme,
}: FeatureSectionProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  const contentSection = (
    <div className="flex-1 max-w-lg">
      <div className="mb-3">
        <span className={`text-sm font-medium uppercase tracking-wide ${
          effectiveTheme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'
        }`}>
          {badge}
        </span>
      </div>
      <h2 className={`text-3xl font-semibold mb-4 leading-tight ${themeText(effectiveTheme)}`}>
        {title}
      </h2>
      <p className={`text-base mb-5 leading-relaxed ${themeTextSecondary(effectiveTheme)}`}>
        {description}
      </p>

      <div className="space-y-3 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              effectiveTheme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]'
            }`}></div>
            <div>
              <h3 className={`text-base font-semibold ${themeText(effectiveTheme)}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${themeTextSecondary(effectiveTheme)}`}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const imageSection = (
    <div className="flex-1 max-w-xl">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {layout === "text-left" ? (
            <>
              <div className="mr-8">{contentSection}</div>
              {imageSection}
            </>
          ) : (
            <>
              {imageSection}
              <div className="ml-8">{contentSection}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
