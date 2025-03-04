import { type InsightData } from '../../../types/insights';

export const spectrumOptimizationInsight: InsightData = {
  id: 4,
  title: "Spectrum Efficiency Alert",
  metrics: {
    value: "$5.4M Annual"
  },
  trigger_changed: "Spectrum utilization 35% below optimal in high-density areas",
  agent_insight: "Dynamic allocation could improve capacity by 45% and reduce congestion by 60%",
  recommended_action: "Implement dynamic spectrum allocation to save $450K monthly",
  impact_analysis: "$5.4M annual through improved spectrum efficiency",
  show_your_working_out: {
    steps: [
      "35% utilization gap",
      "45% capacity improvement",
      "60% congestion reduction",
      "$450K monthly savings"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Spectrum Analytics",
    "Network Capacity Report",
    "Optimization Study"
  ],
  suggested_actions: [
    {
      label: "Meet Network Team",
      type: "meeting",
      target: "Network Operations"
    },
    {
      label: "Share Spectrum Data",
      type: "share",
      target: "email"
    }
  ]
};