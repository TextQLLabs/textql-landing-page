import React from 'react';
import { motion } from 'framer-motion';
import { IndustryPills } from './IndustryPills';
import { AnimatedSearchBar } from './SearchBar/AnimatedSearchBar';
import type { Industry } from '../../types/insights';

interface InsightsLayoutProps {
  selectedIndustry: Industry;
  insightsCount: number;
  isInitialLoad: boolean;
  isSearchCentered: boolean;
  showInsights: boolean;
  onIndustrySelect: (industry: Industry) => void;
  onSearchComplete: () => void;
  children: React.ReactNode;
}

export const InsightsLayout: React.FC<InsightsLayoutProps> = ({
  selectedIndustry,
  insightsCount,
  isInitialLoad,
  isSearchCentered,
  showInsights,
  onIndustrySelect,
  onSearchComplete,
  children
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Industry Pills */}
      <motion.div 
        className="flex-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isSearchCentered ? 0 : 1,
          y: isSearchCentered ? -20 : 0
        }}
        transition={{ 
          duration: 0.3,
          delay: isSearchCentered ? 0 : 0.4
        }}
      >
        <IndustryPills
          selectedIndustry={selectedIndustry}
          onSelect={onIndustrySelect}
        />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="flex-none"
        animate={{ 
          y: isSearchCentered ? '20vh' : 0,
          marginTop: isSearchCentered ? 0 : '0.75rem',
          marginBottom: isSearchCentered ? 0 : '0.75rem'
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <AnimatedSearchBar
          industryLabel={selectedIndustry.label}
          insightsCount={insightsCount}
          onAnimationComplete={onSearchComplete}
          isInitialLoad={isInitialLoad}
        />
      </motion.div>

      {/* Insights Feed */}
      <motion.div 
        className="flex-1 min-h-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showInsights ? 1 : 0,
          y: showInsights ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};