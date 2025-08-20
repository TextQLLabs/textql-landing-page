import Marquee from "react-fast-marquee";

interface Integration {
  name: string;
  logo: string;
}

interface IntegrationMarqueeProps {
  integrations: Integration[];
  direction?: "left" | "right";
  speed?: number;
  gradientColor?: string;
  className?: string;
}

export function IntegrationMarquee({
  integrations,
  direction = "left",
  speed = 50,
  gradientColor,
  className = "",
}: IntegrationMarqueeProps) {
  return (
    <div className={`py-4 ${className}`}>
      <Marquee
        direction={direction}
        speed={speed}
        gradient={true}
        gradientColor={gradientColor || 'var(--theme-bg-secondary)'}
        gradientWidth={50}
        style={{ overflow: 'hidden' }}
        className="overflow-x-hidden"
      >
        {integrations.map((integration, index) => (
          <div
            key={`${integration.name}-${index}`}
            className="flex items-center justify-center p-2 md:p-4 bg-white rounded-lg shadow-sm min-w-[80px] md:min-w-[120px] h-12 md:h-16 transition-transform duration-300 hover:scale-105 flex-shrink-0 mx-1 md:mx-2"
          >
            <img
              src={integration.logo}
              alt={`${integration.name} integration`}
              className="object-contain max-h-6 md:max-h-10 max-w-12 md:max-w-20"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
