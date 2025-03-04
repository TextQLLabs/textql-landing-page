import React from 'react';
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

export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = (props) => {
  const {
    isSearchActive,
    typedText,
    dotCount,
    showPulse,
    showResults,
    isAnalyzing,
  } = useSearchAnimation(props);

  return (
    <div className="h-[60px] md:h-[80px] flex justify-center relative">
      {showPulse && <WaveRipples />}

      <div 
        className={`
          absolute inset-0
          bg-[#0A1F1C] border-2 border-[#B8D8D0]/30 
          overflow-hidden whitespace-nowrap
          transition-all duration-500 ease-out
          transform origin-center shadow-lg shadow-[#B8D8D0]/10
          ${isSearchActive ? 'scale-100 opacity-100' : 'scale-y-0 opacity-0'}
          ${showPulse ? 'ring-[6px] md:ring-[8px] ring-[#B8D8D0]/20 ring-offset-4 ring-offset-black' : ''}
        `}
      >
        {showPulse && (
          <div className="absolute inset-0 bg-[#B8D8D0]/5 animate-pulse" />
        )}

        <div className="flex items-center h-full px-4 md:px-8 relative z-10">
          <SearchIcon showResults={showResults} showPulse={showPulse} />
          <SearchText
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
      <div 
        className={`
          absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2
          transition-all duration-500 ease-out
          ${showPulse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="bg-[#04251C] backdrop-blur-sm border border-[#B8D8D0]/30 px-4 md:px-6 py-1.5 md:py-2">
          <span className="text-sm md:text-base text-[#B8D8D0] font-semibold tracking-wide">
            Insights Found!
          </span>
        </div>
      </div>
    </div>
  );
}