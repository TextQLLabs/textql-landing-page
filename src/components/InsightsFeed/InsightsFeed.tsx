import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InsightCard } from './InsightCard';
import { INDUSTRIES } from './constants';
import { useInsightFeed } from '../../hooks/useInsightFeed';
import { InsightsLayout } from './InsightsLayout';

export const InsightsFeed: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [showInsights, setShowInsights] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSearchCentered, setIsSearchCentered] = useState(true);

  const handleIndustryChange = (industry: typeof INDUSTRIES[0]) => {
    setSelectedIndustry(industry);
    setShowInsights(false);
    setIsSearchCentered(isInitialLoad);
  };

  const handleSearchComplete = () => {
    setShowInsights(true);
    setIsInitialLoad(false);
    setIsSearchCentered(false);
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: showInsights ? 1 : 0,
                y: showInsights ? 0 : 20
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1
              }}
            >
              <InsightCard 
                insight={insight}
                isExpanded={insight.id === expandedId}
                onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </InsightsLayout>
  );
};