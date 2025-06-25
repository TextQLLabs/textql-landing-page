import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InsightData } from '../../../types/insights';
import { InsightContent } from './InsightContent';
import { InsightHeader } from './InsightHeader';

interface InsightCardProps {
  insight: InsightData;
  isExpanded?: boolean;
  onExpandToggle: (expanded: boolean) => void;
  theme?: 'dark' | 'light';
  size?: 'large';
  minimal?: boolean;
}

const expandedContentVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 }
    }
  },
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1, delay: 0.1 }
    }
  }
};

const contentVariants = {
  collapsed: {
    opacity: 0,
    transition: { duration: 0.1 }
  },
  expanded: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

export const InsightCard: React.FC<InsightCardProps> = ({ 
  insight, 
  isExpanded = false,
  onExpandToggle,
  theme = 'dark',
  size = 'large',
  minimal = false
}) => {
  const bgColor = theme === 'dark' ? 'bg-[#0F1712]' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#2A3B35]/50' : 'border-[#2A3B35]/40';
  const textColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';
  
  const padding = 'p-2.5 md:p-3.5';
  const textSize = 'text-sm md:text-base';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => onExpandToggle(!isExpanded)}
      className={`
        relative
        ${bgColor} 
        border ${borderColor} 
        ${padding} transition-all duration-200 
        hover:border-[#B8D8D0]/40 hover:shadow-xl
        ${theme === 'dark' 
          ? 'hover:shadow-[#B8D8D0]/10 hover:bg-[#0F1712]/95' 
          : 'hover:shadow-[#2A3B35]/15 hover:bg-white/95'
        }
        ${isExpanded ? 'shadow-lg shadow-black/5' : ''}
        group cursor-pointer
      `}
    >
      {/* Corner Border Animation - Same as Primary Button */}
      <span className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <span 
          className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[1px] group-hover:h-full origin-top-left"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        <span 
          className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[1px] group-hover:w-full origin-top-left"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        {/* Top Right Corner */}
        <span 
          className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[1px] group-hover:h-full origin-top-right"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        <span 
          className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[1px] group-hover:w-full origin-top-right"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        {/* Bottom Left Corner */}
        <span 
          className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[1px] group-hover:h-full origin-bottom-left"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        <span 
          className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[1px] group-hover:w-full origin-bottom-left"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        {/* Bottom Right Corner */}
        <span 
          className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:w-[1px] group-hover:h-full origin-bottom-right"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
        <span 
          className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 ease-out group-hover:h-[1px] group-hover:w-full origin-bottom-right"
          style={{ background: theme === 'dark' ? '#B8D8D0' : '#2A3B35' }}
        />
      </span>
      <div className="relative z-10">
        {!minimal && (
          <InsightHeader title={insight.title} value={insight.metrics.value} theme={theme} size={size} />
        )}

        <AnimatePresence initial={false} mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              variants={expandedContentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                <InsightContent insight={insight} onExpandToggle={onExpandToggle} theme={theme} minimal={minimal} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="flex items-center justify-between"
            >
              {minimal ? (
                // Minimal mode: title + timestamp on left, impact on right, NO priority badge
                <div className="flex items-center w-full mr-4 min-w-0">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'} leading-tight truncate flex-1 min-w-0 transition-colors duration-300 group-hover:text-[#B8D8D0]`}>
                    {insight.title}
                  </h3>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} whitespace-nowrap ml-3 flex-shrink-0 transition-colors duration-300 group-hover:text-[#729E8C]`}>
                    {insight.timestamp || "Just now"}
                  </span>
                  <div className={`text-lg font-medium ${theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'} ml-3 flex-shrink-0 transition-colors duration-300 group-hover:text-[#B8D8D0]`}>
                    {insight.metrics.value.startsWith('$') ? insight.metrics.value : `$${insight.metrics.value}`}
                  </div>
                </div>
              ) : (
                // Default mode: show trigger_changed
                <p className={`line-clamp-1 ${textSize} ${textColor} flex-1 mr-4 transition-colors duration-300 group-hover:text-[#B8D8D0]`}>
                  {insight.trigger_changed}
                </p>
              )}
              <ChevronDown 
                className={`w-3.5 h-3.5 md:w-4 md:h-4 ${textColor} group-hover:text-[#B8D8D0] transition-colors duration-300 shrink-0 pointer-events-none`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};