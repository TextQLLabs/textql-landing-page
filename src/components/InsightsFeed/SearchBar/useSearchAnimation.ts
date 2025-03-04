import { useState, useEffect, useCallback, useRef } from 'react';

interface SearchAnimationProps {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
  isInitialLoad: boolean;
}

export const useSearchAnimation = ({
  industryLabel,
  insightsCount,
  onAnimationComplete,
  isInitialLoad,
}: SearchAnimationProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [dotCount, setDotCount] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'analyzing' | 'results'>('analyzing');

  // Create a ref to always have the latest currentPhase
  const currentPhaseRef = useRef(currentPhase);
  useEffect(() => {
    currentPhaseRef.current = currentPhase;
  }, [currentPhase]);

  const resetState = useCallback(() => {
    setShowResults(false);
    setTypedText('');
    setDotCount(0);
    setShowPulse(false);
    setIsAnalyzing(false);
    setIsSearchActive(true);
    setCurrentPhase('analyzing');
  }, []);

  // Reset animation state when industry changes
  useEffect(() => {
    resetState();
  }, [industryLabel, resetState]);

  // Initial activation
  useEffect(() => {
    const timer = setTimeout(() => setIsSearchActive(true), 500);
    return () => clearTimeout(timer);
  }, [isInitialLoad]);

  // Single effect that now no longer depends on currentPhase
  useEffect(() => {
    if (!isSearchActive) return;

    let isAnimating = true;
    let currentIndex = 0;
    let dotInterval: NodeJS.Timeout | null = null;

    const getTargetText = () => {
      return currentPhaseRef.current === 'analyzing'
        ? `Ana is analyzing your ${industryLabel} data`
        : `Ana has found ${insightsCount} insights in your ${industryLabel} data`;
    };

    const typeText = () => {
      const targetText = getTargetText();
      if (currentIndex <= targetText.length) {
        setTypedText(targetText.slice(0, currentIndex));
        currentIndex++;
        return false;
      }
      return true;
    };

    const startResultsPhase = () => {
      if (!isAnimating) return;
      setShowPulse(false);
      setCurrentPhase('results'); // updates ref via effect above
      currentIndex = 0;
      setShowResults(true);

      const resultsInterval = setInterval(() => {
        if (!isAnimating) return;
        if (typeText()) {
          clearInterval(resultsInterval);
          onAnimationComplete();
        }
      }, 30);
    };

    const typeInterval = setInterval(() => {
      if (!isAnimating) return;

      // We check the ref instead of state (so the effect doesn’t re-run)
      if (currentPhaseRef.current === 'analyzing') {
        setIsAnalyzing(true);
        if (typeText()) {
          clearInterval(typeInterval);

          dotInterval = setInterval(() => {
            if (!isAnimating) return;
            setDotCount(prev => (prev + 1) % 4);
          }, 500);

          setTimeout(() => {
            if (!isAnimating) return;
            if (dotInterval) clearInterval(dotInterval);
            setShowPulse(true);
            setIsAnalyzing(false);

            setTimeout(() => {
              startResultsPhase();
            }, 1500);
          }, 2000);
        }
      }
    }, 30);

    return () => {
      isAnimating = false;
      clearInterval(typeInterval);
      if (dotInterval) clearInterval(dotInterval);
    };
  }, [isSearchActive, industryLabel, insightsCount, onAnimationComplete]);

  return {
    isSearchActive,
    typedText,
    dotCount,
    showPulse,
    showResults,
    isAnalyzing,
  };
};
