import { useState, useEffect, useRef } from 'react';
import { SolutionCard } from '../../../page-sections/solution-library';
import { solutions } from '../../../../data/solutions';
import { useComponentTheme } from '../../../../hooks/useComponentTheme';
import { themeGradientFromContrast } from '../../../../utils/theme-utils';

// Select featured solutions and duplicate them for continuous scrolling
const FEATURED_SOLUTIONS = [
  ...solutions.filter(s => s.image && s.industryId).slice(0, 6),
  ...solutions.filter(s => s.image && s.industryId).slice(0, 6)
];

export function Carousel() {
  const theme = useComponentTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const speedRef = useRef(0.5);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!scrollRef.current) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Adjust speed based on viewport width
      const viewportWidth = window.innerWidth;
      speedRef.current = viewportWidth * 0.00004;

      const newScrollLeft = scrollRef.current.scrollLeft + speedRef.current * deltaTime;

      // Reset scroll position when reaching halfway point to create infinite effect
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
    <div className="w-full bg-F5F9F8 py-12">
      <div className="max-w-site mx-auto px-6">
        <div className="relative">
          {/* Gradient Overlays */}
          <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${themeGradientFromContrast(theme)} to-transparent z-10`} />
          <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${themeGradientFromContrast(theme)} to-transparent z-10`} />

          {/* Carousel Content */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
          >
            {FEATURED_SOLUTIONS.map((solution, index) => (
              <div 
                key={`${solution.id}-${index}`}
                className="flex-none w-[400px]"
              >
                <SolutionCard solution={solution} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}