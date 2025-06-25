import { type InsightData } from '../../../types/insights';

export const digitalTransformationInsight: InsightData = {
  id: 3,
  title: "Digital Transformation Gap",
  timestamp: "8 min ago",
  metrics: {
    value: "$15.2M Annual"
  },
  trigger_changed: "Digital adoption 65% below industry average, affecting patient engagement",
  agent_insight: "Digital platform could improve engagement by 75% and reduce administrative costs",
  recommended_action: "Launch digital health platform to capture $1.27M monthly",
  impact_analysis: "$15.2M annual through digital transformation",
  show_your_working_out: {
    steps: [
      "65% adoption gap",
      "75% engagement potential",
      "30% cost reduction",
      "$1.27M monthly impact"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Digital Health Analytics",
    "Patient Engagement Study",
    "Cost Analysis Report"
  ],
  suggested_actions: [
    {
      label: "Meet Digital Team",
      type: "meeting",
      target: "Digital Health"
    },
    {
      label: "Share Strategy",
      type: "share",
      target: "slack"
    }
  ]
};