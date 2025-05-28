import { useRef, useEffect, useState } from 'react';

interface BannerItem {
  text: string;
  link?: string;
  icon?: string;
}

interface BannerCarouselProps {
  items: BannerItem[];
  speed?: number;
  backgroundColor?: string;
  textColor?: string;
}

export default function BannerCarousel({
  items,
  speed = 0.05,
  backgroundColor = 'bg-[#0A0A0A]',
  textColor = 'text-[#B8D8D0]'
}: BannerCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Calculate animation duration based on speed (lower speed = longer duration)
  // Adjusted formula to make animation faster
  const animationDuration = Math.round(60 / (speed * 10));
  const animationId = `banner-scroll-${Math.floor(Math.random() * 1000000)}`;
  
  // Helper function to check if icon is an image path
  const isImageIcon = (icon: string) => {
    return icon.startsWith('/') || icon.includes('.png') || icon.includes('.jpg') || icon.includes('.jpeg') || icon.includes('.svg');
  };
  
  // Inject animation CSS on mount
  useEffect(() => {
    // Create unique ID for style to avoid conflicts
    const styleId = `banner-animation-style-${animationId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Define the animation CSS
    styleElement.innerHTML = `
      @keyframes ${animationId} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .${animationId} {
        display: flex;
        width: fit-content;
        animation: ${animationId} ${animationDuration}s linear infinite;
        will-change: transform;
        animation-play-state: running !important;
      }
    `;
    
    // Mark component as ready after a small delay to ensure smooth initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [animationId, animationDuration]);
  
  // Backup JavaScript animation as a fallback
  useEffect(() => {
    if (!scrollerRef.current) return;
    
    // Set up a timer to check if the animation is working
    // This is a safety mechanism in case CSS animation fails
    const timer = setInterval(() => {
      if (scrollerRef.current) {
        const computedStyle = window.getComputedStyle(scrollerRef.current);
        
        // If animation is not running, force a restart by toggling a class
        if (computedStyle.animationPlayState !== 'running') {
          scrollerRef.current.classList.remove(animationId);
          // Force reflow
          void scrollerRef.current.offsetWidth;
          scrollerRef.current.classList.add(animationId);
        }
      }
    }, 2000);
    
    return () => clearInterval(timer);
  }, [animationId]);
  
  return (
    <div 
      className={`fixed top-3 left-0 right-0 z-50 w-full overflow-hidden ${backgroundColor} border-t border-b border-[#B8D8D0]/20 transition-opacity duration-300 ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative w-full">
        <div 
          ref={containerRef}
          className="overflow-x-hidden hide-scrollbar py-1.5 px-6"
        >
          <div 
            ref={scrollerRef}
            className={animationId}
          >
            {/* Triple duplication for smooth looping */}
            {[...items, ...items, ...items].map((item, index) => (
              <div key={index} className="flex items-center whitespace-nowrap px-4">
                {item.link ? (
                  <a 
                    href={item.link} 
                    className={`${textColor} hover:text-white text-sm font-medium transition-colors flex items-center`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {item.icon && (
                      isImageIcon(item.icon) ? (
                        <img 
                          src={item.icon} 
                          alt="" 
                          className="w-4 h-4 mr-2 object-contain mr-3"
                          style={{ 
                            filter: 'brightness(0) saturate(100%) invert(91%) sepia(8%) saturate(654%) hue-rotate(114deg) brightness(93%) contrast(92%)' 
                          }}
                        />
                      ) : (
                        <span className="mr-2">{item.icon}</span>
                      )
                    )}
                    {item.text}
                  </a>
                ) : (
                  <span className={`${textColor} text-sm font-medium flex items-center`}>
                    {item.icon && (
                      isImageIcon(item.icon) ? (
                        <img 
                          src={item.icon} 
                          alt="" 
                          className="w-4 h-4 mr-2 object-contain"
                        />
                      ) : (
                        <span className="mr-2">{item.icon}</span>
                      )
                    )}
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-${backgroundColor.replace('bg-', '')} to-transparent`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-${backgroundColor.replace('bg-', '')} to-transparent`} />
      </div>
    </div>
  );
} 