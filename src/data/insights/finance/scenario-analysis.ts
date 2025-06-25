import { type InsightData } from '../../../types/insights';

export const scenarioAnalysisInsight: InsightData = {
  id: 103,
  title: "Economic Downturn Risk",
  timestamp: "2 weeks ago",
  metrics: {
    value: "$23.4M Risk"
  },
  trigger_changed: "Monte Carlo simulation shows 68% probability of 15% revenue decline if recession materializes by Q4",
  agent_insight: "Best case scenario maintains current trajectory (+8% growth), worst case shows -28% revenue impact requiring $15M cost reduction",
  recommended_action: "Prepare contingency plans for 3 scenarios and establish trigger metrics for rapid response activation",
  impact_analysis: "Scenario planning reveals $23.4M revenue at risk with prepared mitigation strategies",
  show_your_working_out: {
    steps: [
      "Base case: +8% revenue growth (probability: 22%)",
      "Moderate recession: -15% revenue (probability: 68%)",
      "Severe downturn: -28% revenue (probability: 10%)",
      "Expected value impact: $23.4M at risk"
    ],
    expand_button: "Show Scenarios"
  },
  cite_your_sources: ["Economic Research Q2 2024", "Historical Performance Data", "Monte Carlo Model v3.2"],
  suggested_actions: [
    {
      label: "Strategy Planning Session",
      type: "meeting",
      target: "Executive Team"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "board-presentation"
    }
  ],
  alert_level: "medium",
  category: "risk"
};