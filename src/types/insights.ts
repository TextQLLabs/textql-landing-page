import React from 'react';

export interface SuggestedAction {
  label: string;
  type: 'meeting' | 'share';
  target: string;
}

export interface InsightData {
  id: number;
  title: string;
  metrics: {
    value: string;
    [key: string]: string;
  };
  trigger_changed: string;
  agent_insight: string;
  recommended_action: string;
  impact_analysis: string;
  show_your_working_out: {
    steps: string[];
    expand_button: string;
  };
  cite_your_sources: string[];
  suggested_actions: SuggestedAction[];
  alert_level?: 'low' | 'medium' | 'high' | 'critical';
  category?: 'performance' | 'risk' | 'opportunity' | 'trend';
  timestamp?: string;
}

export type MetricType = 'percentage' | 'currency' | 'count' | 'time' | 'ratio';

// Add the missing Industry interface
export interface Industry {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}