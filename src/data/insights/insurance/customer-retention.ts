import { type InsightData } from '../../../types/insights';

export const customerRetentionInsight: InsightData = {
  id: 3,
  title: "Customer Retention Alert",
  metrics: {
    value: "$9.6M Annual"
  },
  trigger_changed: "Policy renewal rates dropped 25%, risking $800K monthly in premium revenue",
  agent_insight: "Predictive engagement could improve retention by 35% and increase cross-sell",
  recommended_action: "Launch retention program to protect $800K monthly revenue",
  impact_analysis: "$9.6M annual through improved customer retention",
  show_your_working_out: {
    steps: [
      "25% renewal rate drop",
      "35% retention improvement",
      "$800K monthly impact",
      "40% cross-sell potential"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Retention Analytics",
    "Customer Behavior Study",
    "Revenue Impact Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet CRM Team",
      type: "meeting",
      target: "Customer Relations"
    },
    {
      label: "Share Strategy",
      type: "share",
      target: "teams"
    }
  ]
};