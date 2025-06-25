import { type InsightData } from '../../../types/insights';

export const marginCompressionInsight: InsightData = {
  id: 102,
  title: "Margin Compression Alert",
  timestamp: "5 min ago",
  metrics: {
    value: "$12.8M Impact"
  },
  trigger_changed: "Gross margins compressed 340bps to 28.1% as COGS increased 18% while revenue grew only 4%",
  agent_insight: "Raw material costs driving 65% of margin pressure with supplier price increases averaging 22% across key commodities",
  recommended_action: "Renegotiate supplier contracts and implement pricing strategy to recover $8.5M in margin erosion",
  impact_analysis: "Annual margin recovery potential of $12.8M through pricing and procurement optimization",
  show_your_working_out: {
    steps: [
      "Gross margin: 31.5% → 28.1% (340bps decline)",
      "COGS inflation: +18% vs revenue +4%",
      "Supplier price increases: 22% average",
      "Margin recovery opportunity: $12.8M"
    ],
    expand_button: "Show Analysis"
  },
  cite_your_sources: ["Financial Statements Q1 2024", "Procurement Dashboard", "Supplier Contracts Database"],
  suggested_actions: [
    {
      label: "Procurement Strategy Meeting",
      type: "meeting",
      target: "Procurement Team"
    },
    {
      label: "Share with CEO",
      type: "share",
      target: "executive-brief"
    }
  ],
  alert_level: "high",
  category: "performance"
};