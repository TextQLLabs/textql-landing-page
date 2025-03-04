import { type InsightData } from '../../../types/insights';

export const contentPerformanceInsight: InsightData = {
  id: 1,
  title: "Content Performance Alert",
  metrics: {
    value: "$16.8M Annual"
  },
  trigger_changed: "Viewer engagement dropped 35% across premium content, affecting $1.4M monthly revenue",
  agent_insight: "AI content recommendations could improve engagement by 45% and boost retention",
  recommended_action: "Implement smart content engine to capture $1.4M monthly",
  impact_analysis: "$16.8M annual through improved content performance",
  show_your_working_out: {
    steps: [
      "35% engagement drop",
      "45% improvement potential",
      "$1.4M monthly impact",
      "28% retention increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Content Analytics Q1",
    "Engagement Metrics",
    "Retention Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet Content Team",
      type: "meeting",
      target: "Content Strategy"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "slack"
    }
  ]
};