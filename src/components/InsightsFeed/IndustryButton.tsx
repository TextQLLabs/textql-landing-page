import React from 'react';
import { motion } from 'framer-motion';
import type { Industry } from '../../types/insights';

interface IndustryButtonProps {
  industry: Industry;
  isSelected: boolean;
  onClick: () => void;
}

export const IndustryButton: React.FC<IndustryButtonProps> = ({
  industry: { id, label, icon: Icon },
  isSelected,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 transition-all text-sm md:text-base
      ${isSelected 
        ? 'bg-[#041810] text-white border border-white/40' 
        : 'bg-[#0A1F1C] text-white/80 hover:bg-[#041810]/20'}`}
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5" />
    <span>{label}</span>
  </motion.button>
);