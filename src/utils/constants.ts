/**
 * Demo request configuration
 */
export const DEMO_CONFIG = {
  // Webhook URLs
  WEBHOOK_URLS: {
    SLACK: {
      SIMPLE: 'https://hooks.slack.com/triggers/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',
      EMAIL: 'https://hooks.slack.com/triggers/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',
      SNOWFLAKE2025: 'https://hooks.slack.com/triggers/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',
      DATABRICKS2025: 'https://hooks.slack.com/triggers/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',
      PAGE_VISITS: 'https://hooks.slack.com/triggers/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'
    }
  },
  
  // Form URLs
  FORM_URLS: {
    SIMPLE: 'https://forms.default.com/740749',
    WITH_EMAIL: 'https://forms.default.com/529417'
  },
  
  // Base domain for page tracking
  BASE_DOMAIN: 'textql.com'
} as const;