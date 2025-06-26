import React, { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";
import { INDUSTRIES } from "./constants";

interface IndustryPillsProps {
  selectedIndustry: (typeof INDUSTRIES)[0];
  onSelect: (industry: (typeof INDUSTRIES)[0]) => void;
  theme?: 'light' | 'dark';
  enabledIndustries?: Set<string>;
  onDropdownChange?: (isOpen: boolean) => void;
  showDebugBorders?: boolean;
}

// Memoized industry button to prevent unnecessary re-renders
const IndustryButton = memo(
  ({
    industry,
    isSelected,
    onClick,
    theme = 'dark'
  }: {
    industry: (typeof INDUSTRIES)[0];
    isSelected: boolean;
    onClick: () => void;
    theme?: 'light' | 'dark';
  }) => (
    <button
      key={industry.id}
      onClick={onClick}
      className={`
      group relative
      flex items-center justify-center gap-1.5 px-3 py-1.5 flex-1
      text-sm font-light transition-all duration-300 ease-out
      rounded-none whitespace-nowrap
      hover:scale-105 hover:shadow-lg
      ${
        isSelected
          ? theme === 'light'
            ? "bg-[#2A3B35] text-white hover:bg-[#2A3B35]/90 shadow-md" // Light mode selected
            : "bg-[#B8D8D0] text-black hover:bg-[#B8D8D0]/90 shadow-md" // Dark mode selected
          : theme === 'light'
            ? "bg-transparent text-[#4A665C] border border-[#4A665C]/20 hover:border-[#4A665C]/60 hover:bg-[#4A665C]/5" // Light mode unselected
            : "bg-transparent text-[#729E8C] border border-[#729E8C]/20 hover:border-[#729E8C]/60 hover:bg-[#729E8C]/5" // Dark mode unselected
      }
    `}
    >
      {React.createElement(industry.icon, { className: "w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" })}
      <span className="transition-all duration-300 group-hover:tracking-wide">{industry.label}</span>
    </button>
  )
);

IndustryButton.displayName = "IndustryButton";

// Memoized mobile dropdown button to prevent unnecessary re-renders
const MobileDropdownButton = memo(
  ({
    industry,
    isOpen,
    onClick,
    theme = 'dark'
  }: {
    industry: (typeof INDUSTRIES)[0];
    isOpen: boolean;
    onClick: () => void;
    theme?: 'light' | 'dark';
  }) => (
    <button
      onClick={onClick}
      onTouchEnd={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm text-sm font-medium touch-manipulation relative z-30 ${
        theme === 'light' 
          ? 'bg-[#2A3B35] text-white active:bg-[#2A3B35]/90'
          : 'bg-[#B8D8D0] text-black active:bg-[#B8D8D0]/90'
      }`}
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div className="flex items-center gap-1.5 pointer-events-none">
        {React.createElement(industry.icon, { className: "w-3.5 h-3.5" })}
        {industry.label}
      </div>
      <ChevronDown
        className={`w-4 h-4 transition-transform pointer-events-none ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  )
);

MobileDropdownButton.displayName = "MobileDropdownButton";

export const IndustryPills: React.FC<IndustryPillsProps> = ({
  selectedIndustry,
  onSelect,
  theme = 'dark',
  enabledIndustries,
  onDropdownChange,
  showDebugBorders = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use useCallback to prevent recreating these functions on each render
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      onDropdownChange?.(newState);
      return newState;
    });
  }, [onDropdownChange]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onDropdownChange?.(false);
  }, [onDropdownChange]);

  const handleSelect = useCallback(
    (industry: (typeof INDUSTRIES)[0]) => {
      onSelect(industry);
      setIsOpen(false);
      onDropdownChange?.(false);
    },
    [onSelect, onDropdownChange]
  );

  return (
    <>
      {/* Mobile View - Dropdown */}
      <div className={`md:hidden relative ${showDebugBorders ? 'border-2 border-yellow-500' : ''}`} 
           style={{ 
             isolation: 'isolate',
             zIndex: 800,
             transform: 'translateZ(0)', // Force stacking context
             ...(isOpen ? { paddingBottom: '160px' } : {})
           }}>
        <div className="relative z-50 overflow-visible">
          <MobileDropdownButton
            industry={selectedIndustry}
            isOpen={isOpen}
            onClick={toggleDropdown}
            theme={theme}
          />
          
          {isOpen && (
            <>
              {/* Backdrop - use higher z-index and ensure it's touchable */}
              <div 
                className="fixed inset-0 z-[90]" 
                onClick={closeDropdown}
                onTouchStart={closeDropdown}
                style={{ touchAction: 'auto' }}
              />
              {/* Dropdown menu - higher z-index than backdrop */}
              <div className={`absolute top-full left-0 right-0 mt-1 z-[999] rounded-sm shadow-lg ${
                theme === 'light' 
                  ? 'bg-white border border-[#2A3B35]/20' 
                  : 'bg-[#0F1712] border border-[#B8D8D0]/20'
              }`}
              style={{ 
                // Ensure the dropdown is above other elements and touchable
                position: 'absolute',
                touchAction: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}>
                <div className="py-1 max-h-[60vh] overflow-y-auto">
                  {INDUSTRIES.filter(industry => !enabledIndustries || enabledIndustries.has(industry.id)).map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => handleSelect(industry)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        handleSelect(industry);
                      }}
                      className={`
                        w-full flex items-center gap-1.5 px-3 py-2
                        text-sm font-medium transition-colors
                        ${
                          selectedIndustry.id === industry.id
                            ? theme === 'light' 
                              ? "bg-[#2A3B35]/10 text-[#2A3B35]"
                              : "bg-[#B8D8D0]/10 text-[#B8D8D0]"
                            : theme === 'light'
                              ? "text-[#4A665C] hover:bg-[#2A3B35]/5"
                              : "text-[#729E8C] hover:bg-[#B8D8D0]/5"
                        }
                      `}
                    >
                      {React.createElement(industry.icon, {
                        className: "w-3.5 h-3.5",
                      })}
                      {industry.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop View - Full width like search bar */}
      <div className="hidden md:block">
        <div className="flex gap-2">
          {INDUSTRIES.filter(industry => !enabledIndustries || enabledIndustries.has(industry.id)).map((industry) => (
            <IndustryButton
              key={industry.id}
              industry={industry}
              isSelected={selectedIndustry.id === industry.id}
              onClick={() => handleSelect(industry)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(IndustryPills);
