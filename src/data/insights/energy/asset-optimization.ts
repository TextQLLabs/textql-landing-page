import { type InsightData } from '../../../types/insights';

export const assetOptimizationInsight: InsightData = {
  id: 4,
  title: "Asset Performance Alert",
  metrics: {
    value: "$4.2M Annual"
  },
  trigger_changed: "Critical assets showing 25% efficiency decline, increasing maintenance costs",
  agent_insight: "Predictive maintenance could improve efficiency by 30% and reduce costs by 45%",
  recommended_action: "Deploy IoT monitoring to save $350K monthly",
  impact_analysis: "$4.2M annual through improved asset performance",
  show_your_working_out: {
    steps: [
      "25% efficiency decline",
      "30% improvement potential",
      "45% cost reduction",
      "$350K monthly savings"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Asset Performance Data",
    "Maintenance Cost Analysis",
    "IoT Pilot Results"
  ],
  suggested_actions: [
    {
      label: "Meet Asset Team",
      type: "meeting",
      target: "Asset Management"
    },
    {
      label: "Share IoT Data",
      type: "share",
      target: "teams"
    }
  ]
};