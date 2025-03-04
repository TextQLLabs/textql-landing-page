import { type InsightData } from '../../../types/insights';

export const telehealthInsight: InsightData = {
  id: 5,
  title: "Telehealth Adoption Gap",
  metrics: {
    value: "$7.2M Annual"
  },
  trigger_changed: "Telehealth utilization 50% below potential, missing remote care opportunities",
  agent_insight: "Enhanced telehealth platform could increase adoption by 70% and reduce costs",
  recommended_action: "Upgrade telehealth system to capture $600K monthly",
  impact_analysis: "$7.2M annual through improved telehealth adoption",
  show_your_working_out: {
    steps: [
      "50% utilization gap",
      "70% adoption potential",
      "25% cost reduction",
      "$600K monthly opportunity"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Telehealth Analytics",
    "Remote Care Study",
    "Cost Efficiency Report"
  ],
  suggested_actions: [
    {
      label: "Meet Virtual Care",
      type: "meeting",
      target: "Telehealth Team"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "teams"
    }
  ]
};