import { type InsightData } from '../../../types/insights';

export const digitalTransformationInsight: InsightData = {
  id: 5,
  title: "Digital Transformation Gap",
  metrics: {
    value: "$8.4M Annual"
  },
  trigger_changed: "Digital service adoption 45% below industry average, affecting efficiency",
  agent_insight: "Modern digital platform could improve adoption by 60% and reduce costs",
  recommended_action: "Launch digital transformation to save $700K monthly",
  impact_analysis: "$8.4M annual through digital modernization",
  show_your_working_out: {
    steps: [
      "45% adoption gap",
      "60% improvement potential",
      "$700K monthly savings",
      "35% cost reduction"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Digital Analytics",
    "Industry Benchmark Study",
    "Cost Analysis Report"
  ],
  suggested_actions: [
    {
      label: "Meet Digital Team",
      type: "meeting",
      target: "Digital Strategy"
    },
    {
      label: "Share Roadmap",
      type: "share",
      target: "email"
    }
  ]
};