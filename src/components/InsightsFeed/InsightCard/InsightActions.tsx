import React from 'react';
import { Calendar, Share2 } from 'lucide-react';
import type { SuggestedAction } from '../../../types/insights';

interface InsightActionsProps {
  actions?: SuggestedAction[];
  theme?: 'dark' | 'light';
}

export const InsightActions: React.FC<InsightActionsProps> = ({ actions = [], theme = 'dark' }) => {
  if (!actions.length) return null;

  const isDark = theme === 'dark';
  const primaryText = isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const bgColor = isDark ? 'bg-[#0A1F1C]' : 'bg-[#F0F5F3]';
  const borderColor = isDark ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const hoverBorderColor = isDark ? 'hover:border-[#B8D8D0]/20' : 'hover:border-[#2A3B35]/20';

  return (
    <div className="space-y-2">
      <h4 className={`text-[10px] md:text-xs font-medium ${primaryText}`}>Suggested Next Actions:</h4>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 
              ${bgColor} border ${borderColor} 
              ${hoverBorderColor}
              ${primaryText} transition-colors text-[10px] md:text-xs`}
          >
            {action.type === 'meeting' ? (
              <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
            ) : (
              <Share2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
            )}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};