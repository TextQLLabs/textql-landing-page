import React from 'react';
import { IconLogo } from '../../Logo';

interface SearchIconProps {
  showResults: boolean;
  showPulse: boolean;
  theme?: 'light' | 'dark';
}

export const SearchIcon: React.FC<SearchIconProps> = ({ showResults, showPulse, theme = 'dark' }) => {
  const iconColor = theme === 'light' ? '#2A3B35' : '#B8D8D0';
  const iconColorWithOpacity = theme === 'light' ? 'rgba(42, 59, 53, 0.3)' : 'rgba(184, 216, 208, 0.3)';
  const borderColor = theme === 'light' ? '#2A3B35' : '#B8D8D0';
  
  return (
  <div className="relative mr-2 sm:mr-4 md:mr-6">
    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
      <IconLogo className="w-4 h-4 md:w-6 md:h-6 transition-all duration-300" color={iconColor} />
      {!showResults && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconLogo className="w-4 h-4 md:w-6 md:h-6 animate-ping" color={iconColorWithOpacity} />
          </div>
          <div className="absolute inset-[-4px] border animate-pulse" style={{ borderColor: `${borderColor}80` }}></div>
          <div className="absolute inset-[-6px] md:inset-[-8px] border animate-pulse delay-75" style={{ borderColor: `${borderColor}4D` }}></div>
        </>
      )}
      {showPulse && (
        <>
          <div className="absolute inset-[-12px] md:inset-[-16px] border-2 rounded-full animate-ping" style={{ borderColor }}></div>
          <div className="absolute inset-[-24px] md:inset-[-32px] border-2 rounded-full animate-ping delay-75" style={{ borderColor: `${borderColor}80` }}></div>
          <div className="absolute inset-[-36px] md:inset-[-48px] border-2 rounded-full animate-ping delay-150" style={{ borderColor: `${borderColor}4D` }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconLogo className="w-4 h-4 md:w-6 md:h-6 animate-pulse" color={iconColorWithOpacity} />
          </div>
        </>
      )}
    </div>
  </div>
  );
};