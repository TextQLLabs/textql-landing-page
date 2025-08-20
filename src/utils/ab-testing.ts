import React from 'react';
import { trackEvent, trackMetaPixelEvent, trackMetaPixelCustomEvent } from './analytics';

// A/B Testing utility for PostHog feature flags
export class ABTestManager {
  private static instance: ABTestManager;
  private isPostHogReady = false;

  private constructor() {
    this.initializePostHogListener();
  }

  public static getInstance(): ABTestManager {
    if (!ABTestManager.instance) {
      ABTestManager.instance = new ABTestManager();
    }
    return ABTestManager.instance;
  }

  private initializePostHogListener() {
    // Check if PostHog is already loaded
    if (typeof window !== 'undefined' && window.posthog) {
      this.isPostHogReady = true;
      this.loadFeatureFlags();
    } else {
      // Wait for PostHog to load
      const checkPostHog = () => {
        if (typeof window !== 'undefined' && window.posthog) {
          this.isPostHogReady = true;
          this.loadFeatureFlags();
        } else {
          setTimeout(checkPostHog, 100);
        }
      };
      checkPostHog();
    }
  }

  private loadFeatureFlags() {
    if (!this.isPostHogReady || !window.posthog) return;

    // Listen for feature flag updates
    window.posthog.onFeatureFlags(() => {
      this.updateFeatureFlags();
    });

    // Initial load
    this.updateFeatureFlags();
  }

  private updateFeatureFlags() {
    if (!this.isPostHogReady || !window.posthog) return;

    // Feature flags are loaded and available via getFeatureFlag method
    // No need to store them locally as PostHog handles caching
  }

  /**
   * Get the variant for an A/B test
   * @param testName - Name of the test/feature flag
   * @param defaultVariant - Default variant if feature flag is not available
   * @returns The variant name
   */
  public getVariant(testName: string, defaultVariant: string = 'control'): string {
    if (!this.isPostHogReady || !window.posthog) {
      return defaultVariant;
    }

    try {
      const variant = window.posthog.getFeatureFlag(testName);
      // PostHog can return string, boolean, or undefined - we only want strings
      if (typeof variant === 'string') {
        return variant;
      }
      return defaultVariant;
    } catch (error) {
      console.warn(`[A/B Test] Error getting variant for ${testName}:`, error);
      return defaultVariant;
    }
  }

  /**
   * Track exposure to an A/B test variant
   * @param testName - Name of the test
   * @param variant - The variant shown to the user
   * @param properties - Additional properties to track
   */
  public trackExposure(testName: string, variant: string, properties?: Record<string, any>) {
    trackEvent('ab_test_exposure', {
      test_name: testName,
      variant,
      timestamp: new Date().toISOString(),
      ...properties,
    });

    // Also track in development for debugging
    if (import.meta.env.DEV) {
      console.log(`[A/B Test] Exposure tracked - ${testName}: ${variant}`, properties || {});
    }
  }

  /**
   * Track conversion for an A/B test
   * @param testName - Name of the test
   * @param variant - The variant the user was in
   * @param conversionType - Type of conversion (e.g., 'signup', 'purchase', 'click')
   * @param properties - Additional properties to track
   */
  public trackConversion(testName: string, variant: string, conversionType: string, properties?: Record<string, any>) {
    // Track in PostHog
    trackEvent('ab_test_conversion', {
      test_name: testName,
      variant,
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
      ...properties,
    });

    // Track in Meta Pixel
    if (conversionType === 'trial_signup_click') {
      // Track standard Lead event for Meta Pixel
      trackMetaPixelEvent('Lead', {
        content_name: `Trial Signup - ${variant}`,
        content_category: 'trial',
        value: 5.00, // $5 trial value
        currency: 'USD',
        custom_variant: variant,
        custom_test_name: testName,
        ...properties,
      });

      // Also track custom event for A/B test analysis
      trackMetaPixelCustomEvent('TrialSignupClick', {
        test_name: testName,
        variant,
        button_location: properties?.location || 'unknown',
        timestamp: new Date().toISOString(),
      });
    }

    // Also track in development for debugging
    if (import.meta.env.DEV) {
      console.log(`[A/B Test] Conversion tracked - ${testName}: ${variant} -> ${conversionType}`, properties || {});
    }
  }

  /**
   * Check if PostHog is ready and feature flags are loaded
   */
  public isReady(): boolean {
    return this.isPostHogReady;
  }
}

// Export singleton instance
export const abTestManager = ABTestManager.getInstance();

// Convenience hooks for React components
export function useABTest(testName: string, defaultVariant: string = 'control') {
  const [hasTrackedExposure, setHasTrackedExposure] = React.useState(false);
  const variant = abTestManager.getVariant(testName, defaultVariant);
  
  // Track exposure only once when variant is determined
  React.useEffect(() => {
    if (variant && abTestManager.isReady() && !hasTrackedExposure) {
      abTestManager.trackExposure(testName, variant);
      setHasTrackedExposure(true);
    }
  }, [testName, variant, hasTrackedExposure]);

  return {
    variant,
    trackConversion: (conversionType: string, properties?: Record<string, any>) => {
      abTestManager.trackConversion(testName, variant, conversionType, properties);
    },
  };
}
