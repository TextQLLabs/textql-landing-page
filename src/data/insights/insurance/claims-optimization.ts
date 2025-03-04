import type { Insight } from '../../../types/insights';

export const claimsOptimizationInsight: Insight = {
  id: 6,
  title: "Claims Processing Optimization",
  metrics: {
    conversionPotential: "35%",
    digitalOrderIncrease: "45%",
    satisfactionScoreGap: "25 points",
    potentialRevenueUplift: "$3.2M"
  },
  trigger_changed: "High claims processing times and customer dissatisfaction",
  agent_insight: "Analysis reveals opportunities for significant efficiency gains through automation and process optimization in claims handling.",
  recommended_action: "Implement AI-powered claims automation with real-time fraud detection and customer communication.",
  impact_analysis: "Expected 35% reduction in processing time and $3.2M cost savings through improved efficiency.",
  show_your_working_out: {
    steps: [
      "Analyzed current claims processing workflow",
      "Identified automation opportunities",
      "Evaluated fraud detection capabilities",
      "Mapped customer communication points",
      "Calculated efficiency gains"
    ],
    expand_button: "View Analysis Details"
  },
  cite_your_sources: [
    "Claims processing data",
    "Customer satisfaction surveys",
    "Industry benchmarks",
    "Process efficiency metrics"
  ]
};