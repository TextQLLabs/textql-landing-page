import { type InsightData } from '../../../types/insights';

export const networkPerformanceInsight: InsightData = {
  id: 1,
  title: "Network Performance Alert",
  metrics: {
    value: "$6.4M Annual"
  },
  trigger_changed: "Service quality issues affecting 250,000 users in high-density areas",
  agent_insight: "Network optimization could improve quality by 25% and reduce churn by 30%",
  recommended_action: "Implement dynamic load balancing across affected zones",
  impact_analysis: "$6.4M annual through reduced churn and improved service quality",
  show_your_working_out: {
    steps: [
      "250,000 affected users",
      "25% quality improvement potential",
      "30% churn reduction modeled",
      "$6.4M revenue protection"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Network Analytics Q1",
    "Customer Churn Report",
    "Service Quality Data"
  ],
  suggested_actions: [
    {
      label: "Schedule Network Ops",
      type: "meeting",
      target: "Network Operations"
    },
    {
      label: "Share with Tech Lead",
      type: "share",
      target: "slack"
    }
  ]
};