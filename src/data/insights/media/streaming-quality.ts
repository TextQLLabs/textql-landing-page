import { type InsightData } from '../../../types/insights';

export const streamingQualityInsight: InsightData = {
  id: 3,
  title: "Streaming Quality Alert",
  metrics: {
    value: "$8.6M Annual"
  },
  trigger_changed: "Streaming quality issues affecting 25% of users, increasing churn by 35%",
  agent_insight: "Advanced CDN optimization could improve quality by 40% and reduce buffering",
  recommended_action: "Upgrade streaming infrastructure to save $717K monthly",
  impact_analysis: "$8.6M annual through improved streaming quality",
  show_your_working_out: {
    steps: [
      "25% quality issues",
      "35% churn increase",
      "40% improvement potential",
      "$717K monthly impact"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Streaming Analytics",
    "Quality Metrics",
    "Churn Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet Tech Team",
      type: "meeting",
      target: "Streaming Tech"
    },
    {
      label: "Share Report",
      type: "share",
      target: "teams"
    }
  ]
};