import { type InsightData } from '../../../types/insights';

export const enterpriseServicesInsight: InsightData = {
  id: 5,
  title: "Enterprise Services Opportunity",
  metrics: {
    value: "$12.8M Annual"
  },
  trigger_changed: "Enterprise segment showing 40% lower cloud service adoption vs market",
  agent_insight: "Bundled solutions could increase adoption by 55% and improve margins by 30%",
  recommended_action: "Launch enterprise bundle program to capture $1.07M monthly",
  impact_analysis: "$12.8M annual through increased enterprise services",
  show_your_working_out: {
    steps: [
      "40% adoption gap",
      "55% adoption potential",
      "30% margin improvement",
      "$1.07M monthly opportunity"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Enterprise Analytics",
    "Market Adoption Study",
    "Product Margin Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet Enterprise Team",
      type: "meeting",
      target: "Enterprise Sales"
    },
    {
      label: "Share Market Data",
      type: "share",
      target: "teams"
    }
  ]
};