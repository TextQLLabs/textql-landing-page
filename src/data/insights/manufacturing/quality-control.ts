import { type InsightData } from '../../../types/insights';

export const qualityControlInsight: InsightData = {
  id: 3,
  title: "Quality Control Enhancement",
  metrics: {
    value: "$7.2M Annual"
  },
  trigger_changed: "Defect rate increased 45% across 8 production lines, affecting yield",
  agent_insight: "AI vision system could reduce defects by 65% and improve yield by 28%",
  recommended_action: "Deploy AI quality control to save $600K monthly",
  impact_analysis: "$7.2M annual through reduced defects and improved yield",
  show_your_working_out: {
    steps: [
      "45% defect rate increase",
      "8 affected production lines",
      "65% defect reduction potential",
      "28% yield improvement"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Quality Control Analytics",
    "Production Line Data",
    "AI Vision System Study"
  ],
  suggested_actions: [
    {
      label: "Meet Quality Team",
      type: "meeting",
      target: "Quality Control"
    },
    {
      label: "Share QC Report",
      type: "share",
      target: "email"
    }
  ]
};