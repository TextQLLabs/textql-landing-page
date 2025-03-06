/**
 * Environment configuration
 */
export const ENV = {
  IS_LOCAL_DEV: import.meta.env.VITE_LOCAL_DEV_MODE === 'true'
} as const;

/**
 * Demo request configuration
 */
export const DEMO_CONFIG = {
  // Webhook URLs
  WEBHOOK_URLS: {
    SLACK: {
      SIMPLE: 'https://hooks.slack.com/triggers/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',
      EMAIL: 'https://hooks.slack.com/triggers/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'
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