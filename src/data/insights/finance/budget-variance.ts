import { type InsightData } from '../../../types/insights';

export const budgetVarianceInsight: InsightData = {
  id: 101,
  title: "Department X Budget Exceeding Alert",
  timestamp: "15 min ago",
  metrics: {
    value: "$4.7M Variance"
  },
  trigger_changed: "Marketing department 87% over budget with Q2 spending at $8.2M vs $4.4M planned",
  agent_insight: "Q2 digital advertising campaigns exceeded allocation by $3.8M, driving 87% budget variance with no corresponding ROI metrics tracked",
  recommended_action: "Implement immediate spending controls and reassess Q3-Q4 budget allocation to prevent $14.1M annual overage",
  impact_analysis: "Risk of $14.1M annual budget overage without immediate intervention",
  show_your_working_out: {
    steps: [
      "Q2 actual spend: $8.2M vs budget $4.4M",
      "87% variance = $3.8M overage",
      "Annualized risk: $14.1M total overage",
      "No ROI tracking on excess spend"
    ],
    expand_button: "Show Calculation"
  },
  cite_your_sources: ["ERP Q2 2024", "Budget Planning System", "Department Spend Reports"],
  suggested_actions: [
    {
      label: "Emergency CFO Meeting",
      type: "meeting",
      target: "Finance Leadership"
    },
    {
      label: "Share with Board",
      type: "share",
      target: "board-report"
    }
  ],
  alert_level: "critical",
  category: "risk"
};