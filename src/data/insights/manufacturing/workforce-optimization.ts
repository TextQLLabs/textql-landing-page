import { type InsightData } from '../../../types/insights';

export const workforceOptimizationInsight: InsightData = {
  id: 5,
  title: "Workforce Optimization Alert",
  metrics: {
    value: "$4.2M Annual"
  },
  trigger_changed: "Labor utilization 32% below benchmark across 3 shifts",
  agent_insight: "AI scheduling could improve productivity by 45% and reduce overtime by 35%",
  recommended_action: "Deploy AI workforce planning to save $350K monthly",
  impact_analysis: "$4.2M annual through improved labor efficiency",
  show_your_working_out: {
    steps: [
      "32% utilization gap",
      "3 shifts affected",
      "45% productivity potential",
      "35% overtime reduction"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Workforce Analytics",
    "Shift Performance Data",
    "AI Scheduling Study"
  ],
  suggested_actions: [
    {
      label: "Meet HR Team",
      type: "meeting",
      target: "HR Operations"
    },
    {
      label: "Share Schedule Data",
      type: "share",
      target: "slack"
    }
  ]
};