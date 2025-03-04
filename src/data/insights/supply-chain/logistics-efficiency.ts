import { type InsightData } from '../../../types/insights';

export const logisticsEfficiencyInsight: InsightData = {
  id: 2,
  title: "Logistics Efficiency Gap",
  metrics: {
    value: "$8.6M Annual"
  },
  trigger_changed: "Route optimization showing 35% inefficiency, increasing fuel costs by $720K monthly",
  agent_insight: "ML-based routing could improve efficiency by 40% and reduce delivery times",
  recommended_action: "Deploy smart routing system to save $720K monthly",
  impact_analysis: "$8.6M annual through improved logistics efficiency",
  show_your_working_out: {
    steps: [
      "35% route inefficiency",
      "40% improvement potential",
      "$720K monthly savings",
      "28% delivery time reduction"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Logistics Analytics Q1",
    "Route Efficiency Study",
    "Fuel Cost Analysis"
  ],
  suggested_actions: [
    {
      label: "Meet Logistics Team",
      type: "meeting",
      target: "Logistics Operations"
    },
    {
      label: "Share Report",
      type: "share",
      target: "email"
    }
  ]
};