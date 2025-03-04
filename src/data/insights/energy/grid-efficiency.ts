import { type InsightData } from '../../../types/insights';

export const gridEfficiencyInsight: InsightData = {
  id: 1,
  title: "Grid Efficiency Alert",
  metrics: {
    value: "$2.8M Annual"
  },
  trigger_changed: "Peak load inefficiencies causing 28% higher distribution losses",
  agent_insight: "Smart grid optimization could improve efficiency by 20% and reduce peak load by 35%",
  recommended_action: "Deploy AI-driven load balancing system across regional grid",
  impact_analysis: "$2.8M annual savings through 20% efficiency improvement",
  show_your_working_out: {
    steps: [
      "28% distribution losses",
      "20% efficiency improvement potential",
      "35% peak load reduction",
      "$2.8M cost savings modeled"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Grid Analytics Q1",
    "Efficiency Report 2024",
    "Load Distribution Data"
  ],
  suggested_actions: [
    {
      label: "Schedule Grid Ops",
      type: "meeting",
      target: "Grid Operations"
    },
    {
      label: "Share with Eng Team",
      type: "share",
      target: "slack"
    }
  ]
};