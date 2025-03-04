import { type InsightData } from '../../../types/insights';

export const demandForecastingInsight: InsightData = {
  id: 4,
  title: "Demand Forecasting Enhancement",
  metrics: {
    value: "$9.8M Annual"
  },
  trigger_changed: "Forecast accuracy 40% below target, causing $817K monthly in stockouts and overstock",
  agent_insight: "AI forecasting could improve accuracy by 55% and optimize inventory levels",
  recommended_action: "Deploy AI forecasting to save $817K monthly",
  impact_analysis: "$9.8M annual through improved forecast accuracy",
  show_your_working_out: {
    steps: [
      "40% accuracy gap",
      "55% improvement potential",
      "$817K monthly impact",
      "32% inventory optimization"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Demand Analytics Q1",
    "Forecast Accuracy Study",
    "Inventory Impact Report"
  ],
  suggested_actions: [
    {
      label: "Meet Planning Team",
      type: "meeting",
      target: "Demand Planning"
    },
    {
      label: "Share Forecast",
      type: "share",
      target: "slack"
    }
  ]
};