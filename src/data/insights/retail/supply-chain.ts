import { type InsightData } from '../../../types/insights';

export const supplyChainInsight: InsightData = {
  id: 5,
  title: "Supply Chain Risk Alert",
  timestamp: "1 hr ago",
  metrics: {
    value: "$8.8M Annual"
  },
  trigger_changed: "Key supplier delays increased 65%, risking $735K monthly in lost sales",
  agent_insight: "Single-source dependency on 3 suppliers creates 85% of delay risk",
  recommended_action: "Implement multi-source strategy to protect $735K monthly revenue",
  impact_analysis: "$8.8M annual revenue protected through diversified sourcing",
  show_your_working_out: {
    steps: [
      "65% longer lead times",
      "3 high-risk suppliers",
      "85% risk concentration",
      "$735K monthly exposure"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: ["Supply Chain Analytics", "Vendor Risk Report Q1"],
  suggested_actions: [
    {
      label: "Meet Procurement",
      type: "meeting",
      target: "Procurement Team"
    },
    {
      label: "Share Risk Report",
      type: "share",
      target: "email"
    }
  ]
};