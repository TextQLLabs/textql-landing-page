import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { INDUSTRIES } from './constants';

interface IndustryPillsProps {
  selectedIndustry: typeof INDUSTRIES[0];
  onSelect: (industry: typeof INDUSTRIES[0]) => void;
}

export const IndustryPills: React.FC<IndustryPillsProps> = ({
  selectedIndustry,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderIndustryButton = (industry: typeof INDUSTRIES[0]) => (
    <button
      key={industry.id}
      onClick={() => {
        onSelect(industry);
        setIsOpen(false);
      }}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5
        text-sm font-medium transition-all duration-200
        rounded-sm whitespace-nowrap shrink-0
        ${selectedIndustry.id === industry.id
          ? 'bg-[#B8D8D0] text-black hover:bg-[#B8D8D0]/90' // Primary style when selected
          : 'bg-transparent text-[#B8D8D0] border border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40' // Secondary style when not selected
        }
      `}
    >
      <industry.icon className="w-3.5 h-3.5" />
      {industry.label}
    </button>
  );

  // Mobile dropdown
  const renderMobileDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-1.5 
          bg-[#B8D8D0] text-black rounded-sm text-sm font-medium"
      >
        <div className="flex items-center gap-1.5">
          <selectedIndustry.icon className="w-3.5 h-3.5" />
          {selectedIndustry.label}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-black border border-[#B8D8D0]/20 rounded-sm shadow-lg">
            <div className="py-1">
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => {
                    onSelect(industry);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-1.5 px-3 py-2
                    text-sm font-medium transition-colors
                    ${selectedIndustry.id === industry.id
                      ? 'bg-[#B8D8D0]/10 text-[#B8D8D0]'
                      : 'text-[#B8D8D0]/80 hover:bg-[#B8D8D0]/5'
                    }
                  `}
                >
                  <industry.icon className="w-3.5 h-3.5" />
                  {industry.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile View - Dropdown */}
      <div className="md:hidden">
        {renderMobileDropdown()}
      </div>

      {/* Desktop View - Horizontal Scroll */}
      <div className="hidden md:block w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 pb-2">
            {INDUSTRIES.map(renderIndustryButton)}
          </div>
        </div>
      </div>
    </>
  );
};