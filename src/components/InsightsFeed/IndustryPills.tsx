import React, { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";
import { INDUSTRIES } from "./constants";

interface IndustryPillsProps {
  selectedIndustry: (typeof INDUSTRIES)[0];
  onSelect: (industry: (typeof INDUSTRIES)[0]) => void;
}

// Memoized industry button to prevent unnecessary re-renders
const IndustryButton = memo(
  ({
    industry,
    isSelected,
    onClick,
  }: {
    industry: (typeof INDUSTRIES)[0];
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      key={industry.id}
      onClick={onClick}
      className={`
      inline-flex items-center gap-1.5 px-3 py-1.5
      text-sm font-medium transition-all duration-200
      rounded-sm whitespace-nowrap shrink-0
      ${
        isSelected
          ? "bg-[#B8D8D0] text-black hover:bg-[#B8D8D0]/90" // Primary style when selected
          : "bg-transparent text-[#B8D8D0] border border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40" // Secondary style when not selected
      }
    `}
    >
      {React.createElement(industry.icon, { className: "w-3.5 h-3.5" })}
      {industry.label}
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
  }: {
    industry: (typeof INDUSTRIES)[0];
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-2 px-3 py-1.5 
      bg-[#B8D8D0] text-black rounded-sm text-sm font-medium"
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
      />

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} />
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-black border border-[#B8D8D0]/20 rounded-sm shadow-lg">
            <div className="py-1">
              {INDUSTRIES.map((industry) => (
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

      {/* Desktop View - Horizontal Scroll */}
      <div className="hidden md:block w-full max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-center gap-1.5">
          {INDUSTRIES.map((industry) => (
            <IndustryButton
              key={industry.id}
              industry={industry}
              isSelected={selectedIndustry.id === industry.id}
              onClick={() => handleSelect(industry)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(IndustryPills);
