// Removed Next.js Image import - using standard img tag

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
}: FeatureSectionProps) {
  const contentSection = (
    <div className="w-full text-center lg:text-left">
      <div className="mb-3">
        <span className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--theme-accent)'}}>
          {badge}
        </span>
      </div>
      <h2 className="text-3xl font-semibold mb-4 leading-tight" style={{color: 'var(--theme-text-primary)'}}>
        {title}
      </h2>
      <p className="text-base mb-5 leading-relaxed" style={{color: 'var(--theme-text-secondary)'}}>
        {description}
      </p>

      <div className="space-y-3 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 text-left">
            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: 'var(--theme-accent)'}}></div>
            <div>
              <h3 className="text-base font-semibold" style={{color: 'var(--theme-text-primary)'}}>
                {feature.title}
              </h3>
              <p className="text-sm" style={{color: 'var(--theme-text-secondary)'}}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const imageSection = (
    <div className="w-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-lg mx-auto max-w-md lg:max-w-none"
      />
    </div>
  );

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {layout === "text-left" ? (
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32 xl:gap-48 2xl:gap-56">
              <div className="flex-1 w-full lg:max-w-lg">{contentSection}</div>
              <div className="flex-1 w-full lg:max-w-xl">{imageSection}</div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32 xl:gap-48 2xl:gap-56">
              <div className="flex-1 w-full lg:max-w-xl order-2 lg:order-1">{imageSection}</div>
              <div className="flex-1 w-full lg:max-w-lg order-1 lg:order-2">{contentSection}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
