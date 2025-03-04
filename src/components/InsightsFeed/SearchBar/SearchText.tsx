import React from 'react';

interface SearchTextProps {
  text: string;
  showPulse: boolean;
  showResults: boolean;
  isAnalyzing: boolean;
  dotCount: number;
  industryLabel: string;
}

export const SearchText: React.FC<SearchTextProps> = ({
  text,
  showPulse,
  showResults,
  isAnalyzing,
  dotCount,
  industryLabel,
}) => {
  const colorizeText = (text: string) => {
    if (isAnalyzing) {
      return text.replace(
        new RegExp(`(your) (${industryLabel}) (data)`),
        '$1 <span class="text-[#B8D8D0] font-semibold">$2</span> $3'
      );
    } else if (showResults) {
      return text.replace(
        new RegExp(`(found) (\\d+) (insights in your) (${industryLabel}) (data)`),
        '$1 <span class="text-[#B8D8D0] font-semibold">$2</span> $3 <span class="text-[#B8D8D0] font-semibold">$4</span> $5'
      );
    }
    return text;
  };

  return (
    <div className="text-base md:text-xl font-medium tracking-wide">
      <span 
        className={`
          transition-all duration-300
          ${showPulse 
            ? 'text-[#B8D8D0] scale-110 translate-x-2 font-semibold' 
            : 'text-[#729E8C] scale-100 translate-x-0'
          }
        `}
        dangerouslySetInnerHTML={{ __html: colorizeText(text) }}
      />
      {!showResults && isAnalyzing && text === `Ana is analyzing your ${industryLabel} data` && (
        <span className="text-[#729E8C]/80">{'.'.repeat(dotCount)}</span>
      )}
      {!showResults && !isAnalyzing && text.length < `Ana has found insights in your ${industryLabel} data`.length && (
        <span className="animate-pulse ml-1 text-[#729E8C]">|</span>
      )}
    </div>
  );
}