import React, { useEffect } from 'react';
import { Search } from 'lucide-react';

interface StaticSearchBarProps {
  industryLabel: string;
  insightsCount: number;
  onAnimationComplete: () => void;
  theme?: 'light' | 'dark';
}

export const StaticSearchBar: React.FC<StaticSearchBarProps> = ({
  industryLabel,
  insightsCount,
  onAnimationComplete,
  theme = 'dark'
}) => {
  // Immediately call completion callback since there's no animation
  useEffect(() => {
    onAnimationComplete();
  }, [onAnimationComplete]);

  return (
    <div className="w-full">
      <div className={`
        relative flex items-center w-full h-12 px-4 rounded-lg border
        ${theme === 'dark' 
          ? 'bg-[#0F1712] border-[#B8D8D0]/20 text-[#B8D8D0]' 
          : 'bg-white border-[#2A3B35]/20 text-[#2A3B35]'
        }
      `}>
        <Search className={`w-4 h-4 mr-3 ${
          theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]'
        }`} />
        
        <div className="flex-1">
          <span className={`text-sm ${
            theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
          }`}>
            Search {industryLabel} insights
          </span>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded ${
          theme === 'dark' 
            ? 'bg-[#B8D8D0]/10 text-[#729E8C]' 
            : 'bg-[#2A3B35]/10 text-[#4A665C]'
        }`}>
          {insightsCount} insights
        </div>
      </div>
    </div>
  );
};