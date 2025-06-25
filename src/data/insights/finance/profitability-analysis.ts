import { type InsightData } from '../../../types/insights';

export const profitabilityAnalysisInsight: InsightData = {
  id: 104,
  title: "Product Line Profitability",
  timestamp: "4 days ago",
  metrics: {
    value: "$18.6M Opportunity"
  },
  trigger_changed: "Premium product line EBITDA margins reached 42% while standard products declined to 12%, indicating portfolio rebalancing opportunity",
  agent_insight: "Premium segment generates 3.5x higher margins despite representing only 28% of volume, suggesting significant revenue mix optimization potential",
  recommended_action: "Shift marketing spend toward premium products and phase out low-margin SKUs to capture $18.6M profit improvement",
  impact_analysis: "Portfolio optimization could improve overall EBITDA by $18.6M annually through mix shift",
  show_your_working_out: {
    steps: [
      "Premium line: 42% EBITDA margin (28% of volume)",
      "Standard line: 12% EBITDA margin (72% of volume)",
      "Margin differential: 3.5x premium advantage",
      "Mix optimization opportunity: $18.6M EBITDA uplift"
    ],
    expand_button: "Show Breakdown"
  },
  cite_your_sources: ["Product P&L Q1 2024", "SKU Performance Dashboard", "Customer Segment Analysis"],
  suggested_actions: [
    {
      label: "Product Strategy Review",
      type: "meeting",
      target: "Product Management"
    },
    {
      label: "Share with Sales",
      type: "share",
      target: "sales-team"
    }
  ],
  alert_level: "low",
  category: "opportunity"
};