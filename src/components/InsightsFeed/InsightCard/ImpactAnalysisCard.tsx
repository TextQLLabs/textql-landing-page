import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';

interface ImpactAnalysisCardProps {
  impact: string;
  theme?: 'dark' | 'light';
}

export const ImpactAnalysisCard: React.FC<ImpactAnalysisCardProps> = ({ impact, theme = 'dark' }) => {
  const matches = impact.match(/\$(\d+(?:\.\d+)?)(M|K)? (\w+)/);
  let value = '';
  let timeframe = '';
  
  if (matches) {
    const [, num, magnitude, time] = matches;
    value = `$${num}${magnitude || ''}`;
    timeframe = time;
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#0F1712]' : 'bg-[#F0F5F3]';
  const borderColor = isDark ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const primaryText = isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const secondaryText = isDark ? 'text-[#729E8C]' : 'text-[#4A665C]';

  return (
    <div className={`space-y-2 ${bgColor} border ${borderColor} p-3 md:p-4 rounded-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <ArrowUpRight className={`w-3 h-3 md:w-4 md:h-4 ${secondaryText}`} />
        <h4 className={`text-xs md:text-sm font-medium ${primaryText}`}>Revenue Opportunity</h4>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-[10px] md:text-xs ${secondaryText}`}>Value:</span>
          <span className={`text-xs md:text-sm font-medium ${primaryText}`}>{value}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-[10px] md:text-xs ${secondaryText}`}>Timeframe:</span>
          <div className={`flex items-center gap-1.5 ${primaryText}`}>
            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span className="text-[10px] md:text-xs">{timeframe}</span>
          </div>
        </div>
        
        <p className={`text-[10px] md:text-xs ${secondaryText}`}>
          {impact}
        </p>
      </div>
    </div>
  );
};