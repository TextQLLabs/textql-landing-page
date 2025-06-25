import React, { useState, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDUSTRIES } from './constants';
import { useInsightFeed } from '../../hooks/useInsightFeed';
import { InsightsLayout } from './InsightsLayout';

// Only lazy load InsightCard since it's not needed immediately
const InsightCard = lazy(() => 
  import('./InsightCard').then(module => ({ default: module.InsightCard }))
);

// No loading fallback to prevent flash
const LoadingFallback = () => null;

interface InsightsFeedProps {
  theme?: 'light' | 'dark';
  minimal?: boolean;
  enabledIndustries?: Set<string>;
}

export const InsightsFeed: React.FC<InsightsFeedProps> = ({ theme = 'dark', minimal = false, enabledIndustries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSearchCentered, setIsSearchCentered] = useState(true);
  const [showInsights, setShowInsights] = useState(false);

  // Handle industry selection
  const handleIndustryChange = (industry: typeof INDUSTRIES[0]) => {
    console.log('Industry changing from', selectedIndustry.id, 'to', industry.id);
    console.log('Current states:', { isSearchCentered, showInsights, isInitialLoad });
    setSelectedIndustry(industry);
    setIsInitialLoad(false); // Force initial load to false after any industry change
  };

  // Handle search animation complete
  const handleSearchComplete = () => {
    setIsInitialLoad(false);
    setIsSearchCentered(false);
    setShowInsights(true);
  };

  // Auto-expand first card when insights are shown (both initial load and industry changes)
  React.useEffect(() => {
    if (showInsights && insights.length > 0) {
      setTimeout(() => {
        // Get the first card that will actually be displayed (after sorting)
        const firstDisplayedCard = insights[0];
        handleExpandToggle(firstDisplayedCard.id, true);
      }, isInitialLoad ? 800 : 100); // Longer delay on initial load, shorter for industry switches
    }
  }, [showInsights, insights, isInitialLoad, handleExpandToggle]);

  return (
    <div style={{ width: '600px', minWidth: '600px' }}>
      <InsightsLayout
          selectedIndustry={selectedIndustry}
          insightsCount={insights.length}
          isInitialLoad={isInitialLoad}
          isSearchCentered={isSearchCentered}
          showInsights={showInsights}
          onIndustrySelect={handleIndustryChange}
          onSearchComplete={handleSearchComplete}
          theme={theme}
          enabledIndustries={enabledIndustries}
        >
      {showInsights && (
        <div className="h-full relative">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="space-y-1.5">
              {insights.map((insight) => (
                  <div key={insight.id} className="relative">
                    <Suspense fallback={<LoadingFallback />}>
                      <InsightCard 
                        insight={insight}
                        isExpanded={insight.id === expandedId}
                        onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
                        theme={theme}
                        minimal={minimal}
                      />
                    </Suspense>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Fade out gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none">
            <div className={`w-full h-full bg-gradient-to-t ${
              theme === 'light' 
                ? 'from-[#F7F7F7] to-transparent'
                : 'from-black to-transparent'
            }`} />
          </div>
        </div>
      )}
      </InsightsLayout>
    </div>
  );
};