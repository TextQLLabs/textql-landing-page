import React from 'react';

interface InsightHeaderProps {
  title: string;
  value: string;
  theme?: 'dark' | 'light';
  size?: 'default' | 'large';
}

export const InsightHeader: React.FC<InsightHeaderProps> = ({ title, value, theme = 'dark', size = 'default' }) => {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const textSize = size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm';

  return (
    <div className="flex items-center justify-between mb-1.5 gap-3 min-w-0">
      <h3 className={`${textSize} font-semibold ${textColor} truncate flex-1 min-w-0`}>{title}</h3>
      <div className={`${textSize} font-semibold ${textColor} flex-shrink-0`}>{value}</div>
    </div>
  );
};