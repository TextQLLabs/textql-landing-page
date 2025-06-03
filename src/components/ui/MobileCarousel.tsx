import { useEffect, useState } from 'react';

interface MobileCarouselProps {
  items: Array<{
    src: string;
    alt: string;
  }>;
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export function MobileCarousel({
  items,
  speed = 30,
  className = '',
  itemClassName = ''
}: MobileCarouselProps) {
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when items change
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [items]);

  // Inject CSS animation styles
  useEffect(() => {
    const styleId = 'mobile-carousel-animation';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.innerHTML = `
      @keyframes mobile-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .mobile-carousel-scroll {
        animation: mobile-scroll ${speed}s linear infinite;
        will-change: transform;
      }
    `;

    return () => {
      // Cleanup on unmount if needed
    };
  }, [speed]);

  return (
    <div className={`w-full overflow-hidden bg-black/40 backdrop-blur-md ${className}`}>
      <div className="relative">
        <div 
          key={animationKey}
          className="flex gap-8 items-center mobile-carousel-scroll"
        >
          {/* Only duplicate once for mobile to reduce DOM load */}
          {[...items, ...items].map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={`h-6 w-auto max-w-20 object-contain opacity-60 grayscale flex-shrink-0 ${itemClassName}`}
              style={{ filter: 'brightness(0) invert(1)' }}
              loading="lazy"
            />
          ))}
        </div>
        
        {/* Simplified gradients for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  );
} 