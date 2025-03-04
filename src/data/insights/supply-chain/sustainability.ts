import { type InsightData } from '../../../types/insights';

export const sustainabilityInsight: InsightData = {
  id: 5,
  title: "Sustainability Opportunity",
  metrics: {
    value: "$6.4M Annual"
  },
  trigger_changed: "Carbon footprint 45% above industry benchmark, risking $533K monthly in penalties",
  agent_insight: "Green logistics program could reduce emissions by 50% and improve brand value",
  recommended_action: "Launch sustainability initiative to save $533K monthly",
  impact_analysis: "$6.4M annual through improved sustainability metrics",
  show_your_working_out: {
    steps: [
      "45% emissions gap",
      "50% reduction potential",
      "$533K monthly savings",
      "25% brand value increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Sustainability Analytics",
    "Carbon Footprint Study",
    "Brand Impact Report"
  ],
  suggested_actions: [
    {
      label: "Meet Green Team",
      type: "meeting",
      target: "Sustainability"
    },
    {
      label: "Share Initiative",
      type: "share",
      target: "email"
    }
  ]
};