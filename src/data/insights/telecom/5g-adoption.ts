import { type InsightData } from '../../../types/insights';

export const fiveGAdoptionInsight: InsightData = {
  id: 2,
  title: "5G Adoption Opportunity",
  metrics: {
    value: "$4.2M Annual"
  },
  trigger_changed: "Low 5G adoption in business district with 35% coverage gap",
  agent_insight: "Targeted expansion could increase coverage by 35% and capture 8,000 business users",
  recommended_action: "Launch business-focused 5G campaign in identified zones",
  impact_analysis: "$4.2M annual revenue through increased 5G adoption",
  show_your_working_out: {
    steps: [
      "35% coverage gap identified",
      "8,000 potential business users",
      "$525 average revenue per user",
      "$4.2M revenue opportunity"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "5G Coverage Analysis",
    "Business Segment Report",
    "Market Opportunity Data"
  ],
  suggested_actions: [
    {
      label: "Meet Strategy Team",
      type: "meeting",
      target: "5G Strategy Team"
    },
    {
      label: "Share via Email",
      type: "share",
      target: "email"
    }
  ]
};