import React from 'react';
import { cn } from '../../utils/cn';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { useGlobalTheme } from '../GlobalThemeProvider';
import { WaveBackground } from '../animations';
import { Carousel, MobileCarousel } from './index';

export interface HeroSectionProps {
  // Layout options
  layout?: 'single' | 'two-column' | 'content-right' | 'content-left' | 'content-left-wide';
  
  // Height calculation
  minHeight?: 'auto' | 'screen' | 'large' | 'medium';
  
  // Background options
  showWaveBackground?: boolean;
  waveScale?: number;
  waveCoverage?: number;
  
  // Content slots
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  
  // Logo carousel options
  showLogoCarousel?: boolean;
  logoCarouselTitle?: string;
  logoItems?: Array<{ src: string; alt: string; }>;
  
  // Mobile layout options
  mobileStackOrder?: 'left-top' | 'right-top';
  mobileHideLeft?: boolean;
  mobileHideRight?: boolean;
  
  // Styling
  className?: string;
  contentClassName?: string;
  
  // Debug
  debug?: boolean;
}

export function HeroSection({
  layout = 'single',
  minHeight = 'screen',
  showWaveBackground = true,
  waveScale = 0.8,
  waveCoverage = 1.2,
  leftContent,
  rightContent,
  children,
  showLogoCarousel = false,
  logoCarouselTitle = "Ana finds insights in your existing data stack",
  logoItems = [],
  mobileStackOrder = 'left-top',
  mobileHideLeft = false,
  mobileHideRight = false,
  className,
  contentClassName,
  debug = false,
}: HeroSectionProps) {
  const { isLightMode } = useGlobalTheme();
  const { navbarHeight, isStable } = useNavbarHeight();
  


  // Calculate dynamic height based on screen and navbar
  const getHeightStyles = () => {
    const navbarOffset = `${navbarHeight}px`;
    
    switch (minHeight) {
      case 'screen':
        return {
          height: `calc(100vh - ${navbarOffset})`,
          minHeight: `calc(100vh - ${navbarOffset})`,
        };
      case 'large':
        return {
          minHeight: `calc(80vh - ${navbarOffset})`,
        };
      case 'medium':
        return {
          minHeight: `calc(60vh - ${navbarOffset})`,
        };
      case 'auto':
      default:
        return {
          paddingTop: navbarOffset,
          minHeight: '500px',
        };
    }
  };

  // Layout classes based on layout type
  const getLayoutClasses = () => {
    switch (layout) {
      case 'two-column':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center';
      case 'content-right':
        return 'grid grid-cols-1 lg:grid-cols-[1fr,clamp(400px,50vw,600px)] gap-8 lg:gap-16 items-center';
      case 'content-left':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-start';
      case 'content-left-wide':
        return 'grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6 lg:gap-8 xl:gap-10 items-start';
      case 'single':
      default:
        return 'flex flex-col justify-center items-center text-center';
    }
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-transparent transition-all duration-300 ease-out',
        debug && 'border-4 border-yellow-500',
        className
      )}
      style={getHeightStyles()}
    >
      {/* Background Animation */}
      {showWaveBackground && (
        <div className={cn(
          'absolute inset-0 z-0',
          debug && 'border-4 border-purple-500'
        )}>
          <WaveBackground 
            theme={isLightMode ? 'light' : 'dark'} 
            scale={waveScale} 
            coverage={waveCoverage} 
          />
        </div>
      )}

      {/* Main Content Container - Full flex layout */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Hero Content Section - Takes available space */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Layout */}
          <div className="hidden lg:flex w-full flex-1">
            <div className={cn(
              'w-full flex items-center justify-center px-4 md:px-6 max-w-7xl mx-auto',
              debug && 'border-2 border-green-500'
            )}>
              {layout === 'single' ? (
                <div className={cn(
                  'flex flex-col justify-center items-center text-center w-full',
                  contentClassName
                )}>
                  {children}
                </div>
              ) : (
                <div className={cn(getLayoutClasses(), contentClassName)}>
                  {leftContent && (
                    <div className={cn(
                      'flex flex-col justify-center',
                      debug && 'border-2 border-blue-500'
                    )}>
                      {leftContent}
                    </div>
                  )}
                  {rightContent && (
                    <div className={cn(
                      'flex flex-col justify-center',
                      debug && 'border-2 border-red-500'
                    )}>
                      {rightContent}
                    </div>
                  )}
                  {children && !leftContent && !rightContent && children}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col flex-1 relative z-10 px-4 py-4 min-h-0">
            <div className={cn(
              'flex flex-col flex-1 text-center items-center w-full min-h-0 gap-8 py-8',
              debug && 'border-2 border-orange-500',
              contentClassName
            )}>
              {/* Top content section */}
              <div className="w-full">
                {mobileStackOrder === 'left-top' ? (
                  <>
                    {/* Left content on top */}
                    {leftContent && !mobileHideLeft && (
                      <div className="w-full">
                        {leftContent}
                      </div>
                    )}
                    
                    {/* Right content below */}
                    {rightContent && !mobileHideRight && (
                      <div className="w-full">
                        {rightContent}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Right content on top */}
                    {rightContent && !mobileHideRight && (
                      <div className="w-full">
                        {rightContent}
                      </div>
                    )}
                    
                    {/* Left content below */}
                    {leftContent && !mobileHideLeft && (
                      <div className="w-full">
                        {leftContent}
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Middle content - children (videos) with flex-1 to center */}
              {children && (
                <div className="w-full flex items-center justify-center flex-1">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo Carousel Section - Stuck to bottom */}
        {showLogoCarousel && logoItems.length > 0 && (
          <div className={cn(
            'w-full mt-auto pb-4 pt-4 lg:pb-8 lg:pt-8',
            isStable ? 'animate-slide-up animation-delay-600' : 'opacity-0',
            debug && 'border-2 border-orange-500'
          )}>
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <p className={cn(
                'text-sm font-medium mb-4 text-center lg:text-left',
                isLightMode ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'
              )}>
                {logoCarouselTitle}
              </p>
              
              {/* Desktop Carousel */}
              <div className="hidden lg:block logo-carousel">
                <Carousel 
                  items={logoItems} 
                  gradientColor={isLightMode ? '#F7F7F7' : '#000000'} 
                  theme={isLightMode ? 'light' : 'dark'} 
                />
              </div>
              
              {/* Mobile Carousel */}
              <div className="lg:hidden overflow-hidden logo-carousel">
                <MobileCarousel 
                  items={logoItems} 
                  speed={30} 
                  gradientColor={isLightMode ? '#F7F7F7' : '#000000'} 
                  theme={isLightMode ? 'light' : 'dark'} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Export common layout presets
export const heroLayouts = {
  single: { layout: 'single' as const },
  twoColumn: { layout: 'two-column' as const },
  contentRight: { layout: 'content-right' as const },
  contentLeft: { layout: 'content-left' as const },
} as const;

// Export common height presets
export const heroHeights = {
  fullScreen: { minHeight: 'screen' as const },
  large: { minHeight: 'large' as const },
  medium: { minHeight: 'medium' as const },
  auto: { minHeight: 'auto' as const },
} as const;