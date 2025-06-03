import { useState, useRef, useEffect } from 'react';
import { workflows } from '../../../../data/workflows';
import { MobileWorkflowCard } from './MobileWorkflowCard';

const FEATURED_WORKFLOWS = workflows.filter(w => w.image && w.industryId).slice(0, 6);

export function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // If dragged more than 50px, change slide
    if (Math.abs(translateX) > 50) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < FEATURED_WORKFLOWS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < FEATURED_WORKFLOWS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setTranslateX(0);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    return () => document.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, translateX, currentIndex]);

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {FEATURED_WORKFLOWS.map((workflow, index) => (
            <div
              key={workflow.id}
              className="w-full flex-shrink-0 px-2"
            >
              <MobileWorkflowCard workflow={workflow} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {FEATURED_WORKFLOWS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-[#2A3B35]' 
                : 'bg-[#2A3B35]/20'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Mobile CTA Button */}
      <div className="mt-8 text-center">
        <a 
          href="/workflows" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A3B35] text-white text-sm font-medium rounded-lg hover:bg-[#4A665C] transition-colors"
        >
          <span>Explore All Workflows</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
} 