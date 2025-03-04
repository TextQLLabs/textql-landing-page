import { useState, useEffect } from 'react';

interface SearchAnimationConfig {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
}

export const useSearchAnimation = ({ 
  industryLabel, 
  insightsCount, 
  onAnimationComplete 
}: SearchAnimationConfig) => {
  const [state, setState] = useState({
    isActive: false,
    text: '',
    dots: 0,
    showPulse: false,
    showResults: false,
    isAnalyzing: false
  });

  useEffect(() => {
    // Initial activation
    const timer = setTimeout(() => setState(s => ({ ...s, isActive: true })), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!state.isActive) return;

    let isAnimating = true;
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let dotInterval: NodeJS.Timeout;

    const analyzingText = `Ana is analyzing your ${industryLabel} data`;
    const resultsText = `Ana has found ${insightsCount} insights in your ${industryLabel} data`;

    const typeText = (text: string) => {
      if (!isAnimating) return;
      
      setState(s => ({ 
        ...s, 
        text: text.slice(0, currentIndex) 
      }));
      
      currentIndex++;
      
      if (currentIndex <= text.length) {
        typingInterval = setTimeout(() => typeText(text), 30);
      } else {
        return true;
      }
    };

    // Start analyzing phase
    setState(s => ({ ...s, isAnalyzing: true }));
    typeText(analyzingText);

    // After analyzing text completes
    setTimeout(() => {
      if (!isAnimating) return;

      // Start dot animation
      dotInterval = setInterval(() => {
        if (!isAnimating) return;
        setState(s => ({ ...s, dots: (s.dots + 1) % 4 }));
      }, 500);

      // Show pulse after 2 seconds
      setTimeout(() => {
        if (!isAnimating) return;
        clearInterval(dotInterval);
        setState(s => ({ ...s, showPulse: true, isAnalyzing: false }));

        // Show results after pulse
        setTimeout(() => {
          if (!isAnimating) return;
          currentIndex = 0;
          setState(s => ({ 
            ...s, 
            showPulse: false,
            showResults: true,
            text: ''
          }));

          // Type results text
          typeText(resultsText);
          
          // Complete animation
          setTimeout(() => {
            if (!isAnimating) return;
            onAnimationComplete();
          }, resultsText.length * 30 + 500);
        }, 1500);
      }, 2000);
    }, analyzingText.length * 30 + 500);

    return () => {
      isAnimating = false;
      clearTimeout(typingInterval);
      clearInterval(dotInterval);
    };
  }, [state.isActive, industryLabel, insightsCount, onAnimationComplete]);

  return state;
};