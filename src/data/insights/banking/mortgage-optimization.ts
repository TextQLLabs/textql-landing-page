import { type InsightData } from '../../../types/insights';

export const mortgageOptimizationInsight: InsightData = {
  id: 5,
  title: "Mortgage Portfolio Optimization",
  metrics: {
    value: "$16.2M Annual"
  },
  trigger_changed: "3,200 mortgages at risk of refinancing with competitors, $840M portfolio value",
  agent_insight: "Proactive rate optimization could retain 65% of at-risk mortgages and protect margin",
  recommended_action: "Launch retention program to protect $1.35M monthly revenue",
  impact_analysis: "$16.2M annual through improved mortgage retention",
  show_your_working_out: {
    steps: [
      "3,200 at-risk mortgages",
      "$840M portfolio value",
      "65% retention potential",
      "$1.35M monthly revenue"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Mortgage Portfolio Analysis",
    "Competitive Rate Study",
    "Retention Model Output"
  ],
  suggested_actions: [
    {
      label: "Meet Mortgage Team",
      type: "meeting",
      target: "Mortgage Team"
    },
    {
      label: "Share Portfolio Data",
      type: "share",
      target: "email"
    }
  ]
};