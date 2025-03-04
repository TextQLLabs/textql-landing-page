import { type InsightData } from '../../../types/insights';

export const adOptimizationInsight: InsightData = {
  id: 4,
  title: "Ad Performance Opportunity",
  metrics: {
    value: "$10.2M Annual"
  },
  trigger_changed: "Ad engagement rates 30% below target, affecting $850K monthly revenue",
  agent_insight: "AI-driven ad placement could improve CTR by 45% and boost revenue",
  recommended_action: "Deploy smart ad platform to capture $850K monthly",
  impact_analysis: "$10.2M annual through improved ad performance",
  show_your_working_out: {
    steps: [
      "30% engagement gap",
      "45% CTR improvement",
      "$850K monthly opportunity",
      "38% revenue increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Ad Performance Analytics",
    "CTR Study",
    "Revenue Impact Report"
  ],
  suggested_actions: [
    {
      label: "Meet Ad Team",
      type: "meeting",
      target: "Ad Operations"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "slack"
    }
  ]
};