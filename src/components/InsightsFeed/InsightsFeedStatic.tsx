import React, { useState, useCallback, Suspense, lazy } from 'react';
import { INDUSTRIES } from './constants';
import { useInsightFeed } from '../../hooks/useInsightFeed';
import IndustryPills from './IndustryPills';

// Only lazy load InsightCard since it's not needed immediately
const InsightCard = lazy(() => 
  import('./InsightCard').then(module => ({ default: module.InsightCard }))
);

// Import static search bar (no lazy loading needed for static)
import { StaticSearchBar } from './SearchBar/StaticSearchBar';

interface InsightsFeedStaticProps {
  theme?: 'light' | 'dark';
  minimal?: boolean;
  enabledIndustries?: Set<string>;
}

export const InsightsFeedStatic: React.FC<InsightsFeedStaticProps> = ({ theme = 'dark', minimal = false, enabledIndustries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [showInsights, setShowInsights] = useState(true); // Start with insights visible
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Memoize callback functions to prevent unnecessary re-renders
  const handleIndustryChange = useCallback((industry: typeof INDUSTRIES[0]) => {
    setSelectedIndustry(industry);
    // Keep insights showing immediately without delay
  }, []);

  const handleSearchComplete = useCallback(() => {
    // No-op since we always show insights immediately
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Industry Pills */}
      <div className="flex-none mb-3">
        <IndustryPills
          selectedIndustry={selectedIndustry}
          onSelect={handleIndustryChange}
          theme={theme}
          enabledIndustries={enabledIndustries}
        />
      </div>

      {/* Search Bar - Static */}
      <div className="flex-none mb-3">
        <StaticSearchBar
          industryLabel={selectedIndustry.label}
          insightsCount={insights.length}
          onAnimationComplete={handleSearchComplete}
          theme={theme}
        />
      </div>

      {/* Insights Feed - Static, no animations */}
      <div className="flex-1 min-h-0">
        <div className="h-full relative">
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-y-auto scrollbar-hide pr-1 pl-1" 
          >
            <div className="space-y-1">
              {insights.map((insight) => (
                <div key={insight.id}>
                  <Suspense fallback={
                    <div className="w-full min-h-[100px] bg-black/20 rounded-sm" />
                  }>
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
          
          {/* Static fade gradient - always visible */}
          <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 pointer-events-none">
            <div className={`w-full h-full bg-gradient-to-t ${
              theme === 'light' 
                ? 'from-[#F7F7F7] via-[#F7F7F7]/70 via-[#F7F7F7]/40 to-transparent'
                : 'from-black via-black/70 via-black/40 to-transparent'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};