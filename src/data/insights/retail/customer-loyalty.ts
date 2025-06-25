import { type InsightData } from '../../../types/insights';

export const customerLoyaltyInsight: InsightData = {
  id: 3,
  title: "Customer Loyalty Gap Alert",
  timestamp: "2 hr ago",
  metrics: {
    value: "$18.6M Annual"
  },
  trigger_changed: "38% spike in loyalty member churn rate, affecting 15,000 high-value customers",
  agent_insight: "Personalization gap shows 72% of churned members received generic promotions vs targeted offers",
  recommended_action: "Launch AI-driven personalization to reduce churn by 38%, saving $1.55M monthly",
  impact_analysis: "$18.6M annual revenue protected through improved retention",
  show_your_working_out: {
    steps: [
      "15,000 members at risk",
      "38% YoY churn increase",
      "$1.55M monthly revenue impact",
      "72% targeting improvement potential"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: ["Loyalty Program Analytics", "Customer Churn Report Q1"],
  suggested_actions: [
    {
      label: "Meet CRM Team",
      type: "meeting",
      target: "Customer Relations"
    },
    {
      label: "Share with Marketing",
      type: "share",
      target: "slack"
    }
  ]
};