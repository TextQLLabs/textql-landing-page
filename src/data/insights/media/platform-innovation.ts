import { type InsightData } from '../../../types/insights';

export const platformInnovationInsight: InsightData = {
  id: 5,
  title: "Platform Innovation Gap",
  metrics: {
    value: "$7.8M Annual"
  },
  trigger_changed: "Platform features 40% behind competitors, affecting user acquisition",
  agent_insight: "Next-gen features could increase user base by 35% and improve monetization",
  recommended_action: "Launch innovation program to capture $650K monthly",
  impact_analysis: "$7.8M annual through platform modernization",
  show_your_working_out: {
    steps: [
      "40% feature gap",
      "35% user growth potential",
      "$650K monthly opportunity",
      "28% monetization increase"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Platform Analytics",
    "Competitor Analysis",
    "Innovation Study"
  ],
  suggested_actions: [
    {
      label: "Meet Product Team",
      type: "meeting",
      target: "Product Strategy"
    },
    {
      label: "Share Roadmap",
      type: "share",
      target: "email"
    }
  ]
};