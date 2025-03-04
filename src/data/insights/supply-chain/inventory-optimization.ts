import { type InsightData } from '../../../types/insights';

export const inventoryOptimizationInsight: InsightData = {
  id: 1,
  title: "Inventory Optimization Alert",
  metrics: {
    value: "$14.2M Annual"
  },
  trigger_changed: "Excess inventory levels 45% above target, causing $1.18M monthly holding costs",
  agent_insight: "AI-driven optimization could reduce holding costs by 35% while maintaining service levels",
  recommended_action: "Implement dynamic inventory management to save $1.18M monthly",
  impact_analysis: "$14.2M annual through reduced holding costs and improved turnover",
  show_your_working_out: {
    steps: [
      "45% excess inventory identified",
      "35% cost reduction potential",
      "$1.18M monthly savings",
      "98% service level maintained"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Inventory Analytics Q1 2024",
    "Cost Analysis Report",
    "Service Level Data"
  ],
  suggested_actions: [
    {
      label: "Meet Inventory Team",
      type: "meeting",
      target: "Inventory Management"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "slack"
    }
  ]
};