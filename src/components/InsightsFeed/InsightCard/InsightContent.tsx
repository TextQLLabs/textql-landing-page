import React, { useState } from 'react';
import { TrendingUp, Users, ChevronUp } from 'lucide-react';
import type { InsightData } from '../../../types/insights';
import { ImpactAnalysisCard } from './ImpactAnalysisCard';
import { InsightActions } from './InsightActions';
import { WorkingDetails } from './WorkingDetails';
import { InsightChart } from './InsightChart';

interface InsightContentProps {
  insight: InsightData;
  onExpandToggle: (expanded: boolean) => void;
  theme?: 'dark' | 'light';
}

export const InsightContent: React.FC<InsightContentProps> = ({ insight, onExpandToggle, theme = 'dark' }) => {
  const [showDetails, setShowDetails] = useState(false);
  const textColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';

  return (
    <>
      <div className="space-y-2 mb-3">
        <div className="flex items-start">
          <TrendingUp className={`w-3 h-3 md:w-4 md:h-4 ${textColor} mr-2 mt-1`} />
          <p className={`text-xs md:text-sm ${textColor}`}>{insight.trigger_changed}</p>
        </div>
        <div className="flex items-start">
          <Users className={`w-3 h-3 md:w-4 md:h-4 ${textColor} mr-2 mt-1`} />
          <p className={`text-xs md:text-sm ${textColor}`}>{insight.agent_insight}</p>
        </div>
      </div>

      <ImpactAnalysisCard impact={insight.impact_analysis} theme={theme} />
      
      <InsightChart insight={insight} theme={theme} />

      <div className={`flex items-center text-xs md:text-sm ${textColor} my-3`}>
        <div className={`w-3 h-3 md:w-4 md:h-4 mr-2 ${textColor}`}>→</div>
        <p>{insight.recommended_action}</p>
      </div>

      <div className="border-t border-[#B8D8D0]/10 pt-3 mb-3">
        <InsightActions actions={insight.suggested_actions} theme={theme} />
      </div>

      <div className="border-t border-[#B8D8D0]/10 pt-3 mb-3">
        <WorkingDetails
          steps={insight.show_your_working_out.steps}
          sources={insight.cite_your_sources}
          isExpanded={showDetails}
          onToggle={() => setShowDetails(!showDetails)}
          theme={theme}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpandToggle(false);
        }}
        className={`flex items-center justify-center ${textColor} hover:text-[#B8D8D0] transition-colors mx-auto text-[10px] md:text-xs`}
      >
        <ChevronUp className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
        Collapse insight
      </button>
    </>
  );
};