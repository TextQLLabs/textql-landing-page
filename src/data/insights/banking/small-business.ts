import { type InsightData } from '../../../types/insights';

export const smallBusinessInsight: InsightData = {
  id: 4,
  title: "Small Business Lending Alert",
  metrics: {
    value: "$18.6M Annual"
  },
  trigger_changed: "8,500 small businesses qualify for $125M in untapped credit lines",
  agent_insight: "AI underwriting could approve 45% more applications while reducing risk by 25%",
  recommended_action: "Implement AI lending platform to capture $1.55M monthly",
  impact_analysis: "$18.6M annual through expanded small business lending",
  show_your_working_out: {
    steps: [
      "8,500 qualified businesses",
      "$125M credit opportunity",
      "45% approval rate increase",
      "25% risk reduction potential"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Small Business Analytics",
    "Credit Risk Assessment",
    "AI Underwriting Study"
  ],
  suggested_actions: [
    {
      label: "Schedule Risk Team",
      type: "meeting",
      target: "Risk Management"
    },
    {
      label: "Share with Lending",
      type: "share",
      target: "teams"
    }
  ]
};