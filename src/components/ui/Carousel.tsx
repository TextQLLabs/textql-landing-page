import Marquee from "react-fast-marquee";

interface CarouselProps {
  items: Array<{
    src: string;
    alt: string;
  }>;
  speed?: number;
  className?: string;
  itemClassName?: string;
  gradientColor?: string;
  theme?: 'light' | 'dark';
}

export function Carousel({
  items,
  speed = 30,
  className = '',
  itemClassName = '',
  gradientColor = 'white',
  theme = 'dark'
}: CarouselProps) {
  return (
    <div className={`w-full overflow-hidden bg-transparent ${className}`}>
      <Marquee
        autoFill={true}
        pauseOnHover={false}
        speed={speed}
        gradient={true}
        gradientColor={gradientColor}
        gradientWidth={80}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="mx-16 flex items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.alt}
              className={`h-8 w-auto max-w-24 object-contain opacity-60 grayscale hover:opacity-100 transition-opacity ${itemClassName}`}
              style={theme === 'light' ? { filter: 'brightness(0) saturate(100%) invert(23%) sepia(18%) saturate(1069%) hue-rotate(127deg) brightness(100%) contrast(110%)' } : { filter: 'brightness(0) invert(1)' }}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}