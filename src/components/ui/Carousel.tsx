import { useEffect, useRef } from 'react';

interface CarouselProps {
  items: Array<{
    src: string;
    alt: string;
  }>;
  speed?: number;
  className?: string;
  itemClassName?: string;
}
// todo: dejitter the animation
export function Carousel({
  items,
  speed = 0.05,
  className = '',
  itemClassName = ''
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const speedRef = useRef(speed);

  // Update speedRef when speed prop changes
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!scrollRef.current) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Use the speed from props instead of calculating based on viewport
      const newScrollLeft = scrollRef.current.scrollLeft + speedRef.current * deltaTime;

      if (newScrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      } else {
        scrollRef.current.scrollLeft = newScrollLeft;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full overflow-hidden bg-transparent ${className}`}>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-hidden scrollbar-hide items-center"
        >
          {[...items, ...items].map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={`h-8 w-auto max-w-24 object-contain opacity-60 grayscale hover:opacity-100 transition-opacity ${itemClassName}`}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          ))}
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent" />
      </div>
    </div>
  );
}