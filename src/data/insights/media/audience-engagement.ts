import { type InsightData } from '../../../types/insights';

export const audienceEngagementInsight: InsightData = {
  id: 2,
  title: "Audience Engagement Gap",
  metrics: {
    value: "$12.4M Annual"
  },
  trigger_changed: "Social interaction rates 40% below benchmark, missing $1.03M monthly opportunity",
  agent_insight: "Interactive features could boost engagement by 55% and increase ad revenue",
  recommended_action: "Launch interactive platform to capture $1.03M monthly",
  impact_analysis: "$12.4M annual through improved audience engagement",
  show_your_working_out: {
    steps: [
      "40% interaction gap",
      "55% engagement potential",
      "$1.03M monthly opportunity",
      "32% revenue increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Audience Analytics",
    "Social Metrics Report",
    "Revenue Impact Study"
  ],
  suggested_actions: [
    {
      label: "Meet Social Team",
      type: "meeting",
      target: "Social Media"
    },
    {
      label: "Share Metrics",
      type: "share",
      target: "email"
    }
  ]
};