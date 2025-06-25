import { type InsightData } from '../../../types/insights';

export const inventoryTurnoverInsight: InsightData = {
  id: 2,
  title: "Inventory Turnover Alert",
  timestamp: "32 min ago",
  metrics: {
    value: "$4.2M Annual"
  },
  trigger_changed: "$4.2M seasonal inventory has 42% slower clearance vs last season, costing $380K monthly in holding",
  agent_insight: "Dynamic pricing model shows 18% margin improvement potential with 2.8x lower holding costs",
  recommended_action: "Implement dynamic pricing for 42% faster clearance, saving $285K monthly",
  impact_analysis: "$3.4M margin improvement plus $855K quarterly holding cost savings",
  show_your_working_out: {
    steps: [
      "$4.2M at risk (32,000 units × $131)",
      "42% slower clearance rate",
      "$380K monthly holding cost",
      "18% margin improvement modeled"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: ["Inventory Management System", "Sales Forecast Q1 2024"],
  suggested_actions: [
    {
      label: "Meet Pricing Team",
      type: "meeting",
      target: "Pricing Strategy Team"
    },
    {
      label: "Share via Slack",
      type: "share",
      target: "slack"
    }
  ]
};