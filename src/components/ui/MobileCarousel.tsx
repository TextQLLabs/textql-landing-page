import { useEffect, useRef } from 'react';

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Create unique animation name to avoid conflicts
    const animationName = `scroll-${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate the width of one set of logos
    const firstChild = scroller.firstElementChild as HTMLElement;
    if (!firstChild) return;
    
    // Use ResizeObserver to get accurate width
    const resizeObserver = new ResizeObserver(() => {
      const scrollWidth = firstChild.scrollWidth;
      
      // Inject keyframes with calculated width
      const styleId = `mobile-carousel-${animationName}`;
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
      styleElement.innerHTML = `
        @keyframes ${animationName} {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-${scrollWidth}px); }
        }
        
        .${animationName} {
          animation: ${animationName} ${speed}s linear infinite;
        }
      `;
      
      // Apply animation class
      scroller.className = `flex items-center ${animationName}`;
    });

    resizeObserver.observe(firstChild);

    return () => {
      resizeObserver.disconnect();
      const styleElement = document.getElementById(`mobile-carousel-${animationName}`);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [speed, items]);

  return (
    <div className={`w-full overflow-hidden bg-black/40 backdrop-blur-md ${className}`}>
      <div className="relative">
        <div ref={scrollerRef} className="flex items-center">
          {/* First set of logos */}
          <div className="flex gap-8 items-center flex-shrink-0">
            {items.map((item, index) => (
              <img
                key={`first-${index}`}
                src={item.src}
                alt={item.alt}
                className={`h-6 w-auto max-w-20 object-contain opacity-60 grayscale flex-shrink-0 ${itemClassName}`}
                style={{ filter: 'brightness(0) invert(1)' }}
                loading="lazy"
              />
            ))}
          </div>
          
          {/* Second set of logos for seamless loop */}
          <div className="flex gap-8 items-center flex-shrink-0 ml-8">
            {items.map((item, index) => (
              <img
                key={`second-${index}`}
                src={item.src}
                alt={item.alt}
                className={`h-6 w-auto max-w-20 object-contain opacity-60 grayscale flex-shrink-0 ${itemClassName}`}
                style={{ filter: 'brightness(0) invert(1)' }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        
        {/* Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  );
} 