import { type InsightData } from '../../../types/insights';

export const digitalChannelInsight: InsightData = {
  id: 4,
  title: "Digital Channel Alert",
  timestamp: "45 min ago",
  metrics: {
    value: "$12.4M Annual"
  },
  trigger_changed: "Mobile checkout abandonment spiked 45%, losing $1.03M potential revenue monthly",
  agent_insight: "Payment friction causes 82% of drops, averaging 3.2 extra steps vs desktop checkout",
  recommended_action: "Streamline mobile checkout to recover $1.03M monthly revenue",
  impact_analysis: "$12.4M annual revenue recovery through optimized checkout",
  show_your_working_out: {
    steps: [
      "45% abandonment increase",
      "82% due to payment friction",
      "3.2 extra checkout steps",
      "$1.03M monthly impact"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: ["Digital Analytics Q1", "Mobile UX Study 2024"],
  suggested_actions: [
    {
      label: "Schedule Tech Review",
      type: "meeting",
      target: "Digital Team"
    },
    {
      label: "Share UX Report",
      type: "share",
      target: "email"
    }
  ]
};