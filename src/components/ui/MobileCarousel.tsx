import { useEffect, useRef } from 'react';

interface MobileCarouselProps {
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

export function MobileCarousel({
  items,
  speed = 30,
  className = '',
  itemClassName = '',
  gradientColor = 'black',
  theme = 'dark'
}: MobileCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef(`mobile-scroll-${Math.floor(Math.random() * 1000000)}`);
  const animationId = animationIdRef.current;

  useEffect(() => {
    // Create unique ID for style to avoid conflicts
    const styleId = `mobile-carousel-style-${animationId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Define the animation CSS - same approach as BannerCarousel
    styleElement.innerHTML = `
      @keyframes ${animationId} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .${animationId} {
        display: flex;
        width: fit-content;
        animation: ${animationId} ${speed}s linear infinite;
        will-change: transform;
        animation-play-state: running !important;
      }
    `;
    
    // Apply animation class
    if (scrollerRef.current) {
      scrollerRef.current.className = `flex gap-8 items-center ${animationId}`;
    }

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [speed, animationId]);

  return (
    <div className={`w-full overflow-hidden bg-transparent ${className}`}>
      <div className="relative">
        <div 
          ref={scrollerRef}
          className={`flex gap-8 items-center ${animationId}`}
        >
          {/* Triple duplication for smooth looping - same as BannerCarousel */}
          {[...items, ...items, ...items].map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className={`h-6 w-auto max-w-20 object-contain opacity-60 grayscale flex-shrink-0 ${itemClassName}`}
              style={theme === 'light' ? { filter: 'brightness(0) saturate(100%) invert(23%) sepia(18%) saturate(1069%) hue-rotate(127deg) brightness(100%) contrast(110%)' } : { filter: 'brightness(0) invert(1)' }}
              loading="lazy"
            />
          ))}
        </div>
        
        {/* Gradients */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-${gradientColor} to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-${gradientColor} to-transparent pointer-events-none`} />
      </div>
    </div>
  );
} 