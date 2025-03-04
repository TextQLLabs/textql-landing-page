import { type InsightData } from '../../../types/insights';

export const patientCareInsight: InsightData = {
  id: 1,
  title: "Patient Care Enhancement",
  metrics: {
    value: "$12.4M Annual"
  },
  trigger_changed: "Patient satisfaction scores dropped 25% while readmission rates increased by 35%",
  agent_insight: "AI-driven care coordination could improve satisfaction by 40% and reduce readmissions",
  recommended_action: "Implement smart care coordination system to save $1.03M monthly",
  impact_analysis: "$12.4M annual through improved patient outcomes and reduced readmissions",
  show_your_working_out: {
    steps: [
      "25% satisfaction decline",
      "35% readmission increase",
      "40% improvement potential",
      "$1.03M monthly impact"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Patient Satisfaction Survey Q1",
    "Readmission Analytics 2024",
    "Care Coordination Study"
  ],
  suggested_actions: [
    {
      label: "Meet Care Team",
      type: "meeting",
      target: "Care Management"
    },
    {
      label: "Share Analysis",
      type: "share",
      target: "email"
    }
  ]
};