import React, { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";
import { INDUSTRIES } from "./constants";

interface IndustryPillsProps {
  selectedIndustry: (typeof INDUSTRIES)[0];
  onSelect: (industry: (typeof INDUSTRIES)[0]) => void;
  theme?: 'light' | 'dark';
  enabledIndustries?: Set<string>;
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
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm text-sm font-medium ${
        theme === 'light' 
          ? 'bg-[#2A3B35] text-white'
          : 'bg-[#B8D8D0] text-black'
      }`}
    >
      <div className="flex items-center gap-1.5">
        {React.createElement(industry.icon, { className: "w-3.5 h-3.5" })}
        {industry.label}
      </div>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  )
);

MobileDropdownButton.displayName = "MobileDropdownButton";

export const IndustryPills: React.FC<IndustryPillsProps> = ({
  selectedIndustry,
  onSelect,
  theme = 'dark',
  enabledIndustries
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use useCallback to prevent recreating these functions on each render
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (industry: (typeof INDUSTRIES)[0]) => {
      onSelect(industry);
      setIsOpen(false);
    },
    [onSelect]
  );

  // Mobile dropdown
  const renderMobileDropdown = () => (
    <div className="relative">
      <MobileDropdownButton
        industry={selectedIndustry}
        isOpen={isOpen}
        onClick={toggleDropdown}
        theme={theme}
      />

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} />
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-black border border-[#B8D8D0]/20 rounded-sm shadow-lg">
            <div className="py-1">
              {INDUSTRIES.filter(industry => !enabledIndustries || enabledIndustries.has(industry.id)).map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleSelect(industry)}
                  className={`
                    w-full flex items-center gap-1.5 px-3 py-2
                    text-sm font-medium transition-colors
                    ${
                      selectedIndustry.id === industry.id
                        ? "bg-[#B8D8D0]/10 text-[#B8D8D0]"
                        : "text-[#B8D8D0]/80 hover:bg-[#B8D8D0]/5"
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
  );

  return (
    <>
      {/* Mobile View - Dropdown */}
      <div className="md:hidden">{renderMobileDropdown()}</div>

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
