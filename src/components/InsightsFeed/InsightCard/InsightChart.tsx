import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { InsightData } from '../../../types/insights';

interface InsightChartProps {
  insight: InsightData;
  theme?: 'dark' | 'light';
}

export const InsightChart: React.FC<InsightChartProps> = ({ insight, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#B8D8D0' : '#2A3B35';
  const secondaryColor = isDark ? '#729E8C' : '#4A665C';
  const gridColor = isDark ? 'rgba(184, 216, 208, 0.1)' : 'rgba(42, 59, 53, 0.1)';
  const tooltipBg = isDark ? '#0A1F1C' : '#FFFFFF';
  const tooltipBorder = isDark ? 'rgba(184, 216, 208, 0.2)' : 'rgba(42, 59, 53, 0.2)';

  const generateChartData = () => {
    if (!insight.metrics.value) return [];

    const valueMatch = insight.metrics.value.match(/\$?(\d+(?:\.\d+)?)/);
    const baseValue = valueMatch ? parseFloat(valueMatch[1]) : 0;
    
    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2024, i, 1).toLocaleString('default', { month: 'short' });
      const projected = baseValue / 12 * (1 + (i * 0.1));
      const baseline = baseValue / 12 * (1 + (Math.random() * 0.2 - 0.1));
      
      return {
        month,
        Projected: Number(projected.toFixed(2)),
        Baseline: Number(baseline.toFixed(2)),
      };
    });
  };

  const data = generateChartData();
  if (!data.length) return null;

  return (
    <div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
      <h4 className={`text-[10px] md:text-xs font-medium ${isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'}`}>
        Projected Impact Over Time
      </h4>
      <div className="h-[160px] md:h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor}
            />
            <XAxis 
              dataKey="month" 
              stroke={secondaryColor}
              tick={{ fill: secondaryColor, fontSize: 9, dy: 8 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke={secondaryColor}
              tick={{ fill: secondaryColor, fontSize: 9, dx: -12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '2px',
                fontSize: '11px',
                color: primaryColor,
                padding: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="Baseline"
              stroke={secondaryColor}
              fillOpacity={1}
              fill="url(#baselineGradient)"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="Projected"
              stroke={primaryColor}
              fillOpacity={1}
              fill="url(#projectedGradient)"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-3 md:gap-4">
        <div className="flex items-center gap-1 md:gap-1.5">
          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full`} style={{ backgroundColor: primaryColor }}></div>
          <span className={`text-[10px] md:text-xs ${isDark ? 'text-[#729E8C]' : 'text-[#4A665C]'}`}>
            Projected
          </span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5">
          <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full`} style={{ backgroundColor: secondaryColor }}></div>
          <span className={`text-[10px] md:text-xs ${isDark ? 'text-[#729E8C]' : 'text-[#4A665C]'}`}>
            Baseline
          </span>
        </div>
      </div>
    </div>
  );
};