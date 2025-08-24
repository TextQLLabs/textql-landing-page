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

  // Common personal email domains to block
  const PERSONAL_EMAIL_DOMAINS = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'mail.com',
    'zoho.com',
    'yandex.com',
    'gmx.com',
    'live.com',
    'me.com',
    'inbox.com'
  ];

  const isWorkEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    
    if (PERSONAL_EMAIL_DOMAINS.includes(domain)) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (!isWorkEmail(email)) {
      setError('Please enter a valid work email address');
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

      // Generate unique demo request ID
      const clientDemoRequestId = (window.crypto as any)?.randomUUID?.();
      if (!clientDemoRequestId) {
        throw new Error('Secure UUID generation unavailable');
      }

      // Capture full PostHog session data for analytics (same as RequestDemo.tsx)
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

      // Create partial demo request entry
      const { error: demoError } = await supabase
        .from('demo_requests')
        .insert({
          demo_request_id: clientDemoRequestId,
          posthog_distinct_id: distinctId,
          email: email.toLowerCase().trim(),
          first_name: 'PARTIAL_ENTRY', // Placeholder to satisfy NOT NULL constraint
          source: 'email_form_partial'
        });

      if (demoError) {
        console.error('Failed to create partial demo request:', demoError);
        // Continue with navigation even if DB insert fails
      }

      // Create analytics entry for partial submission (same structure as full form)
      if (!demoError && posthogData) {
        const { error: analyticsError } = await supabase
          .from('demo_request_analytics')
          .insert({
            demo_request_id: clientDemoRequestId,
            posthog_distinct_id: posthogData.distinct_id,
            posthog_session_id: posthogData.session_id,
            page_view_id: posthogData.page_view_id,
            session_replay_url: posthogData.session_replay_url,
            feature_flags: posthogData.feature_flags,
            current_url: posthogData.current_url,
            referrer: posthogData.referrer,
            user_agent: posthogData.user_agent,
            full_session_data: posthogData
          });

        if (analyticsError) {
          console.error('Failed to create partial demo analytics:', analyticsError);
        }
      }

      // Store for session continuity
      sessionStorage.setItem('demo_email', email);
      sessionStorage.setItem('demo_source', window.location.pathname);
      if (!demoError) {
        sessionStorage.setItem('demo_request_id', clientDemoRequestId);
      }
      
      onSubmit?.(email);
      
      // Track PostHog event for partial submission
      trackButtonClick('Demo Form Submit', 'demo_request_form', { 
        email_domain: email.split('@')[1], 
        destination: 'request-demo',
        has_partial_entry: !demoError,
        submission_type: 'email_partial'
      });

      // Also send a specific PostHog event for partial demo request
      if (ph && !demoError) {
        ph.capture('demo_request_partial', {
          email_domain: email.split('@')[1],
          source: 'email_form_partial',
          demo_request_id: clientDemoRequestId,
          current_url: window.location.href,
          referrer: document.referrer || null
        });
      }
      
      // Navigate with both email and demo_id parameters
      const params = new URLSearchParams({
        email: email,
        ...((!demoError && clientDemoRequestId) && { demo_id: clientDemoRequestId })
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