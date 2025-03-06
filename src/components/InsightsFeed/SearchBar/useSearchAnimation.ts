import { useState, useEffect, useCallback, useRef } from 'react';

interface SearchAnimationProps {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
  isInitialLoad: boolean;
}

// Animation timing constants
const ANIMATION_FRAME_INTERVAL = 30;
const DOT_INTERVAL = 500;
const PULSE_DELAY = 2000;
const RESULTS_DELAY = 1500;

export const useSearchAnimation = ({
  industryLabel,
  insightsCount,
  onAnimationComplete,
  isInitialLoad,
}: SearchAnimationProps) => {
  // Animation states
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [dotCount, setDotCount] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'analyzing' | 'results'>('analyzing');

  // Refs for stable values across renders
  const currentPhaseRef = useRef(currentPhase);
  const isAnimatingRef = useRef(true);
  const industryLabelRef = useRef(industryLabel);
  const insightsCountRef = useRef(insightsCount);
  const animationTimersRef = useRef<{
    dotTimer: number | null;
    pulseTimer: number | null;
    resultsTimer: number | null;
    rafId: number | null;
  }>({
    dotTimer: null,
    pulseTimer: null,
    resultsTimer: null,
    rafId: null,
  });

  // Update refs when props change
  useEffect(() => {
    currentPhaseRef.current = currentPhase;
    industryLabelRef.current = industryLabel;
    insightsCountRef.current = insightsCount;
  }, [currentPhase, industryLabel, insightsCount]);

  // Cleanup function to cancel all animations
  const cleanupAnimations = useCallback(() => {
    const timers = animationTimersRef.current;
    isAnimatingRef.current = false;

    if (timers.dotTimer) cancelAnimationFrame(timers.dotTimer);
    if (timers.pulseTimer) clearTimeout(timers.pulseTimer);
    if (timers.resultsTimer) {
      typeof timers.resultsTimer === 'number' 
        ? cancelAnimationFrame(timers.resultsTimer) 
        : clearTimeout(timers.resultsTimer);
    }
    if (timers.rafId) cancelAnimationFrame(timers.rafId);

    // Reset all timers
    timers.dotTimer = null;
    timers.pulseTimer = null;
    timers.resultsTimer = null;
    timers.rafId = null;
  }, []);

  // Reset state for new animation
  const resetState = useCallback(() => {
    cleanupAnimations();
    
    setShowResults(false);
    setTypedText('');
    setDotCount(0);
    setShowPulse(false);
    setIsAnalyzing(false);
    setCurrentPhase('analyzing');
    setIsSearchActive(false);
    
    // Delay starting new animation to ensure clean state
    setTimeout(() => {
      isAnimatingRef.current = true;
      setIsSearchActive(true);
    }, 50);
  }, [cleanupAnimations]);

  // Handle industry changes
  useEffect(() => {
    resetState();
    return cleanupAnimations;
  }, [industryLabel, resetState, cleanupAnimations]);

  // Initial activation
  useEffect(() => {
    if (!isInitialLoad) return;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      if (currentTime - startTime >= 500) {
        setIsSearchActive(true);
        animationTimersRef.current.rafId = null;
        return;
      }
      animationTimersRef.current.rafId = requestAnimationFrame(animate);
    };
    
    animationTimersRef.current.rafId = requestAnimationFrame(animate);
    return cleanupAnimations;
  }, [isInitialLoad, cleanupAnimations]);

  // Main animation effect
  useEffect(() => {
    if (!isSearchActive) return;

    let currentIndex = 0;
    let lastFrameTime = 0;

    const getTargetText = () => {
      return currentPhaseRef.current === 'analyzing'
        ? `Ana is analyzing your ${industryLabelRef.current} data`
        : `Ana has found ${insightsCountRef.current} insights in your ${industryLabelRef.current} data`;
    };

    const typeText = (timestamp: number) => {
      if (!isAnimatingRef.current) return true;

      if (timestamp - lastFrameTime >= ANIMATION_FRAME_INTERVAL) {
        const targetText = getTargetText();
        if (currentIndex <= targetText.length) {
          setTypedText(targetText.slice(0, currentIndex));
          currentIndex++;
          lastFrameTime = timestamp;
          return false;
        }
        return true;
      }
      return false;
    };

    const startResultsPhase = () => {
      if (!isAnimatingRef.current) return;
      setShowPulse(false);
      setCurrentPhase('results');
      currentIndex = 0;
      setShowResults(true);
      lastFrameTime = 0;

      const animateResults = (timestamp: number) => {
        if (!isAnimatingRef.current) return;
        
        if (typeText(timestamp)) {
          onAnimationComplete();
          animationTimersRef.current.resultsTimer = null;
          return;
        }
        
        animationTimersRef.current.resultsTimer = requestAnimationFrame(animateResults);
      };

      animationTimersRef.current.resultsTimer = requestAnimationFrame(animateResults);
    };

    const animateTyping = (timestamp: number) => {
      if (!isAnimatingRef.current) return;

      if (currentPhaseRef.current === 'analyzing') {
        setIsAnalyzing(true);
        
        if (typeText(timestamp)) {
          // Start dot animation
          let lastDotTime = 0;
          const animateDots = (dotTimestamp: number) => {
            if (!isAnimatingRef.current) return;
            
            if (dotTimestamp - lastDotTime >= DOT_INTERVAL) {
              setDotCount(prev => (prev + 1) % 4);
              lastDotTime = dotTimestamp;
            }
            
            animationTimersRef.current.dotTimer = requestAnimationFrame(animateDots);
          };
          
          animationTimersRef.current.dotTimer = requestAnimationFrame(animateDots);

          // Schedule pulse and results
          animationTimersRef.current.pulseTimer = window.setTimeout(() => {
            if (!isAnimatingRef.current) return;
            
            if (animationTimersRef.current.dotTimer) {
              cancelAnimationFrame(animationTimersRef.current.dotTimer);
              animationTimersRef.current.dotTimer = null;
            }
            
            setShowPulse(true);
            setIsAnalyzing(false);

            animationTimersRef.current.resultsTimer = window.setTimeout(startResultsPhase, RESULTS_DELAY);
          }, PULSE_DELAY);
          
          return;
        }
      }

      animationTimersRef.current.rafId = requestAnimationFrame(animateTyping);
    };

    isAnimatingRef.current = true;
    animationTimersRef.current.rafId = requestAnimationFrame(animateTyping);

    return cleanupAnimations;
  }, [isSearchActive, onAnimationComplete, cleanupAnimations]);

  return {
    isSearchActive,
    typedText,
    dotCount,
    showPulse,
    showResults,
    isAnalyzing,
  };
};
