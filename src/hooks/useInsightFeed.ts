import { useState, useCallback, useEffect } from 'react';
import type { InsightData } from '../types/insights';
import { retailInsights } from '../data/insights/retail';
import { healthcareInsights } from '../data/insights/healthcare';
import { bankingInsights } from '../data/insights/banking';
import { manufacturingInsights } from '../data/insights/manufacturing';
import { supplyChainInsights } from '../data/insights/supply-chain';
import { mediaInsights } from '../data/insights/media';
import { insuranceInsights } from '../data/insights/insurance';

const INSIGHTS_LIMIT = 6;

const getInsightsForIndustry = (industryId: string): InsightData[] => {
  switch (industryId) {
    case 'retail':
      return retailInsights;
    case 'healthcare':
      return healthcareInsights;
    case 'banking':
      return bankingInsights;
    case 'manufacturing':
      return manufacturingInsights;
    case 'supply-chain':
      return supplyChainInsights;
    case 'media':
      return mediaInsights;
    case 'insurance':
      return insuranceInsights;
    default:
      return retailInsights;
  }
};

export const useInsightFeed = (selectedIndustryId: string) => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpandToggle = (id: number, expanded: boolean) => {
    setExpandedId(expanded ? id : null);
  };

  useEffect(() => {
    const industryInsights = getInsightsForIndustry(selectedIndustryId);
    setInsights(industryInsights.slice(0, INSIGHTS_LIMIT));
    setExpandedId(null);
  }, [selectedIndustryId]);

  return {
    insights,
    expandedId,
    handleExpandToggle,
  };
};