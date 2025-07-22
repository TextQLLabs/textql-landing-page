import { useState, useEffect, useRef, useCallback } from 'react';

interface StickyScrollState {
  isSticky: boolean;
  scrollProgress: number; // 0 to 1
  isComplete: boolean;
}

interface StickyScrollOptions {
  // Offset from top when sticky behavior starts (navbar height)
  topOffset?: number;
  // Additional content height to scroll through while sticky
  additionalScrollHeight?: number;
}

interface OriginalPosition {
  width: number;
  left: number;
  paddingLeft: number;
  paddingRight: number;
}

export function useStickyScroll(options: StickyScrollOptions = {}) {
  const { topOffset = 60, additionalScrollHeight = 0 } = options;
  
  const [state, setState] = useState<StickyScrollState>({
    isSticky: false,
    scrollProgress: 0,
    isComplete: false
  });

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [triggerTop, setTriggerTop] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [originalPosition, setOriginalPosition] = useState<OriginalPosition | null>(null);
  const stickyElementRef = useRef<HTMLElement>(null);

  // Calculate total scroll distance while sticky
  const totalStickyDistance = contentHeight + additionalScrollHeight;

  // Measure elements
  const measureElements = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerTop(rect.top + window.scrollY);
    }
    
    // Capture sticky element position when not sticky
    if (stickyElementRef.current && !state.isSticky) {
      const rect = stickyElementRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(stickyElementRef.current);
      
      setOriginalPosition({
        width: rect.width,
        left: rect.left,
        paddingLeft: parseFloat(computedStyle.paddingLeft),
        paddingRight: parseFloat(computedStyle.paddingRight)
      });
    }
    
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [state.isSticky]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Start sticky when trigger element reaches topOffset from top
    const stickyStartY = triggerTop - topOffset;
    
    // End sticky after scrolling through all content
    const stickyEndY = stickyStartY + totalStickyDistance;
    
    if (scrollY < stickyStartY) {
      // Before sticky zone
      setState({
        isSticky: false,
        scrollProgress: 0,
        isComplete: false
      });
    } else if (scrollY >= stickyStartY && scrollY < stickyEndY) {
      // In sticky zone
      const progress = totalStickyDistance > 0 
        ? (scrollY - stickyStartY) / totalStickyDistance 
        : 0;
      
      setState({
        isSticky: true,
        scrollProgress: Math.min(1, Math.max(0, progress)),
        isComplete: false
      });
    } else {
      // After sticky zone
      setState({
        isSticky: false,
        scrollProgress: 1,
        isComplete: true
      });
    }
  }, [triggerTop, totalStickyDistance, topOffset]);

  // Setup resize and scroll listeners
  useEffect(() => {
    measureElements();
    handleScroll();

    const handleResize = () => {
      measureElements();
      handleScroll();
    };

    // Throttle scroll handler for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureElements, handleScroll]);

  // Re-measure when content changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      measureElements();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [measureElements]);

  return {
    state,
    triggerRef,
    contentRef,
    stickyElementRef,
    // Helper to get sticky styles
    getStickyStyles: () => {
      if (!state.isSticky) {
        return {
          position: 'relative' as const
        };
      }
      
      // When sticky, use fixed positioning with exact measurements
      return {
        position: 'fixed' as const,
        top: `${topOffset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1280px', // max-w-7xl
        paddingLeft: '1rem',
        paddingRight: '1rem',
        zIndex: 40
      };
    },
    // Helper to get inner content styles when sticky
    getInnerStyles: () => {
      return {
        paddingTop: '2rem', // Always maintain top padding for consistent spacing
        ...(state.isSticky && {
          width: '50%' // Constrain to left half when sticky
        })
      };
    }
  };
}