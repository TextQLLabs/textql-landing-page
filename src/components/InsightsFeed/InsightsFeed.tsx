import React, { useState, useCallback, Suspense, lazy, useEffect } from 'react';
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
  className?: string;
}

export const InsightsFeed: React.FC<InsightsFeedProps> = ({ theme = 'dark', minimal = false, enabledIndustries, className = '' }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSearchCentered, setIsSearchCentered] = useState(true);
  const [showInsights, setShowInsights] = useState(false);
  const [showDebugBorders, setShowDebugBorders] = useState(false);

  // Sync debug borders with localStorage
  useEffect(() => {
    // Check initial state from localStorage
    const checkDebugState = () => {
      const debugState = localStorage.getItem('showDebugBorders') === 'true';
      setShowDebugBorders(debugState);
    };
    
    checkDebugState();
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', checkDebugState);
    // Listen for custom event (from same tab)
    window.addEventListener('debugToggle', checkDebugState);
    
    return () => {
      window.removeEventListener('storage', checkDebugState);
      window.removeEventListener('debugToggle', checkDebugState);
    };
  }, []);

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
        showDebugBorders={showDebugBorders}
        className={className}
      >
    {showInsights && (
      <>
        {insights.map((insight, index) => (
            <Suspense key={insight.id} fallback={<LoadingFallback />}>
              <div className={`${showDebugBorders ? 'border-2 border-pink-500' : ''} ${index > 0 ? "mt-1.5" : ""}`}>
                <InsightCard 
                  insight={insight}
                  isExpanded={insight.id === expandedId}
                  onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
                  theme={theme}
                  minimal={minimal}
                />
              </div>
            </Suspense>
          ))}
      </>
    )}
    </InsightsLayout>
  );
};