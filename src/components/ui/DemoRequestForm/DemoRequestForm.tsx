import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import type { DemoRequestFormProps } from './types';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { getThemeClasses } from '../../../utils/theme-utils';
import { COLORS } from '../../../styles/constants';
import { trackButtonClick } from '../../../utils/analytics';
import { supabase } from '../../../lib/supabase';

export function DemoRequestForm({ 
  theme,
  onSubmit,
  className = '',
  buttonText = 'Request Demo'
}: DemoRequestFormProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // Basic email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get PostHog data for analytics
      const ph: any = (typeof window !== 'undefined' && (window as any).posthog) ? (window as any).posthog : null;
      const distinctId = ph?.get_distinct_id?.();
      
      if (!distinctId) {
        console.warn('Missing PostHog distinct id, proceeding without database entry');
        // Still allow navigation even without PostHog
        sessionStorage.setItem('demo_email', email);
        sessionStorage.setItem('demo_source', window.location.pathname);
        onSubmit?.(email);
        trackButtonClick('Demo Form Submit', 'demo_request_form', { email_domain: email.split('@')[1], destination: 'request-demo' });
        navigate(`/request-demo?email=${encodeURIComponent(email)}`);
        return;
      }

      // Capture full PostHog session data for analytics
      const posthogData = ph ? {
        distinct_id: ph.get_distinct_id?.() ?? null,
        session_id: ph.get_session_id?.() ?? null,
        feature_flags: ph.getFeatureFlags?.() ?? null,
        session_replay_url: ph.get_session_replay_url?.() ?? null,
        user_properties: ph.people ?? null,
        page_view_id: ph.getPageViewId?.() ?? null,
        current_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
        timestamp: new Date().toISOString()
      } : null;

      // Create posthog_snapshot entry
      const { data: snapshotData, error: snapshotError } = await supabase
        .from('posthog_snapshot')
        .insert({
          trigger: 'email_form_submit',
          posthog_distinct_id: distinctId,
          posthog_session_id: posthogData?.session_id || null,
          page_view_id: posthogData?.page_view_id || null,
          session_replay_url: posthogData?.session_replay_url || null,
          feature_flags: posthogData?.feature_flags || null,
          current_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          full_session_data: posthogData
        })
        .select()
        .single();

      if (snapshotError) {
        console.error('Failed to create posthog snapshot:', snapshotError);
        // Continue with navigation even if DB insert fails
      }

      // Create form_response entry if snapshot was created successfully
      let formResponseId = null;
      if (!snapshotError && snapshotData) {
        const { data: formData, error: formError } = await supabase
          .from('form_response')
          .insert({
            email: email.toLowerCase().trim(),
            posthog_snapshot_id: snapshotData.id
          })
          .select()
          .single();

        if (formError) {
          console.error('Failed to create form response:', formError);
        } else {
          formResponseId = formData.id;
        }
      }

      // Add to identity table
      const { data: identityData, error: identityError } = await supabase
        .from('identity')
        .insert({
          email: email.toLowerCase().trim()
        })
        .select()
        .single();

      if (identityError) {
        // If it's a unique constraint error, that's expected (email already exists)
        if (identityError.code === '23505') {
          console.log('Email already exists in identity table:', email);
        } else {
          console.error('Failed to insert into identity table:', identityError);
        }
      } else {
        console.log('Successfully added new identity:', identityData.id);
      }

      // Store for session continuity
      sessionStorage.setItem('demo_email', email);
      sessionStorage.setItem('demo_source', window.location.pathname);
      if (formResponseId) {
        sessionStorage.setItem('form_response_id', formResponseId);
      }
      
      onSubmit?.(email);
      
      // Track PostHog event for partial submission
      trackButtonClick('Demo Form Submit', 'demo_request_form', { 
        email_domain: email.split('@')[1], 
        destination: 'request-demo',
        has_form_response: !!formResponseId,
        submission_type: 'email_partial'
      });

      // Also send a specific PostHog event for partial demo request
      if (ph && formResponseId) {
        ph.capture('demo_request_partial', {
          email_domain: email.split('@')[1],
          source: 'email_form_partial',
          form_response_id: formResponseId,
          current_url: window.location.href,
          referrer: document.referrer || null
        });
      }
      
      // Navigate with both email and form_response_id parameters
      const params = new URLSearchParams({
        email: email,
        ...(formResponseId && { form_response_id: formResponseId })
      });
      navigate(`/request-demo?${params.toString()}`);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeClasses = getThemeClasses(effectiveTheme === 'light');
  
  const inputStyles = `
    w-full
    bg-white
    border border-gray-300
    !text-gray-900 text-md font-light
    placeholder:text-gray-500
    px-4 py-4 pr-24
    focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
    backdrop-blur-md
    transition-colors
    ${error ? 'border-red-400 focus:ring-red-400/30' : ''}
  `;

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            required
            disabled={isSubmitting}
            className={inputStyles.replace(/\s+/g, ' ').trim()}
          />
          <div className="absolute right-2 top-4 bottom-4 flex items-center">
            <Button 
              type="submit"
              variant="primary"
              size="sm"
              loading={isSubmitting}
              disabled={isSubmitting}
              theme={effectiveTheme}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        
        {/* Error message with reserved space */}
        <div className="h-6">
          {error && (
            <p className={`text-sm font-light transition-opacity duration-200 ${
              effectiveTheme === 'dark' ? 'text-red-400' : 'text-red-500'
            }`}>
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}