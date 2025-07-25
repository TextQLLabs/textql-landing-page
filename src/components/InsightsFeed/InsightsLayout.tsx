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
  theme?: 'light' | 'dark';
  enabledIndustries?: Set<string>;
  showDebugBorders?: boolean;
  className?: string;
}

// The motion components with simpler animations for better performance
const IndustryPillsMotion = memo(({ 
  isSearchCentered, 
  children,
  showDebugBorders 
}: { 
  isSearchCentered: boolean; 
  children: React.ReactNode;
  showDebugBorders?: boolean;
}) => (
  <motion.div 
    className={`flex-none w-full ${showDebugBorders ? 'border-2 border-yellow-500' : ''}`}
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
  children,
  showDebugBorders 
}: { 
  isSearchCentered: boolean; 
  children: React.ReactNode;
  showDebugBorders?: boolean;
}) => (
  <motion.div
    className={`flex-none w-full md:w-auto ${showDebugBorders ? 'border-2 border-purple-500' : ''}`}
    animate={{ 
      y: 0,
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
  children,
  showDebugBorders,
  isMobile,
  isDropdownOpen
}: { 
  showInsights: boolean; 
  children: React.ReactNode;
  showDebugBorders?: boolean;
  isMobile?: boolean;
  isDropdownOpen?: boolean;
}) => (
  <motion.div 
    className={`min-h-0 ${
      // Only apply overflow-y-auto on desktop or when dropdown is closed on mobile
      isMobile && isDropdownOpen ? '' : 'overflow-y-auto'
    } scrollbar-hide relative ${showDebugBorders ? 'border-2 border-green-500' : ''}`}
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
  children,
  theme = 'dark',
  enabledIndustries,
  showDebugBorders = false,
  className = ''
}) => {
  const isMobile = className?.includes('lg:hidden');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  
  return (
    <div 
      className={`w-full flex flex-col justify-center relative ${showDebugBorders ? 'border-2 border-purple-500' : ''} ${className}`} 
      style={{ 
        contain: 'layout',
        /* InsightsFeed height constraint for desktop only */
        ...(!className?.includes('lg:hidden') && {
          maxHeight: 'calc(100vh - 280px)',
          height: 'calc(100vh - 280px)',
          minHeight: '400px'
        }),
        /* Ensure mobile doesn't overflow viewport */
        ...(className?.includes('lg:hidden') && {
          maxWidth: '100%'
        })
      }}
    >
      {/* Industry Pills */}
      {!isSearchCentered && (
        <IndustryPillsMotion isSearchCentered={false} showDebugBorders={showDebugBorders}>
          <IndustryPills
            selectedIndustry={selectedIndustry}
            onSelect={onIndustrySelect}
            theme={theme}
            enabledIndustries={enabledIndustries}
            showDebugBorders={showDebugBorders}
            onDropdownChange={setDropdownOpen}
          />
        </IndustryPillsMotion>
      )}

      {/* Search Bar */}
      <SearchBarMotion isSearchCentered={false} showDebugBorders={showDebugBorders}>
        <Suspense fallback={<SearchBarFallback />}>
          <AnimatedSearchBar
            industryLabel={selectedIndustry.label}
            insightsCount={insightsCount}
            onAnimationComplete={onSearchComplete}
            isInitialLoad={isInitialLoad}
            theme={theme}
            showDebugBorders={showDebugBorders}
          />
        </Suspense>
      </SearchBarMotion>

        {/* Insights Feed */}
        <ContentMotion 
          showInsights={showInsights} 
          showDebugBorders={showDebugBorders}
          isMobile={isMobile}
          isDropdownOpen={dropdownOpen}
        >
          {children}
        </ContentMotion>
        
        {/* Fade out gradient at bottom - only show when insights are visible and on desktop */}
        {showInsights && !className?.includes('lg:hidden') && (
          <div className="absolute bottom-0 left-0 right-0 h-[25px] pointer-events-none">
            <div className={`w-full h-full bg-gradient-to-t ${
              theme === 'light' 
                ? 'from-[#F7F7F7] to-transparent'
                : 'from-black to-transparent'
            }`} />
          </div>
        )}
    </div>
  );
};

// Export the memoized component
export default memo(InsightsLayout);