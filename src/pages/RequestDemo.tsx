import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Text, Heading, Button, Input, Select, Carousel } from "../components/ui";
import { Modal } from "../components/ui/Modal";
import { Section } from "../components/ui/Section";
import { WaveBackground } from "../components/animations";
import { useComponentTheme } from "../hooks/useComponentTheme";
import { trackEvent, trackButtonClick } from "../utils/analytics";
import { supabase } from "../lib/supabase";
import { Check } from "lucide-react";

export default function RequestDemo() {
  const theme = useComponentTheme();
  const [searchParams] = useSearchParams();
  
  // Get email and form_response_id from URL params if provided
  const emailFromUrl = searchParams.get('email') || '';
  const formResponseIdFromUrl = searchParams.get('form_response_id') || '';
  
  // Fallback: try to get form_response_id from sessionStorage if not in URL
  const [formResponseIdFromSession] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('form_response_id') || '';
    }
    return '';
  });
  
  const effectiveFormResponseId = formResponseIdFromUrl || formResponseIdFromSession;
  
  const [formData, setFormData] = useState({
    email: emailFromUrl,
    firstName: '',
    phoneNumber: '',
    howDidYouHear: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [finalFormResponseId, setFinalFormResponseId] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCalendlyModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCalendlyModal]);

  // Listen for Calendly events (webhook will handle actual data in production)
  useEffect(() => {
    const handleCalendlyEvent = async (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        try {
          const ph: any = (typeof window !== 'undefined' && (window as any).posthog) ? (window as any).posthog : null;
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

          let triggerType = 'calendly_unknown';
          switch (e.data.event) {
            case 'calendly.event_scheduled':
              triggerType = 'calendly_meeting_scheduled';
              break;
            case 'calendly.profile_page_viewed':
              triggerType = 'calendly_profile_viewed';
              break;
            case 'calendly.event_type_viewed':
              triggerType = 'calendly_event_type_viewed';
              break;
            case 'calendly.date_and_time_selected':
              triggerType = 'calendly_time_selected';
              break;
            default:
              triggerType = 'calendly_' + e.data.event.replace('calendly.', '');
          }

          // Create posthog_snapshot entry for Calendly event
          const { error: snapshotError } = await supabase
            .from('posthog_snapshot')
            .insert({
              trigger: triggerType,
              posthog_distinct_id: posthogData?.distinct_id || 'unknown',
              posthog_session_id: posthogData?.session_id || null,
              page_view_id: posthogData?.page_view_id || null,
              session_replay_url: posthogData?.session_replay_url || null,
              feature_flags: posthogData?.feature_flags || null,
              current_url: window.location.href,
              referrer: document.referrer || null,
              user_agent: navigator.userAgent || null,
              full_session_data: {
                ...posthogData,
                calendly_event: e.data,
                form_response_id: finalFormResponseId || effectiveFormResponseId,
                calendly_payload: e.data.payload || null
              }
            });

          if (snapshotError) {
            console.error('Failed to log Calendly event:', snapshotError);
          }

          // Also send to PostHog for immediate tracking
          if (ph) {
            ph.capture(triggerType, {
              calendly_event_type: e.data.event,
              form_response_id: finalFormResponseId || effectiveFormResponseId,
              calendly_payload: e.data.payload || null,
              current_url: window.location.href
            });
          }
        } catch (error) {
          console.error('Error handling Calendly event:', error);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [finalFormResponseId, effectiveFormResponseId]);
  
  // Track page visit
  useEffect(() => {
    trackEvent('page_viewed', {
      page: 'request_demo',
      source: emailFromUrl ? 'demo_form_redirect' : 'direct_navigation',
      prefilled_email: !!emailFromUrl,
      has_form_response_id: !!effectiveFormResponseId,
      flow_type: effectiveFormResponseId ? 'partial_completion' : 'direct_entry'
    });
  }, [emailFromUrl, formResponseIdFromUrl]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      // Basic validation
      if (!formData.email || !formData.firstName) {
        throw new Error('Email and first name are required');
      }
      
      // Capture full PostHog session data for analytics
      const ph: any = (typeof window !== 'undefined' && (window as any).posthog) ? (window as any).posthog : null;
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
      
      const distinctId = posthogData?.distinct_id;
      if (!distinctId) {
        throw new Error('Missing PostHog distinct id');
      }

      // Create posthog_snapshot entry for form submission
      const { data: snapshotData, error: snapshotError } = await supabase
        .from('posthog_snapshot')
        .insert({
          trigger: 'form_submission_complete',
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
        throw new Error(`PostHog snapshot failed: ${snapshotError.message}`);
      }

      let finalFormResponseId = effectiveFormResponseId;
      
      // UPDATE existing form_response if we have an ID, otherwise CREATE new one
      if (effectiveFormResponseId) {
        const { error: updateError } = await supabase
          .from('form_response')
          .update({
            email: formData.email.toLowerCase().trim(),
            first_name: formData.firstName.trim(),
            phone_number: formData.phoneNumber?.trim() || null,
            how_did_you_hear: formData.howDidYouHear || null,
            updated_at: new Date().toISOString(),
            posthog_snapshot_id: snapshotData.id // Link to the completion snapshot
          })
          .eq('id', effectiveFormResponseId);
        
        if (updateError) {
          throw new Error(`Form response update failed: ${updateError.message}`);
        }
        
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('form_response_id');
        }
      } else {
        // Create new form response for users who came directly to this page
        const { data: newFormData, error: insertError } = await supabase
          .from('form_response')
          .insert({
            email: formData.email.toLowerCase().trim(),
            first_name: formData.firstName.trim(),
            phone_number: formData.phoneNumber?.trim() || null,
            how_did_you_hear: formData.howDidYouHear || null,
            posthog_snapshot_id: snapshotData.id
          })
          .select()
          .single();
        
        if (insertError) {
          throw new Error(`Form response creation failed: ${insertError.message}`);
        }
        
        finalFormResponseId = newFormData.id;
      }
      
      // Analytics entry is already created via the posthog_snapshot above
      
      // Track successful submission
      trackButtonClick('Request Demo', 'demo_form', {
        page: 'request_demo',
        button_type: 'form_submit',
        form_source: effectiveFormResponseId ? 'email_form_completion' : (emailFromUrl ? 'home_page_redirect' : 'direct_request_demo'),
        how_did_you_hear: formData.howDidYouHear || 'not_specified',
        flow_type: effectiveFormResponseId ? 'partial_completion' : 'direct_submission',
        is_update: !!effectiveFormResponseId
      });

      // Send specific PostHog event for full demo request (matches partial event)
      if (ph) {
        ph.capture('demo_request_completed', {
          email_domain: formData.email.split('@')[1],
          source: effectiveFormResponseId ? 'email_form_completed' : (emailFromUrl ? 'home_page_redirect' : 'direct_request_demo'),
          form_response_id: finalFormResponseId,
          how_did_you_hear: formData.howDidYouHear || 'not_specified',
          is_partial_completion: !!effectiveFormResponseId,
          current_url: window.location.href,
          referrer: document.referrer || null
        });
      }
      
      setIsSuccess(true);
      setFinalFormResponseId(finalFormResponseId);
      
      // Show Calendly modal after brief delay
      setTimeout(() => {
        setShowCalendlyModal(true);
      }, 500);
      
      // Hide success component after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Request Demo | TextQL"
        description="Request a personalized demo of TextQL. See how our AI-powered analytics platform can transform your data into actionable insights."
        canonical="https://textql.com/request-demo"
        ogImage="https://textql.com/social-preview.png"
      />

      <Section
        variant="content"
        padding="lg"
        background="primary"
        overflow="hidden"
        className="relative min-h-[calc(100vh-8rem)]"
      >
        {/* Wave Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <WaveBackground theme={theme} scale={1} coverage={1.6}   />
        </div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-6 lg:gap-12 items-start">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1 mb-6 lg:mb-0 space-y-6 lg:space-y-8 bg-white p-4 sm:p-6 lg:p-8 border border-[#2A3B35]/20 animate-slide-up animation-delay-100">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <Text color="secondary" theme={theme} className="text-sm font-medium uppercase tracking-wide mb-4 animate-slide-up animation-delay-200">
                    CONTACT SALES
                  </Text>
                  <Heading level={1} theme={theme} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight mb-4 lg:mb-6 animate-slide-up animation-delay-200">
                    See how TextQL can help
                  </Heading>
                  <Text color="muted" theme={theme} className="text-base sm:text-lg font-light leading-relaxed max-w-md animate-slide-up animation-delay-300">
                  and why hundreds of data teams have stopped writing SQL
                  </Text>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4 animate-slide-up animation-delay-400">
                <div className="flex items-start gap-3">
                  <div className={`p-1 mt-1 ${theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]'} flex-shrink-0`}>
                    <Check className={`w-4 h-4 ${theme === 'light' ? 'text-white' : 'text-[#0F1712]'}`} />
                  </div>
                  <Text theme={theme} className="text-base font-medium">
                    Demo of the TextQL platform
                  </Text>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-1 mt-1 ${theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]'} flex-shrink-0`}>
                    <Check className={`w-4 h-4 ${theme === 'light' ? 'text-white' : 'text-[#0F1712]'}`} />
                  </div>
                  <Text theme={theme} className="text-base font-medium">
                    Connect your live data in less than 10 minutes
                  </Text>
                </div>
              </div>

              {/* Testimonial */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 animate-slide-up animation-delay-500">
                <div className={`hidden sm:block w-24 h-24 md:w-36 md:h-36 overflow-hidden border flex-shrink-0 ${
                  theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#B8D8D0]/20'
                }`}>
                  <img
                    src="/images/testimonial_logos/tackle_person.png"
                    alt="Dillon Woods"
                    className="w-full h-full object-cover scale-100"
                  />
                </div>
                <div className="space-y-3 text-center sm:text-left">
                  <Text color="primary" theme={theme} className="text-lg sm:text-xl md:text-xl font-light italic leading-relaxed">
                    "TextQL is a lifesaver. It created these graphs and pulled stats instantly from our Snowflake warehouse right before an All Hands meeting."
                  </Text>
                  <div>
                    <Text theme={theme} className="text-sm font-medium">
                      Dillon Woods
                    </Text>
                    <Text color="muted" theme={theme} className="text-sm">
                      CTO of company with 10,000+ tables
                    </Text>
                  </div>
                </div>
              </div>
            </div>

          {/* Right Form */}
          <div className="order-1 lg:order-2 w-full animate-slide-up animation-delay-400">
            <div className={`border p-4 sm:p-6 lg:p-8 ${
              theme === 'light' ? 'border-[#2A3B35]/20 bg-white' : 'border-[#B8D8D0]/20 bg-[#000000]'
            }`}>
              <Heading level={2} theme={theme} className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 lg:mb-6">
                Request a Demo
              </Heading>
              
              <form onSubmit={handleSubmit} className="space-y-0">
                <Input
                   label="Work Email*"
                   type="email"
                   placeholder="john.doe@company.com"
                   value={formData.email}
                   onChange={(e) => handleInputChange('email', e.target.value)}
                   required
                   theme={theme}
                   fullWidth
                   className="[&>div:last-child]:hidden [&>input]:py-2.5"
                 />
                 
                 <Input
                   label="First name*"
                   placeholder="John"
                   value={formData.firstName}
                   onChange={(e) => handleInputChange('firstName', e.target.value)}
                   required
                   theme={theme}
                   fullWidth
                   className="[&>div:last-child]:hidden [&>input]:py-2.5"
                 />
                 
                 <Input
                   label="Phone number"
                   type="tel"
                   placeholder="+1 (555) 123-4567"
                   value={formData.phoneNumber}
                   onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                   theme={theme}
                   fullWidth
                   className="[&>div:last-child]:hidden [&>input]:py-2.5"
                 />
                 
                 <Select
                   label="How did you hear about us? (optional)"
                   value={formData.howDidYouHear}
                   onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                   theme={theme}
                   fullWidth
                   options={[
                     { value: '', label: 'Select an option...' },
                     { value: 'google_search', label: 'Google Search' },
                     { value: 'social_media', label: 'Social Media' },
                     { value: 'referral', label: 'Referral from colleague' },
                     { value: 'conference', label: 'Conference/Event' },
                     { value: 'blog_article', label: 'Blog/Article' },
                     { value: 'linkedin', label: 'LinkedIn' },
                     { value: 'twitter', label: 'Twitter/X' },
                     { value: 'youtube', label: 'YouTube' },
                     { value: 'podcast', label: 'Podcast' },
                     { value: 'other', label: 'Other' }
                   ]}
                 />
                 
                 {/* Error Message */}
                 {submitError && (
                   <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
                     {submitError}
                   </div>
                 )}
                 
                 {/* Submit Button */}
                 <div className="pt-8">
                  <Button
                    variant="primary"
                    theme={theme}
                    size="md"
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                  </Button>
                </div>
              </form>
              
              {/* Success State */}
              {isSuccess && (
                <div className="absolute inset-0 bg-white flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto flex items-center justify-center ${theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]'}`}>
                      <Check className={`w-8 h-8 ${theme === 'light' ? 'text-white' : 'text-[#0F1712]'}`} />
                    </div>
                    <Heading level={3} theme={theme} className="text-xl font-medium">
                      Thank you for your request!
                    </Heading>
    
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </Section>

      {/* Logo Carousel Section - matches Trial styling */}
      <div className="w-full pb-8 pt-4">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-medium text-[#2A3B35] mb-6">
            Ana finds insights in your existing data stack
          </p>
          <div className="logo-carousel">
            <Carousel
              items={[
                { src: '/images/logos/reshift-nobg.png', alt: 'Redshift' },
                { src: '/images/logos/snowflake-white.png', alt: 'Snowflake' },
                { src: '/images/logos/databricks-nobg.png', alt: 'Databricks' },
                { src: '/images/logos/looker-white.png', alt: 'Looker' },
                { src: '/images/logos/powerbi-white.png', alt: 'Power BI' },
                { src: '/images/logos/Tableau White.png', alt: 'Tableau' },
                { src: '/images/logos/dbt-nobg.png', alt: 'dbt' },
                { src: '/images/logos/azure-white.png', alt: 'Azure' },
                { src: '/images/logos/aws-white.png', alt: 'AWS' },
                { src: '/images/logos/salesforce-white.png', alt: 'Salesforce' },
                { src: '/images/logos/gcp-white.png', alt: 'Google Cloud' },
                { src: '/images/logos/teams-white.png', alt: 'Teams' },
                { src: '/images/logos/slack-white.png', alt: 'Slack' },
                { src: '/images/logos/alation-white.png', alt: 'Alation' },
                { src: '/images/logos/sap-white.png', alt: 'SAP' },
                { src: '/images/logos/oracle.png', alt: 'Oracle' }
              ]}
              gradientColor={'#F7F7F7'}
              theme={'light'}
            />
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <div className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${showCalendlyModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 backdrop-blur-sm z-[9998] bg-black/50 transition-opacity duration-300" onClick={() => setShowCalendlyModal(false)} />
        <div className={`fixed inset-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:max-w-6xl h-full lg:h-[90vh] z-[9999] shadow-xl overflow-hidden transition-all duration-300 ${
          showCalendlyModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${theme === 'light' ? 'bg-white lg:border border-[#2A3B35]/20' : 'bg-[#0A1F1C] lg:border border-[#B8D8D0]/20'}`}>
          <div className={`flex items-center justify-between p-4 ${
            theme === 'light' ? 'border-b border-[#2A3B35]/20 bg-white' : 'border-b border-[#B8D8D0]/20 bg-[#0A1F1C]'
          }`}>
            <Heading level={3} theme={theme} className="text-lg sm:text-xl lg:text-3xl font-extralight">
              Schedule Your Demo
            </Heading>
            <button 
              onClick={() => setShowCalendlyModal(false)}
              className={`p-2 transition-colors ${
                theme === 'light' 
                  ? 'text-[#2A3B35] hover:text-[#2A3B35]/80' 
                  : 'text-[#B8D8D0] hover:text-[#B8D8D0]/80'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-[calc(100%-73px)] overflow-hidden">
            <iframe
              src={`https://calendly.com/ethanding/25min?${
                new URLSearchParams({
                  ...(formData.email && { prefill_email: formData.email }),
                  ...(formData.firstName && { prefill_name: formData.firstName }),
                  ...(finalFormResponseId || effectiveFormResponseId) && { 
                    custom_a1: finalFormResponseId || effectiveFormResponseId // Pass form_response_id as custom field
                  },
                  utm_source: 'textql_demo_form',
                  utm_medium: 'modal',
                  utm_campaign: effectiveFormResponseId ? 'partial_completion' : 'direct_booking'
                }).toString()
              }`}
              width="100%"
              height="100%"
              style={{ border: 'none', overflow: 'hidden' }}
              title="Schedule Demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}