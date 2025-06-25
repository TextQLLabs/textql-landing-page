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
  theme?: 'light' | 'dark';
}

// Memoize sub-components for better performance
const MemoizedWaveRipples = memo(WaveRipples);
const MemoizedSearchIcon = memo(SearchIcon);
const MemoizedSearchText = memo(SearchText);

// Memoize the pulse animation background to prevent re-renders
const PulseBackground = memo(({ theme = 'dark' }: { theme?: 'light' | 'dark' }) => (
  <div className={`absolute inset-0 animate-pulse ${
    theme === 'light' ? 'bg-[#2A3B35]/5' : 'bg-[#B8D8D0]/5'
  }`} />
));

PulseBackground.displayName = 'PulseBackground';

export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = memo((props) => {
  const { theme = 'dark' } = props;
  const {
    isSearchActive,
    typedText,
    dotCount,
    showPulse,
    showResults,
    isAnalyzing,
  } = useSearchAnimation(props);

  // DEBUG: Force isSearchActive to true
  const forceActive = true;
  
  // DEBUG: Log when industry changes
  React.useEffect(() => {
    console.log('SearchBar industry changed to:', props.industryLabel);
  }, [props.industryLabel]);


  // Memoize class strings to prevent recalculation
  const containerClasses = React.useMemo(() => `
    w-full h-full
    ${theme === 'light' ? 'bg-white border-2 border-[#2A3B35]/30' : 'bg-[#0F1712] border-2 border-[#B8D8D0]/30'} 
    overflow-hidden whitespace-nowrap
    transition-all duration-300 ease-out
    transform origin-center shadow-lg ${theme === 'light' ? 'shadow-[#2A3B35]/10' : 'shadow-[#B8D8D0]/10'}
    ${forceActive || isSearchActive ? 'scale-100 opacity-100' : 'scale-100 opacity-50'}
    ${showPulse ? theme === 'light' ? 'ring-[6px] md:ring-[8px] ring-[#2A3B35]/20 ring-offset-4 ring-offset-[#F7F7F7]' : 'ring-[6px] md:ring-[8px] ring-[#B8D8D0]/20 ring-offset-4 ring-offset-black' : ''}
    hover:border-[#B8D8D0]/50 hover:shadow-xl
    ${theme === 'light' ? 'hover:shadow-[#2A3B35]/20' : 'hover:shadow-[#B8D8D0]/20'}
    cursor-pointer group
  `, [isSearchActive, showPulse, theme]);

  const insightsFoundClasses = React.useMemo(() => `
    absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2
    transition-all duration-300 ease-out
    ${showPulse ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
  `, [showPulse]);

  return (
    <div 
      className="h-[60px] md:h-[80px] relative animate-fade-in-up" 
      style={{ width: '600px', minWidth: '600px' }}
    >
      {showPulse && <MemoizedWaveRipples />}
      
      <div className={containerClasses} data-debug="search-bar-container">
        {showPulse && <PulseBackground theme={theme} />}

        <div className="flex items-center h-full px-4 md:px-8 relative z-10">
          <MemoizedSearchIcon showResults={showResults} showPulse={showPulse} theme={theme} />
          <MemoizedSearchText
            text={typedText}
            showPulse={showPulse}
            showResults={showResults}
            isAnalyzing={isAnalyzing}
            dotCount={dotCount}
            industryLabel={props.industryLabel}
            theme={theme}
          />
        </div>
      </div>

      {/* Insights Found Message */}
      <div className={insightsFoundClasses}>
        <div className={`backdrop-blur-sm border px-4 md:px-6 py-1.5 md:py-2 ${
          theme === 'light' 
            ? 'bg-white/90 border-[#2A3B35]/30' 
            : 'bg-[#04251C] border-[#B8D8D0]/30'
        }`}>
          <span className={`text-sm md:text-base font-semibold tracking-wide ${
            theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'
          }`}>
            Insights Found!
          </span>
        </div>
      </div>
    </div>
  );
});

AnimatedSearchBar.displayName = 'AnimatedSearchBar';