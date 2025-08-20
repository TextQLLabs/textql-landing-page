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
  speed: _speed = 50,
  gradientColor: _gradientColor = "rgb(249, 250, 251)",
  className = "",
}: IntegrationMarqueeProps) {
  const animationClass = direction === "right" ? "animate-scroll-reverse" : "animate-scroll";

  return (
    <div className="relative overflow-hidden py-4">
      <div className={`flex space-x-4 ${animationClass} ${className}`}>
        {integrations.concat(integrations).map((integration, index) => (
          <div
            key={`${integration.name}-${index}`}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm min-w-[120px] h-16 transition-transform duration-300 hover:scale-105 flex-shrink-0"
          >
            <img
              src={integration.logo}
              alt={`${integration.name} integration`}
              className="object-contain max-h-10 max-w-20"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-12 pointer-events-none" style={{background: 'linear-gradient(to right, var(--theme-bg-secondary), transparent)'}}></div>
      <div className="absolute inset-y-0 right-0 w-12 pointer-events-none" style={{background: 'linear-gradient(to left, var(--theme-bg-secondary), transparent)'}}></div>
    </div>
  );
}
