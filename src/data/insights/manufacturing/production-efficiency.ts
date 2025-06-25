import { type InsightData } from '../../../types/insights';

export const productionEfficiencyInsight: InsightData = {
  id: 1,
  title: "Production Efficiency Alert",
  timestamp: "2 hr ago",
  metrics: {
    value: "$4.8M Annual"
  },
  trigger_changed: "Machine learning detected 35% production bottleneck affecting 12 production lines",
  agent_insight: "Process optimization could increase output by 30% while reducing material waste by 40%",
  recommended_action: "Implement AI-driven production scheduling across all affected lines",
  impact_analysis: "$4.8M annual through 30% higher output and 40% waste reduction",
  show_your_working_out: {
    steps: [
      "35% bottleneck across 12 lines",
      "Current waste rate at 18%",
      "30% output improvement potential",
      "40% waste reduction modeled"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Production Analytics Q1",
    "Efficiency Report 2024",
    "Machine Learning Model Output"
  ],
  suggested_actions: [
    {
      label: "Schedule Production",
      type: "meeting",
      target: "Production Team"
    },
    {
      label: "Share with Plant Mgr",
      type: "share",
      target: "email"
    }
  ]
};