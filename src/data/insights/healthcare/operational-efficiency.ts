import { type InsightData } from '../../../types/insights';

export const operationalEfficiencyInsight: InsightData = {
  id: 2,
  title: "Operational Efficiency Alert",
  timestamp: "3 hr ago",
  metrics: {
    value: "$8.6M Annual"
  },
  trigger_changed: "Operating room utilization 45% below benchmark, causing $720K monthly revenue loss",
  agent_insight: "Smart scheduling could improve utilization by 55% and reduce overtime by 30%",
  recommended_action: "Deploy AI scheduling system to capture $720K monthly opportunity",
  impact_analysis: "$8.6M annual through improved OR utilization",
  show_your_working_out: {
    steps: [
      "45% utilization gap",
      "55% improvement potential",
      "30% overtime reduction",
      "$720K monthly opportunity"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "OR Analytics Q1 2024",
    "Efficiency Benchmark Study",
    "Scheduling System Data"
  ],
  suggested_actions: [
    {
      label: "Schedule OR Team",
      type: "meeting",
      target: "OR Management"
    },
    {
      label: "Share Report",
      type: "share",
      target: "teams"
    }
  ]
};