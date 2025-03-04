import { type InsightData } from '../../../types/insights';

export const demandResponseInsight: InsightData = {
  id: 3,
  title: "Demand Response Opportunity",
  metrics: {
    value: "$6.8M Annual"
  },
  trigger_changed: "Peak demand events increased 40%, causing $565K monthly in balancing costs",
  agent_insight: "Smart demand response could reduce peak load by 35% and save $6.8M annually",
  recommended_action: "Expand demand response program to save $565K monthly",
  impact_analysis: "$6.8M annual through improved demand management",
  show_your_working_out: {
    steps: [
      "40% peak event increase",
      "35% load reduction potential",
      "$565K monthly savings",
      "28% participation rate gap"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Demand Response Analytics",
    "Peak Load Analysis",
    "Program Impact Study"
  ],
  suggested_actions: [
    {
      label: "Meet DR Team",
      type: "meeting",
      target: "Demand Response"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "email"
    }
  ]
};