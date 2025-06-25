import React, { useState, useCallback, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { INDUSTRIES } from './constants';
import { useInsightFeed } from '../../hooks/useInsightFeed';
import IndustryPills from './IndustryPills';

// Only lazy load InsightCard since it's not needed immediately
const InsightCard = lazy(() => 
  import('./InsightCard').then(module => ({ default: module.InsightCard }))
);

// Lazy load search bar component
const AnimatedSearchBar = lazy(() => 
  import('./SearchBar/AnimatedSearchBar').then(module => ({ default: module.AnimatedSearchBar }))
);

// Simple loading fallback
const SearchBarFallback = () => (
  <div className="w-full h-12">
    {/* Intentionally empty for cleaner loading experience */}
  </div>
);

interface InsightsFeedBelowProps {
  theme?: 'light' | 'dark';
}

export const InsightsFeedBelow: React.FC<InsightsFeedBelowProps> = ({ theme = 'dark' }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(selectedIndustry.id);
  const [showInsights, setShowInsights] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMinimalView, setIsMinimalView] = useState(false);

  // Memoize callback functions to prevent unnecessary re-renders
  const handleIndustryChange = useCallback((industry: typeof INDUSTRIES[0]) => {
    setSelectedIndustry(industry);
    setShowInsights(false);
  }, []);

  const handleSearchComplete = useCallback(() => {
    setShowInsights(true);
    setIsInitialLoad(false);
  }, []);

  // Optimization: Reduce motion complexity for performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: Math.min(i * 0.1, 0.5) // Stagger animation
      }
    })
  };

  return (
    <div className="w-full">
      {/* Header Section - Fixed at top */}
      <div className="mb-8">
        {/* Industry Pills */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IndustryPills
            selectedIndustry={selectedIndustry}
            onSelect={handleIndustryChange}
            theme={theme}
          />
        </motion.div>

        {/* Search Bar with Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Suspense fallback={<SearchBarFallback />}>
                <AnimatedSearchBar
                  industryLabel={selectedIndustry.label}
                  insightsCount={insights.length}
                  onAnimationComplete={handleSearchComplete}
                  isInitialLoad={isInitialLoad}
                  theme={theme}
                />
              </Suspense>
            </div>
            
            {/* View Toggle Button */}
            {showInsights && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <button
                  onClick={() => setIsMinimalView(!isMinimalView)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200
                    ${theme === 'dark' 
                      ? 'border-[#B8D8D0]/20 hover:bg-[#B8D8D0]/5 text-[#729E8C] hover:text-[#B8D8D0]' 
                      : 'border-[#2A3B35]/20 hover:bg-[#2A3B35]/5 text-[#4A665C] hover:text-[#2A3B35]'
                    }
                  `}
                  title={isMinimalView ? 'Switch to full view' : 'Switch to minimal view'}
                >
                  {isMinimalView ? (
                    <List className="w-4 h-4" />
                  ) : (
                    <LayoutGrid className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {isMinimalView ? 'Full' : 'Minimal'}
                  </span>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Insights Cards Grid - Below header */}
      {showInsights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="h-fit"
              >
                <Suspense fallback={
                  <div className="w-full h-32 bg-black/20 rounded-lg animate-pulse" />
                }>
                  <InsightCard 
                    insight={insight}
                    isExpanded={insight.id === expandedId}
                    onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
                    theme={theme}
                    minimal={isMinimalView}
                  />
                </Suspense>
              </motion.div>
            ))}
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-6 text-center"
          >
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {insights.length} insights for {selectedIndustry.label}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {!showInsights && !isInitialLoad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <div className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Click search to discover insights for {selectedIndustry.label}
          </div>
        </motion.div>
      )}
    </div>
  );
};