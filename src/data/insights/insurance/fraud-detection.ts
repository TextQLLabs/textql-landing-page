import { type InsightData } from '../../../types/insights';

export const fraudDetectionInsight: InsightData = {
  id: 4,
  title: "Fraud Detection Opportunity",
  metrics: {
    value: "$11.4M Annual"
  },
  trigger_changed: "Fraud losses increased 40%, costing $950K monthly in false claims",
  agent_insight: "AI detection system could identify 55% more fraud while reducing false positives",
  recommended_action: "Implement AI fraud detection to save $950K monthly",
  impact_analysis: "$11.4M annual through improved fraud prevention",
  show_your_working_out: {
    steps: [
      "40% fraud increase",
      "55% detection improvement",
      "$950K monthly savings",
      "30% false positive reduction"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Fraud Analytics",
    "Claims Investigation Data",
    "AI Model Validation"
  ],
  suggested_actions: [
    {
      label: "Meet Security Team",
      type: "meeting",
      target: "Fraud Prevention"
    },
    {
      label: "Share Report",
      type: "share",
      target: "slack"
    }
  ]
};