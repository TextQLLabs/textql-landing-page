import { type InsightData } from '../../../types/insights';

export const wealthManagementInsight: InsightData = {
  id: 3,
  title: "Wealth Management Opportunity",
  metrics: {
    value: "$22.4M Annual"
  },
  trigger_changed: "12,000 mass affluent customers show 75% lower investment product adoption",
  agent_insight: "Personalized advisory could increase AUM by $450M and boost fee income by 35%",
  recommended_action: "Launch targeted advisory program to capture $1.87M monthly",
  impact_analysis: "$22.4M annual through increased AUM and fee income",
  show_your_working_out: {
    steps: [
      "12,000 mass affluent customers",
      "75% product adoption gap",
      "$450M AUM opportunity",
      "35% fee income increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Wealth Management Analytics",
    "Customer Segmentation Report",
    "Product Adoption Study"
  ],
  suggested_actions: [
    {
      label: "Meet Advisory Team",
      type: "meeting",
      target: "Wealth Management"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "email"
    }
  ]
};