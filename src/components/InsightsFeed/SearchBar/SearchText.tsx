import React from 'react';

interface SearchTextProps {
  text: string;
  showPulse: boolean;
  showResults: boolean;
  isAnalyzing: boolean;
  dotCount: number;
  industryLabel: string;
  theme?: 'light' | 'dark';
}

export const SearchText: React.FC<SearchTextProps> = ({
  text,
  showPulse,
  showResults,
  isAnalyzing,
  dotCount,
  industryLabel,
  theme = 'dark',
}) => {
  const showDebugBorders = typeof window !== 'undefined' && localStorage.getItem('showDebugBorders') === 'true';
  const colorizeText = (text: string) => {
    const highlightColor = theme === 'light' ? '#2A3B35' : '#B8D8D0';
    
    if (isAnalyzing) {
      return text.replace(
        new RegExp(`(your) (${industryLabel}) (data)`),
        `$1 <span class="font-semibold" style="color: ${highlightColor}">$2</span> $3`
      );
    } else if (showResults) {
      return text.replace(
        new RegExp(`(found) (\\d+) (insights in your) (${industryLabel}) (data)`),
        `$1 <span class="font-semibold" style="color: ${highlightColor}">$2</span> $3 <span class="font-semibold" style="color: ${highlightColor}">$4</span> $5`
      );
    }
    return text;
  };

  return (
    <div className={`text-xs sm:text-sm md:text-xl font-medium tracking-normal md:tracking-wide flex items-center justify-between w-full ${showDebugBorders ? 'border-2 border-blue-500' : ''}`}>
      <span 
        className={`
          transition-all duration-300 group-hover:text-[#B8D8D0] flex-1
          ${showPulse 
            ? `${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'} md:scale-110 md:translate-x-2 font-semibold` 
            : `${theme === 'light' ? 'text-[#2A3B35]/80' : 'text-[#729E8C]'} scale-100 translate-x-0`
          }
          ${showDebugBorders ? 'border-2 border-orange-500' : ''}
        `}
        dangerouslySetInnerHTML={{ __html: colorizeText(text) }}
      />
      
      {/* Right side elements */}
      <div className="flex items-center ml-2 sm:ml-4">
        {!showResults && isAnalyzing && (
          <svg 
            className={`w-5 h-5 animate-spin ${theme === 'light' ? 'text-[#2A3B35]/60' : 'text-[#729E8C]/80'}`}
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!showResults && !isAnalyzing && text.length < `Ana has found insights in your ${industryLabel} data`.length && (
          <span className={`animate-pulse ${theme === 'light' ? 'text-[#2A3B35]/80' : 'text-[#729E8C]'}`}>|</span>
        )}
      </div>
    </div>
  );
}