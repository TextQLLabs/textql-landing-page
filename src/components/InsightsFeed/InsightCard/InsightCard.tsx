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
  size?: 'default' | 'large';
}

const expandedContentVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  },
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  }
};

const contentVariants = {
  collapsed: {
    opacity: 0,
    transition: { duration: 0.2 }
  },
  expanded: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 }
  }
};

export const InsightCard: React.FC<InsightCardProps> = ({ 
  insight, 
  isExpanded = false,
  onExpandToggle,
  theme = 'dark',
  size = 'default'
}) => {
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]/90' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const textColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';
  
  const padding = size === 'large' ? 'p-3 md:p-4' : 'p-2 md:p-3';
  const textSize = size === 'large' ? 'text-xs md:text-sm' : 'text-xs';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        ${bgColor} backdrop-blur-sm 
        border ${borderColor} 
        ${padding} transform transition-all duration-300 
        hover:border-[#B8D8D0]/20
        ${isExpanded ? 'shadow-lg shadow-black/5' : ''}
      `}
    >
      <div onClick={() => onExpandToggle(!isExpanded)} className="cursor-pointer">
        <InsightHeader title={insight.title} value={insight.metrics.value} theme={theme} size={size} />

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
                <InsightContent insight={insight} onExpandToggle={onExpandToggle} theme={theme} size={size} />
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
              <p className={`line-clamp-1 ${textSize} ${textColor} flex-1 mr-4`}>
                {insight.trigger_changed}
              </p>
              <ChevronDown 
                className={`w-3.5 h-3.5 md:w-4 md:h-4 ${textColor} hover:text-[#B8D8D0] transition-colors shrink-0`}
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandToggle(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};