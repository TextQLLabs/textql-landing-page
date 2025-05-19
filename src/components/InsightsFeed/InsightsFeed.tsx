import React, { useState, useCallback, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from './constants';
import { useInsightFeed } from '../../hooks/useInsightFeed';
import { InsightsLayout } from './InsightsLayout'; // Import directly for faster initial load

// Only lazy load InsightCard since it's not needed immediately
const InsightCard = lazy(() => 
  import('./InsightCard').then(module => ({ default: module.InsightCard }))
);

// Preload InsightCard after initial render
const preloadInsightCard = () => {
  const timer = setTimeout(() => {
    import('./InsightCard');
  }, 1000);
  return () => clearTimeout(timer);
};

// Fallback loading component (no visible spinner)
const LoadingFallback = () => (
  <div className="w-full min-h-[200px]">
    {/* Intentionally empty for a cleaner loading experience */}
  </div>
);

export const InsightsFeed: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [showInsights, setShowInsights] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSearchCentered, setIsSearchCentered] = useState(true);

  // Start preloading InsightCard after mount
  React.useEffect(preloadInsightCard, []);

  // Memoize callback functions to prevent unnecessary re-renders
  const handleIndustryChange = useCallback((industry: typeof INDUSTRIES[0]) => {
    setSelectedIndustry(industry);
    setShowInsights(false);
    setIsSearchCentered(isInitialLoad);
  }, [isInitialLoad]);

  const handleSearchComplete = useCallback(() => {
    setShowInsights(true);
    setIsInitialLoad(false);
    setIsSearchCentered(false);
  }, []);

  // Optimization: Reduce motion complexity for performance
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: showInsights ? 1 : 0,
      y: showInsights ? 0 : 10,
      transition: {
        duration: 0.3,
        delay: Math.min(i * 0.05, 0.3) // Cap delay to avoid excessive staggering
      }
    })
  };

  return (
    <InsightsLayout
      selectedIndustry={selectedIndustry}
      insightsCount={insights.length}
      isInitialLoad={isInitialLoad}
      isSearchCentered={isSearchCentered}
      showInsights={showInsights}
      onIndustrySelect={handleIndustryChange}
      onSearchComplete={handleSearchComplete}
    >
      <div className="h-full overflow-y-auto hide-scrollbar pr-2">
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              // Optimize motion performance by reducing GPU overhead
              style={{ willChange: 'transform, opacity' }}
              // Only animate if needed to reduce CPU/GPU usage
              layoutId={`insight-${insight.id}`}
            >
              <Suspense fallback={
                <div className="w-full min-h-[100px] bg-black/20 rounded-sm" />
              }>
                <InsightCard 
                  insight={insight}
                  isExpanded={insight.id === expandedId}
                  onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
                />
              </Suspense>
            </motion.div>
          ))}
        </div>
      </div>
    </InsightsLayout>
  );
};