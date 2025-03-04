import { type InsightData } from '../../../types/insights';

export const digitalBankingInsight: InsightData = {
  id: 1,
  title: "Digital Banking Adoption Alert",
  metrics: {
    value: "$15.8M Annual"
  },
  trigger_changed: "25,000 premium customers show 40% lower mobile adoption, averaging 2.3 vs 5.8 weekly transactions",
  agent_insight: "Feature education could boost adoption 40%, reducing processing costs by 25%",
  recommended_action: "Launch personalized campaign to capture $1.32M monthly opportunity",
  impact_analysis: "$15.8M annual through 40% higher adoption and reduced costs",
  show_your_working_out: {
    steps: [
      "25,000 customers at 40% lower usage",
      "$52.80 monthly revenue gap per customer",
      "2.3 vs 5.8 weekly transactions",
      "25% processing cost reduction"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Digital Banking Report Q1",
    "Customer Behavior Analysis",
    "Transaction Data"
  ],
  suggested_actions: [
    {
      label: "Schedule Digital Team",
      type: "meeting",
      target: "Digital Banking Team"
    },
    {
      label: "Share with Marketing",
      type: "share",
      target: "slack"
    }
  ]
};