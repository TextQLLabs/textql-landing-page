import React, { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import IndustryPills from './IndustryPills'; // Import memoized component
import type { Industry } from '../../types/insights';

// Lazy load search bar component
const AnimatedSearchBar = lazy(() => 
  import('./SearchBar/AnimatedSearchBar').then(module => ({ default: module.AnimatedSearchBar }))
);

// Simple loading fallback (no animation)
const SearchBarFallback = () => (
  <div className="w-full h-12">
    {/* Intentionally empty for cleaner loading experience */}
  </div>
);

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

// The motion components with simpler animations for better performance
const IndustryPillsMotion = memo(({ 
  isSearchCentered, 
  children 
}: { 
  isSearchCentered: boolean; 
  children: React.ReactNode;
}) => (
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
    // Optimize for GPU
    style={{ willChange: 'transform, opacity' }}
  >
    {children}
  </motion.div>
));

IndustryPillsMotion.displayName = 'IndustryPillsMotion';

const SearchBarMotion = memo(({ 
  isSearchCentered, 
  children 
}: { 
  isSearchCentered: boolean; 
  children: React.ReactNode;
}) => (
  <motion.div
    className="flex-none"
    animate={{ 
      y: isSearchCentered ? '20vh' : 0,
      marginTop: isSearchCentered ? 0 : '0.75rem',
      marginBottom: isSearchCentered ? 0 : '0.75rem'
    }}
    transition={{ 
      duration: 0.6, // Reduced from 0.8
      ease: [0.4, 0, 0.2, 1] 
    }}
    // Optimize for GPU
    style={{ willChange: 'transform' }}
  >
    {children}
  </motion.div>
));

SearchBarMotion.displayName = 'SearchBarMotion';

const ContentMotion = memo(({ 
  showInsights, 
  children 
}: { 
  showInsights: boolean; 
  children: React.ReactNode;
}) => (
  <motion.div 
    className="flex-1 min-h-0"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: showInsights ? 1 : 0,
      y: showInsights ? 0 : 10 // Reduced from 20
    }}
    transition={{ 
      duration: 0.4, // Reduced from 0.5
      ease: "easeOut"
    }}
    // Optimize for GPU
    style={{ willChange: 'transform, opacity' }}
  >
    {children}
  </motion.div>
));

ContentMotion.displayName = 'ContentMotion';

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
      <IndustryPillsMotion isSearchCentered={isSearchCentered}>
        <IndustryPills
          selectedIndustry={selectedIndustry}
          onSelect={onIndustrySelect}
        />
      </IndustryPillsMotion>

      {/* Search Bar */}
      <SearchBarMotion isSearchCentered={isSearchCentered}>
        <Suspense fallback={<SearchBarFallback />}>
          <AnimatedSearchBar
            industryLabel={selectedIndustry.label}
            insightsCount={insightsCount}
            onAnimationComplete={onSearchComplete}
            isInitialLoad={isInitialLoad}
          />
        </Suspense>
      </SearchBarMotion>

      {/* Insights Feed */}
      <ContentMotion showInsights={showInsights}>
        {children}
      </ContentMotion>
    </div>
  );
};

// Export the memoized component
export default memo(InsightsLayout);