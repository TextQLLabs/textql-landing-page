import { type InsightData } from '../../../types/insights';

export const supplyChainRiskInsight: InsightData = {
  id: 2,
  title: "Supply Chain Risk Alert",
  timestamp: "45 min ago",
  metrics: {
    value: "$3.2M Annual"
  },
  trigger_changed: "Critical supplier stability issues affecting 45% of key components",
  agent_insight: "Multi-source strategy could reduce supply risk by 65% and save $3.2M annually",
  recommended_action: "Implement multi-source procurement strategy for key components",
  impact_analysis: "$3.2M annual savings through diversified sourcing",
  show_your_working_out: {
    steps: [
      "45% component risk exposure",
      "65% risk reduction potential",
      "$3.2M annual cost impact",
      "8 alternative suppliers identified"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Supply Chain Analysis",
    "Risk Assessment Q1 2024",
    "Supplier Database"
  ],
  suggested_actions: [
    {
      label: "Meet Procurement",
      type: "meeting",
      target: "Procurement Team"
    },
    {
      label: "Share via Slack",
      type: "share",
      target: "slack"
    }
  ]
};