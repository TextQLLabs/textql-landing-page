declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, properties?: Record<string, any>) => void;
      reset: () => void;
      people: {
        set: (properties: Record<string, any>) => void;
      };
      debug: () => void;
      // Feature flag methods
      getFeatureFlag: (key: string) => string | boolean | undefined;
      getFeatureFlags: () => Record<string, string | boolean>;
      onFeatureFlags: (callback: () => void) => void;
      isFeatureEnabled: (key: string) => boolean;
    };
  }
}

// Helper to check if PostHog is loaded
const isPostHogReady = (): boolean => {
  return typeof window !== 'undefined' && window.posthog !== undefined;
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!isPostHogReady()) {
    console.warn('[Analytics] PostHog not loaded yet, event not tracked:', eventName);
    return;
  }
  
  try {
    window.posthog!.capture(eventName, properties);
    
    // Debug logging in development
    if (import.meta.env.DEV) {
      console.log('[Analytics] Event tracked:', eventName, properties);
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, any>) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    location,
    timestamp: new Date().toISOString(),
    ...properties,
  });
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (!isPostHogReady()) {
    console.warn('[Analytics] PostHog not loaded yet, user not identified');
    return;
  }
  
  try {
    window.posthog!.identify(userId, properties);
    
    if (import.meta.env.DEV) {
      console.log('[Analytics] User identified:', userId, properties);
    }
  } catch (error) {
    console.error('[Analytics] Error identifying user:', error);
  }
};

export const resetUser = () => {
  if (!isPostHogReady()) {
    console.warn('[Analytics] PostHog not loaded yet, user not reset');
    return;
  }
  
  try {
    window.posthog!.reset();
    
    if (import.meta.env.DEV) {
      console.log('[Analytics] User reset');
    }
  } catch (error) {
    console.error('[Analytics] Error resetting user:', error);
  }
};

// Enable PostHog debug mode in development
export const enableDebugMode = () => {
  if (isPostHogReady()) {
    window.posthog!.debug();
    console.log('[Analytics] PostHog debug mode enabled');
  }
};