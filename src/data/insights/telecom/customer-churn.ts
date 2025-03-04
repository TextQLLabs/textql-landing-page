import { type InsightData } from '../../../types/insights';

export const customerChurnInsight: InsightData = {
  id: 3,
  title: "Customer Churn Risk Alert",
  metrics: {
    value: "$8.6M Annual"
  },
  trigger_changed: "45,000 high-value customers showing 65% higher churn risk signals",
  agent_insight: "Proactive retention could reduce churn by 40% and improve CLTV by 25%",
  recommended_action: "Launch AI retention program to protect $720K monthly",
  impact_analysis: "$8.6M annual through improved customer retention",
  show_your_working_out: {
    steps: [
      "45,000 at-risk customers",
      "65% higher churn signals",
      "40% churn reduction potential",
      "25% CLTV improvement"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Churn Analytics Q1 2024",
    "Customer Value Report",
    "Retention Model Output"
  ],
  suggested_actions: [
    {
      label: "Meet Retention Team",
      type: "meeting",
      target: "Customer Retention"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "slack"
    }
  ]
};