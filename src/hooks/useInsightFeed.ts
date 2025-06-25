import { useState, useCallback, useEffect } from 'react';
import type { InsightData } from '../types/insights';
import { retailInsights } from '../data/insights/retail';
import { healthcareInsights } from '../data/insights/healthcare';
import { manufacturingInsights } from '../data/insights/manufacturing';
import { financeInsights } from '../data/insights/finance';

const INSIGHTS_LIMIT = 6;

// Convert timestamp strings to minutes for sorting
const getMinutesFromTimestamp = (timestamp?: string): number => {
  if (!timestamp) return 999; // Put items without timestamps at the end
  
  const match = timestamp.match(/(\d+)\s+(min|hr)\s+ago/);
  if (!match) return 999;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  return unit === 'hr' ? value * 60 : value;
};

const getInsightsForIndustry = (industryId: string): InsightData[] => {
  let insights: InsightData[];
  
  switch (industryId) {
    case 'retail':
      insights = retailInsights;
      break;
    case 'healthcare':
      insights = healthcareInsights;
      break;
    case 'manufacturing':
      insights = manufacturingInsights;
      break;
    case 'finance':
      insights = financeInsights;
      break;
    default:
      insights = retailInsights;
  }
  
  // Sort by timestamp (most recent first)
  return insights.sort((a, b) => {
    const aMinutes = getMinutesFromTimestamp(a.timestamp);
    const bMinutes = getMinutesFromTimestamp(b.timestamp);
    return aMinutes - bMinutes;
  });
};

export const useInsightFeed = (selectedIndustryId: string) => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpandToggle = useCallback((id: number, expanded: boolean) => {
    setExpandedId(expanded ? id : null);
  }, []);

  useEffect(() => {
    const industryInsights = getInsightsForIndustry(selectedIndustryId);
    setInsights(industryInsights.slice(0, INSIGHTS_LIMIT));
    // Reset expansion state when industry changes
    setExpandedId(null);
  }, [selectedIndustryId]);

  return {
    insights,
    expandedId,
    handleExpandToggle,
  };
};