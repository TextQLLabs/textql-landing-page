import { type InsightData } from '../../../types/insights';

export const tariffImpactInsight: InsightData = {
  id: 105,
  title: "Tariff Cost Impact",
  timestamp: "2 min ago",
  metrics: {
    value: "$9.3M Cost"
  },
  trigger_changed: "New 25% tariffs on imported components will increase COGS by $9.3M annually, affecting 35% of product portfolio",
  agent_insight: "Steel and aluminum tariffs impact 12 key SKUs representing $37.2M revenue, requiring immediate pricing strategy or supplier diversification",
  recommended_action: "Implement 8% price increase on affected products and source alternative suppliers to mitigate $6.2M of tariff impact",
  impact_analysis: "Tariff mitigation strategy could recover $6.2M of the $9.3M annual cost increase",
  show_your_working_out: {
    steps: [
      "Affected revenue: $37.2M (35% of portfolio)",
      "Average tariff rate: 25% on imported components",
      "Annual cost increase: $9.3M",
      "Mitigation through pricing + sourcing: $6.2M recovery"
    ],
    expand_button: "Show Impact"
  },
  cite_your_sources: ["Trade Policy Update Q2 2024", "Supplier Contract Database", "Cost Structure Analysis"],
  suggested_actions: [
    {
      label: "Pricing Committee Meeting",
      type: "meeting",
      target: "Pricing Team"
    },
    {
      label: "Share with Procurement",
      type: "share",
      target: "procurement-team"
    }
  ],
  alert_level: "high",
  category: "risk"
};