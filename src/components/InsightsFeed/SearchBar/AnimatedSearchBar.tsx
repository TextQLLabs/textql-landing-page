import React, { memo } from 'react';
import { WaveRipples } from './WaveRipples';
import { SearchIcon } from './SearchIcon';
import { SearchText } from './SearchText';
import { useSearchAnimation } from './useSearchAnimation';

interface AnimatedSearchBarProps {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
  isInitialLoad: boolean;
}

// Memoize sub-components for better performance
const MemoizedWaveRipples = memo(WaveRipples);
const MemoizedSearchIcon = memo(SearchIcon);
const MemoizedSearchText = memo(SearchText);

// Memoize the pulse animation background to prevent re-renders
const PulseBackground = memo(() => (
  <div className="absolute inset-0 bg-[#B8D8D0]/5 animate-pulse" />
));

PulseBackground.displayName = 'PulseBackground';

export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = memo((props) => {
  const {
    isSearchActive,
    typedText,
    dotCount,
    showPulse,
    showResults,
    isAnalyzing,
  } = useSearchAnimation(props);

  // Memoize class strings to prevent recalculation
  const containerClasses = React.useMemo(() => `
    absolute inset-0
    bg-[#0A1F1C] border-2 border-[#B8D8D0]/30 
    overflow-hidden whitespace-nowrap
    transition-all duration-500 ease-out
    transform origin-center shadow-lg shadow-[#B8D8D0]/10
    ${isSearchActive ? 'scale-100 opacity-100' : 'scale-y-0 opacity-0'}
    ${showPulse ? 'ring-[6px] md:ring-[8px] ring-[#B8D8D0]/20 ring-offset-4 ring-offset-black' : ''}
  `, [isSearchActive, showPulse]);

  const insightsFoundClasses = React.useMemo(() => `
    absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2
    transition-all duration-500 ease-out
    ${showPulse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
  `, [showPulse]);

  return (
    <div className="h-[60px] md:h-[80px] flex justify-center relative">
      {showPulse && <MemoizedWaveRipples />}

      <div className={containerClasses}>
        {showPulse && <PulseBackground />}

        <div className="flex items-center h-full px-4 md:px-8 relative z-10">
          <MemoizedSearchIcon showResults={showResults} showPulse={showPulse} />
          <MemoizedSearchText
            text={typedText}
            showPulse={showPulse}
            showResults={showResults}
            isAnalyzing={isAnalyzing}
            dotCount={dotCount}
            industryLabel={props.industryLabel}
          />
        </div>
      </div>

      {/* Insights Found Message */}
      <div className={insightsFoundClasses}>
        <div className="bg-[#04251C] backdrop-blur-sm border border-[#B8D8D0]/30 px-4 md:px-6 py-1.5 md:py-2">
          <span className="text-sm md:text-base text-[#B8D8D0] font-semibold tracking-wide">
            Insights Found!
          </span>
        </div>
      </div>
    </div>
  );
});

AnimatedSearchBar.displayName = 'AnimatedSearchBar';