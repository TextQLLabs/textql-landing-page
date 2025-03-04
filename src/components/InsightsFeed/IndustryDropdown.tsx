import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { INDUSTRIES } from './constants';
import type { Industry } from '../../types/insights';

interface IndustryDropdownProps {
  selectedIndustry: Industry;
  onSelect: (industry: Industry) => void;
}

export const IndustryDropdown: React.FC<IndustryDropdownProps> = ({
  selectedIndustry,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Calculate the minimum width needed for the longest industry name
      const minWidth = Math.max(
        ...INDUSTRIES.map(industry => {
          const tempSpan = document.createElement('span');
          tempSpan.style.visibility = 'hidden';
          tempSpan.style.position = 'absolute';
          tempSpan.style.whiteSpace = 'nowrap';
          tempSpan.style.font = window.getComputedStyle(buttonRef.current!).font;
          tempSpan.textContent = industry.label;
          document.body.appendChild(tempSpan);
          const width = tempSpan.offsetWidth;
          document.body.removeChild(tempSpan);
          return width;
        })
      );
      // Add padding and icon width to the calculated text width
      const totalWidth = minWidth + 80; // 32px padding + 20px icon + 20px chevron + 8px gap
      
      setDropdownStyle({
        top: rect.bottom + 8,
        left: rect.left,
        width: Math.max(totalWidth, rect.width),
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-black border border-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
      >
        <selectedIndustry.icon className="w-5 h-5" />
        <span>{selectedIndustry.label}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: dropdownStyle.top,
                left: dropdownStyle.left,
                width: dropdownStyle.width,
                zIndex: 50,
              }}
              className="bg-black border border-emerald-500/20 rounded-lg shadow-lg shadow-emerald-500/10"
            >
              {INDUSTRIES.map((industry) => (
                <motion.button
                  key={industry.id}
                  whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                  onClick={() => {
                    onSelect(industry);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left transition-colors
                    ${industry.id === selectedIndustry.id 
                      ? 'text-emerald-400 bg-emerald-500/10' 
                      : 'text-emerald-300 hover:text-emerald-400'}`}
                >
                  <industry.icon className="w-5 h-5" />
                  <span>{industry.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};