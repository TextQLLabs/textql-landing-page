import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { InsightData } from '../../../types/insights';

interface CleanMinimalChartProps {
  insight: InsightData;
  theme?: 'dark' | 'light';
}

export const CleanMinimalChart: React.FC<CleanMinimalChartProps> = ({ insight, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#B8D8D0' : '#2A3B35';
  const secondaryColor = isDark ? '#729E8C' : '#4A665C';

  const generateChartData = () => {
    if (!insight.metrics.value) return [];

    const valueMatch = insight.metrics.value.match(/\$?(\d+(?:\.\d+)?)/);
    const baseValue = valueMatch ? parseFloat(valueMatch[1]) : 0;
    
    // Create fewer bars for cleaner visualization (6 bars)
    const data = Array.from({ length: 6 }, (_, i) => {
      const month = new Date(2024, i * 2, 1).toLocaleString('default', { month: 'short' }); // Every other month
      
      // More realistic data generation with variation
      const growthFactor = 1 + (i * 0.15) + (Math.random() * 0.1 - 0.05); // Growth with some variance
      const projected = (baseValue / 6) * growthFactor;
      
      // Baseline should be different from projected with its own pattern
      const baselineFactor = 0.8 + (i * 0.06) + (Math.random() * 0.15 - 0.075); // Lower growth, more variance
      const baseline = (baseValue / 6) * baselineFactor;
      
      return {
        month,
        Projected: Number(projected.toFixed(2)),
        Baseline: Number(baseline.toFixed(2)),
      };
    });
    
    return data;
  };

  const data = generateChartData();
  if (!data.length) return null;

  // Calculate dynamic Y-axis domain based on actual data
  const allValues = data.flatMap(d => [d.Projected, d.Baseline]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1; // 10% padding
  const yDomainMin = Math.max(0, minValue - padding); // Don't go below 0
  const yDomainMax = maxValue + padding;

  return (
    <div className="relative">
      {/* Chart with corner labels */}
      <div className="h-[220px] w-full relative">
        {/* Top-left label */}
        <div className="absolute top-0 left-0 z-10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: primaryColor }}></div>
            <span className={`text-xs font-medium ${isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'}`}>
              Projected
            </span>
          </div>
        </div>
        
        {/* Top-right label */}
        <div className="absolute top-0 right-0 z-10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: secondaryColor }}></div>
            <span className={`text-xs font-medium ${isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'}`}>
              Baseline
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 25, right: 10, left: 10, bottom: 25 }}
            barCategoryGap="20%"
          >
            <defs>
              {/* Solid fill for projected bars */}
              <linearGradient id="projectedGradientClean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.4} />
              </linearGradient>
              
              {/* Dotted pattern for baseline bars */}
              <pattern id="dottedPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                <rect width="8" height="8" fill="transparent"/>
                <circle cx="4" cy="4" r="1.5" fill={secondaryColor} fillOpacity="0.6"/>
              </pattern>
              
              {/* Striped pattern as alternative for baseline */}
              <pattern id="stripedPattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <rect width="4" height="4" fill="transparent"/>
                <rect width="2" height="4" fill={secondaryColor} fillOpacity="0.4"/>
              </pattern>
            </defs>
            
            {/* Grid lines */}
            <CartesianGrid 
              strokeDasharray="0" 
              stroke={isDark ? '#B8D8D0' : '#2A3B35'} 
              strokeOpacity={0.15}
              strokeWidth={0.5}
            />
            
            <XAxis 
              dataKey="month" 
              hide
            />
            <YAxis 
              hide 
              domain={[yDomainMin, yDomainMax]}
            />
            
            {/* Baseline bars with dotted pattern */}
            <Bar
              dataKey="Baseline"
              fill="url(#dottedPattern)"
              stroke={secondaryColor}
              strokeWidth={1}
              strokeOpacity={0.6}
            />
            
            {/* Projected bars with solid fill */}
            <Bar
              dataKey="Projected"
              fill="url(#projectedGradientClean)"
              stroke={primaryColor}
              strokeWidth={1}
              strokeOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};