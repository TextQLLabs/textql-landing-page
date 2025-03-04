import { type InsightData } from '../../../types/insights';

export const renewableIntegrationInsight: InsightData = {
  id: 2,
  title: "Renewable Integration Alert",
  metrics: {
    value: "$5.6M Annual"
  },
  trigger_changed: "Renewable energy integration causing 45% higher grid instability",
  agent_insight: "Smart storage deployment could improve integration by 45% and stabilize supply",
  recommended_action: "Deploy advanced battery storage system in key locations",
  impact_analysis: "$5.6M annual through improved integration and stability",
  show_your_working_out: {
    steps: [
      "45% grid instability increase",
      "45% integration improvement potential",
      "30% stability enhancement",
      "$5.6M revenue opportunity"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Renewable Energy Report",
    "Grid Stability Analysis",
    "Storage System Data"
  ],
  suggested_actions: [
    {
      label: "Meet Storage Team",
      type: "meeting",
      target: "Storage Team"
    },
    {
      label: "Share via Email",
      type: "share",
      target: "email"
    }
  ]
};