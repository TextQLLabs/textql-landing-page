import { type InsightData } from '../../../types/insights';

export const fraudPreventionInsight: InsightData = {
  id: 2,
  title: "Fraud Prevention Alert",
  metrics: {
    value: "$28.8M Annual"
  },
  trigger_changed: "New fraud pattern affects 55% more transactions, risking $2.4M monthly",
  agent_insight: "AI system could improve detection 55% while reducing false positives from 8.2% to 3.5%",
  recommended_action: "Upgrade detection algorithms to prevent $2.4M monthly exposure",
  impact_analysis: "$28.8M annual savings through 55% better detection",
  show_your_working_out: {
    steps: [
      "55% increase in fraud attempts",
      "$2.4M monthly exposure",
      "4.7% false positive gap",
      "AI model validation complete"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Fraud Analytics Q1 2024",
    "Transaction Security Report",
    "AI Model Validation"
  ],
  suggested_actions: [
    {
      label: "Meet Security Team",
      type: "meeting",
      target: "Security Team"
    },
    {
      label: "Share via Email",
      type: "share",
      target: "email"
    }
  ]
};