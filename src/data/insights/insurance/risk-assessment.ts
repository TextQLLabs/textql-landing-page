import { type InsightData } from '../../../types/insights';

export const riskAssessmentInsight: InsightData = {
  id: 2,
  title: "Risk Assessment Enhancement",
  metrics: {
    value: "$12.8M Annual"
  },
  trigger_changed: "Risk model accuracy 35% below target, affecting premium pricing efficiency",
  agent_insight: "ML-based risk assessment could improve accuracy by 45% and optimize pricing",
  recommended_action: "Deploy advanced risk modeling to capture $1.07M monthly",
  impact_analysis: "$12.8M annual through improved risk assessment",
  show_your_working_out: {
    steps: [
      "35% accuracy gap",
      "45% improvement potential",
      "$1.07M monthly opportunity",
      "28% pricing optimization"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Risk Analytics",
    "Model Performance Study",
    "Pricing Impact Report"
  ],
  suggested_actions: [
    {
      label: "Meet Risk Team",
      type: "meeting",
      target: "Risk Management"
    },
    {
      label: "Share Models",
      type: "share",
      target: "email"
    }
  ]
};