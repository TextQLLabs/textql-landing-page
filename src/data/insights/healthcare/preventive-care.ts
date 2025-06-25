import { type InsightData } from '../../../types/insights';

export const preventiveCareInsight: InsightData = {
  id: 4,
  title: "Preventive Care Opportunity",
  timestamp: "3 days ago",
  metrics: {
    value: "$9.8M Annual"
  },
  trigger_changed: "Preventive screening rates 40% below target, affecting early detection",
  agent_insight: "Proactive outreach could increase screening rates by 60% and improve outcomes",
  recommended_action: "Launch preventive care program to save $817K monthly",
  impact_analysis: "$9.8M annual through improved preventive care",
  show_your_working_out: {
    steps: [
      "40% screening gap",
      "60% improvement potential",
      "35% cost reduction",
      "$817K monthly savings"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Preventive Care Analytics",
    "Screening Rate Study",
    "Outcome Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet Prevention Team",
      type: "meeting",
      target: "Preventive Care"
    },
    {
      label: "Share Data",
      type: "share",
      target: "email"
    }
  ]
};