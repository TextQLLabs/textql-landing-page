import { type InsightData } from '../../../types/insights';

export const supplierRiskInsight: InsightData = {
  id: 3,
  title: "Supplier Risk Alert",
  metrics: {
    value: "$12.4M Annual"
  },
  trigger_changed: "Critical supplier delays increased 55%, risking $1.03M monthly in production losses",
  agent_insight: "Diversification strategy could reduce risk by 65% and improve resilience",
  recommended_action: "Implement multi-sourcing to protect $1.03M monthly revenue",
  impact_analysis: "$12.4M annual through improved supplier reliability",
  show_your_working_out: {
    steps: [
      "55% supplier delay increase",
      "65% risk reduction potential",
      "$1.03M monthly exposure",
      "30% resilience improvement"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Supplier Risk Analytics",
    "Delay Impact Study",
    "Resilience Assessment"
  ],
  suggested_actions: [
    {
      label: "Meet Procurement",
      type: "meeting",
      target: "Procurement Team"
    },
    {
      label: "Share Risk Report",
      type: "share",
      target: "teams"
    }
  ]
};