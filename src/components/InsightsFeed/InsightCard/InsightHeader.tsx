import React from 'react';

interface InsightHeaderProps {
  title: string;
  value: string;
  theme?: 'dark' | 'light';
}

export const InsightHeader: React.FC<InsightHeaderProps> = ({ title, value, theme = 'dark' }) => {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';

  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className={`text-sm md:text-base font-semibold ${textColor}`}>{title}</h3>
      <div className={`text-sm md:text-base font-semibold ${textColor}`}>{value}</div>
    </div>
  );
};