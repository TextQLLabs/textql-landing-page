import React from 'react';
import { IconLogo } from '../../Logo';

interface SearchIconProps {
  showResults: boolean;
  showPulse: boolean;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ showResults, showPulse }) => (
  <div className="relative mr-4 md:mr-6">
    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
      <IconLogo className="w-4 h-4 md:w-6 md:h-6" color="#B8D8D0" />
      {!showResults && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconLogo className="w-4 h-4 md:w-6 md:h-6 animate-ping" color="rgba(184, 216, 208, 0.3)" />
          </div>
          <div className="absolute inset-[-4px] border border-[#B8D8D0]/50 animate-pulse"></div>
          <div className="absolute inset-[-6px] md:inset-[-8px] border border-[#B8D8D0]/30 animate-pulse delay-75"></div>
        </>
      )}
      {showPulse && (
        <>
          <div className="absolute inset-[-12px] md:inset-[-16px] border-2 border-[#B8D8D0] rounded-full animate-ping"></div>
          <div className="absolute inset-[-24px] md:inset-[-32px] border-2 border-[#B8D8D0]/50 rounded-full animate-ping delay-75"></div>
          <div className="absolute inset-[-36px] md:inset-[-48px] border-2 border-[#B8D8D0]/30 rounded-full animate-ping delay-150"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconLogo className="w-4 h-4 md:w-6 md:h-6 animate-pulse" color="rgba(184, 216, 208, 0.3)" />
          </div>
        </>
      )}
    </div>
  </div>
);