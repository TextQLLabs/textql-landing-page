import { type InsightData } from '../../../types/insights';

export const storeTrafficInsight: InsightData = {
  id: 1,
  title: "Store Traffic Pattern Alert",
  timestamp: "15 min ago",
  metrics: {
    value: "$25.2M Annual"
  },
  trigger_changed: "Store visits increased 45% while conversion dropped to 19%, creating $2.1M monthly revenue gap",
  agent_insight: "Current layout processes 185 customers/hour vs benchmark of 250/hour, causing 28% lower staff utilization",
  recommended_action: "Optimize store layout to capture $2.1M monthly through 32% conversion improvement",
  impact_analysis: "Potential $25.2M annual revenue increase through layout optimization",
  show_your_working_out: {
    steps: [
      "45% MoM traffic increase (98,000 vs 67,500 visitors)",
      "Conversion dropped from 28% to 19%",
      "$2.1M gap at $85 avg transaction",
      "28% staff utilization gap"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: ["Store Analytics Q1 2024", "POS Data March 2024"],
  suggested_actions: [
    {
      label: "Schedule Store Ops Meeting",
      type: "meeting",
      target: "Store Operations Team"
    },
    {
      label: "Share with Regional Manager",
      type: "share",
      target: "email"
    }
  ]
};