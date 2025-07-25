declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, properties?: Record<string, any>) => void;
      reset: () => void;
      people: {
        set: (properties: Record<string, any>) => void;
      };
    };
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (window.posthog) {
    window.posthog.capture(eventName, properties);
  }
};

export const trackButtonClick = (buttonName: string, location: string, properties?: Record<string, any>) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    location,
    ...properties,
  });
};

export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    ...properties,
  });
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (window.posthog) {
    window.posthog.identify(userId, properties);
  }
};

export const resetUser = () => {
  if (window.posthog) {
    window.posthog.reset();
  }
};