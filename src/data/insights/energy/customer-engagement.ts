import { type InsightData } from '../../../types/insights';

export const customerEngagementInsight: InsightData = {
  id: 5,
  title: "Customer Engagement Opportunity",
  metrics: {
    value: "$3.6M Annual"
  },
  trigger_changed: "Digital engagement 55% below utility benchmark, affecting satisfaction",
  agent_insight: "Mobile app adoption could improve satisfaction by 40% and reduce service costs",
  recommended_action: "Launch digital engagement program to save $300K monthly",
  impact_analysis: "$3.6M annual through improved customer engagement",
  show_your_working_out: {
    steps: [
      "55% engagement gap",
      "40% satisfaction potential",
      "35% cost reduction",
      "$300K monthly savings"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Digital Engagement Analytics",
    "Customer Satisfaction Study",
    "Cost Analysis Report"
  ],
  suggested_actions: [
    {
      label: "Meet Digital Team",
      type: "meeting",
      target: "Digital Services"
    },
    {
      label: "Share Analytics",
      type: "share",
      target: "slack"
    }
  ]
};