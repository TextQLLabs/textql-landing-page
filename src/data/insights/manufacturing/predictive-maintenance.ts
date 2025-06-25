import { type InsightData } from '../../../types/insights';

export const predictiveMaintenanceInsight: InsightData = {
  id: 4,
  title: "Predictive Maintenance Opportunity",
  timestamp: "yesterday",
  metrics: {
    value: "$5.8M Annual"
  },
  trigger_changed: "Unplanned downtime increased 35%, causing $485K monthly production loss",
  agent_insight: "IoT sensors and ML could predict 82% of failures 2-3 weeks in advance",
  recommended_action: "Implement predictive maintenance to save $485K monthly",
  impact_analysis: "$5.8M annual through reduced downtime and maintenance costs",
  show_your_working_out: {
    steps: [
      "35% downtime increase",
      "$485K monthly loss",
      "82% prediction accuracy",
      "2-3 weeks advance warning"
    ],
    expand_button: "Show Steps"
  },
  cite_your_sources: [
    "Maintenance Analytics",
    "Downtime Cost Analysis",
    "IoT Pilot Results"
  ],
  suggested_actions: [
    {
      label: "Schedule Maintenance",
      type: "meeting",
      target: "Maintenance Team"
    },
    {
      label: "Share IoT Data",
      type: "share",
      target: "teams"
    }
  ]
};