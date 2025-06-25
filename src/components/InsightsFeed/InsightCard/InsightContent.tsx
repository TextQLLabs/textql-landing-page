import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, ChevronUp, Share2, Download, AlertTriangle, AlertCircle, Info, Zap } from 'lucide-react';
import type { InsightData } from '../../../types/insights';
import { ImpactAnalysisCard } from './ImpactAnalysisCard';
import { InsightActions } from './InsightActions';
import { WorkingDetails } from './WorkingDetails';
import { InsightChart } from './InsightChart';
import { CleanMinimalChart } from './CleanMinimalChart';
import Button from '../../ui/Button/Button';

interface InsightContentProps {
  insight: InsightData;
  onExpandToggle: (expanded: boolean) => void;
  theme?: 'dark' | 'light';
  minimal?: boolean;
}

export const InsightContent: React.FC<InsightContentProps> = ({ insight, onExpandToggle, theme = 'dark', minimal = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const textColor = theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]';

  const handleTryNow = () => {
    navigate('/demo');
  };
  
  // Generate timestamp if not provided
  const getTimestamp = () => {
    if (insight.timestamp) return insight.timestamp;
    
    // Generate random timestamp between 1 minute and 3 hours ago
    const minutesAgo = Math.floor(Math.random() * 180) + 1;
    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
    }
  };

  // Get alert icon and colors - using mint-y style for all
  const getAlertInfo = () => {
    const level = insight.alert_level || 'low';
    const category = insight.category || 'performance';
    
    // Use consistent mint-y colors for all priority levels
    const mintColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
    const mintBg = theme === 'dark' ? 'bg-[#B8D8D0]/10' : 'bg-[#2A3B35]/10';
    
    switch (level) {
      case 'critical':
        return { 
          icon: AlertTriangle, 
          color: mintColor,
          bgColor: mintBg
        };
      case 'high':
        return { 
          icon: AlertCircle, 
          color: mintColor,
          bgColor: mintBg
        };
      case 'medium':
        return { 
          icon: Info, 
          color: mintColor,
          bgColor: mintBg
        };
      default:
        return { 
          icon: category === 'opportunity' ? Zap : TrendingUp, 
          color: mintColor,
          bgColor: mintBg
        };
    }
  };

  const alertInfo = getAlertInfo();
  const AlertIcon = alertInfo.icon;

  if (minimal) {
    // Minimal expanded content: larger header, chart with text on left
    return (
      <>
        {/* Larger header */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-6">
              <h2 className={`text-2xl md:text-3xl font-light ${theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'} leading-tight mb-2`}>
                {insight.title}
              </h2>
              {/* Priority badge below title */}
              <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${alertInfo.bgColor} w-fit`}>
                <AlertIcon className={`w-3 h-3 ${alertInfo.color}`} />
                <span className={`text-xs font-medium ${alertInfo.color}`}>
                  {insight.alert_level || 'low'} priority
                </span>
              </div>
            </div>
            <div className={`text-2xl md:text-3xl font-light ${theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'} shrink-0`}>
              {insight.metrics.value.startsWith('$') ? insight.metrics.value : `$${insight.metrics.value}`}
            </div>
          </div>
        </div>

        {/* Chart and content side by side */}
        <div className="flex gap-4 mb-3">
          {/* Left side: Clean Chart (60% width) */}
          <div className="w-3/5">
            <CleanMinimalChart insight={insight} theme={theme} />
          </div>
          
          {/* Right side: Key insight text (40% width) - centered vertically */}
          <div className="w-2/5 flex items-center">
            <div className="w-full">
              <div className="flex items-start">
                <TrendingUp className={`w-4 h-4 ${textColor} mr-2 mt-1 shrink-0`} />
                <div className="flex-1">
                  <p className={`text-sm ${textColor} leading-relaxed`}>
                    {insight.agent_insight}
                  </p>
                </div>
              </div>
              {/* Action buttons - full width of text body + icon */}
              <div className="mt-3 space-y-2">
                <div 
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                >
                  <Button 
                    variant="primary" 
                    theme={theme} 
                    fullWidth 
                    size="sm"
                    onClick={handleTryNow}
                  >
                    Try now
                  </Button>
                </div>
                
                <div 
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                >
                  <Button 
                    variant="secondary" 
                    theme={theme} 
                    fullWidth 
                    size="sm"
                    icon={Download}
                  >
                    Full Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpandToggle(false);
          }}
          className={`flex items-center justify-center ${textColor} hover:text-[#B8D8D0] transition-colors mx-auto text-xs md:text-sm`}
        >
          <ChevronUp className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          Collapse insight
        </button>
      </>
    );
  }

  // Full expanded content
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