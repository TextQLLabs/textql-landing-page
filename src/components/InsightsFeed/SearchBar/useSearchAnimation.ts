import { useState, useEffect, useCallback, useRef } from 'react';

interface SearchAnimationProps {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
  isInitialLoad: boolean;
}

// Animation timing constants - Much faster
const ANIMATION_FRAME_INTERVAL = 20; // Faster typing
const DOT_INTERVAL = 200; // Faster dots
const PULSE_DELAY = 800; // Much shorter delay before pulse
const RESULTS_DELAY = 600; // Much shorter delay for results

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
  const hasAnimatedOnceRef = useRef(false);
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

  // Handle industry changes - only update text, don't restart animation
  // DISABLED TO DEBUG FINANCE ISSUE
  // useEffect(() => {
  //   // If animation has completed, just update the final text without restarting
  //   if (hasAnimatedOnceRef.current && showResults) {
  //     const finalText = "Here's what Ana found";
  //     setTypedText(finalText);
  //   }
  //   return cleanupAnimations;
  // }, [industryLabel, showResults, cleanupAnimations]);

  // Initial activation
  useEffect(() => {
    // FORCE ACTIVATION - ALWAYS START
    setIsSearchActive(true);
    hasAnimatedOnceRef.current = false; // Reset the animation lock
    return cleanupAnimations;
  }, [cleanupAnimations]);

  // Main animation effect
  useEffect(() => {
    if (!isSearchActive || hasAnimatedOnceRef.current) return;

    let currentIndex = 0;
    let lastFrameTime = 0;

    const getTargetText = () => {
      return currentPhaseRef.current === 'analyzing'
        ? `Ana is analyzing your ${industryLabelRef.current} data`
        : "Here's what Ana found";
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
      
      // Stop animation loop first
      isAnimatingRef.current = false;
      
      // Clean up all timers and animation frames
      cleanupAnimations();
      
      setShowPulse(false);
      setCurrentPhase('results');
      setShowResults(true);
      
      // Set the final text immediately without typing animation
      const finalText = "Here's what Ana found";
      setTypedText(finalText);
      
      // Mark as completed to prevent restart
      hasAnimatedOnceRef.current = true;
      
      // Delay showing cards slightly after text change to prevent flash
      setTimeout(() => {
        onAnimationComplete();
      }, 100);
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
