import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AIAdoptionChart } from './AIAdoptionChart';

// Map of chart IDs to their components
const chartComponents: Record<string, React.FC> = {
  'ai-adoption-levels-chart': AIAdoptionChart,
};

export const BlogChartLoader: React.FC = () => {
  useEffect(() => {
    // Find all chart placeholders in the blog content
    Object.entries(chartComponents).forEach(([chartId, ChartComponent]) => {
      const element = document.getElementById(chartId);
      if (element && !element.hasChildNodes()) {
        const root = createRoot(element);
        root.render(<ChartComponent />);
      }
    });
  }, []);

  return null;
};