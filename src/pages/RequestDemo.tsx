import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "../components/SEO";
import { Text, Heading, Button, Input, Select } from "../components/ui";
import { Section } from "../components/ui/Section";
import { WaveBackground } from "../components/animations";
import { useComponentTheme } from "../hooks/useComponentTheme";
import { trackEvent, trackButtonClick } from "../utils/analytics";
import { supabase } from "../lib/supabase";
import { Check } from "lucide-react";

export default function RequestDemo() {
  const theme = useComponentTheme();
  const [searchParams] = useSearchParams();
  
  // Get email from URL params if provided
  const emailFromUrl = searchParams.get('email') || '';
  
  const [formData, setFormData] = useState({
    email: emailFromUrl,
    firstName: '',
    phoneNumber: '',
    howDidYouHear: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Track page visit
  useEffect(() => {
    trackEvent('page_viewed', {
      page: 'request_demo',
      source: emailFromUrl ? 'demo_form_redirect' : 'direct_navigation',
      prefilled_email: !!emailFromUrl
    });
  }, [emailFromUrl]);

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
      const clientDemoRequestId = (window.crypto as any)?.randomUUID?.();
      if (!clientDemoRequestId) {
        throw new Error('Secure UUID generation unavailable');
      }
      
      // Insert demo request (RLS-safe: no RETURNING required)
      const { error: demoError } = await supabase
        .from('demo_requests')
        .insert({
          demo_request_id: clientDemoRequestId,
          posthog_distinct_id: distinctId,
          email: formData.email.toLowerCase().trim(),
          first_name: formData.firstName.trim(),
          phone_number: formData.phoneNumber?.trim() || null,
          how_did_you_hear: formData.howDidYouHear || null,
          source: emailFromUrl ? 'home_page_redirect' : 'direct_request_demo'
        });
      
      if (demoError) {
        throw new Error(`Demo request failed: ${demoError.message}`);
      }
      
      // Insert analytics with the SAME demo_request_id
      const { error: analyticsError } = await supabase
        .from('demo_request_analytics')
        .insert({
          demo_request_id: clientDemoRequestId, // SAME demo_request_id
          posthog_distinct_id: distinctId,
          posthog_session_id: posthogData?.session_id || null,
          page_view_id: posthogData?.page_view_id || null,
          session_replay_url: posthogData?.session_replay_url || null,
          feature_flags: posthogData?.feature_flags || null,
          current_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          full_session_data: posthogData || null
        });
      
      if (analyticsError) {
        console.error('Analytics insert failed:', analyticsError);
        // Don't fail the form for analytics errors
      }
      
      // Track successful submission
      trackButtonClick('Request Demo', 'demo_form', {
        page: 'request_demo',
        button_type: 'form_submit',
        form_source: emailFromUrl ? 'home_page_redirect' : 'direct_request_demo',
        how_did_you_hear: formData.howDidYouHear || 'not_specified'
      });
      
      setIsSuccess(true);
      
      // Redirect to thank you page or show success message
      setTimeout(() => {
        window.location.href = '/demo';
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F7F7F7]' : 'bg-[#0F1712]'}`}>
      <SEO
        title="Request Demo | TextQL"
        description="Request a personalized demo of TextQL. See how our AI-powered analytics platform can transform your data into actionable insights."
        canonical="https://textql.com/request-demo"
        ogImage="https://textql.com/social-preview.png"
      />

      <Section
        variant="content"
        padding="lg"
        paddingTop="navbar"
        background="primary"
        overflow="hidden"
        className="relative"
      >
        {/* Wave Background */}
        <div className="absolute inset-0 z-0">
          <WaveBackground theme={theme} />
        </div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-6 lg:gap-12 items-start">
            
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 bg-white p-4 sm:p-6 lg:p-8 border border-[#2A3B35]/20 animate-slide-up animation-delay-100">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <Text color="secondary" theme={theme} className="text-sm font-medium uppercase tracking-wide mb-4 animate-slide-up animation-delay-200">
                    CONTACT SALES
                  </Text>
                  <Heading level={1} theme={theme} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight mb-4 lg:mb-6 animate-slide-up animation-delay-200">
                    Talk to our Sales team
                  </Heading>
                  <Text color="muted" theme={theme} className="text-base sm:text-lg font-light leading-relaxed max-w-md animate-slide-up animation-delay-300">
                    Connect with our sales team to explore how we can support your use case.
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
                    Connect your live data in 10 mins
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
          <div className="w-full mb-6 sm:mb-0 animate-slide-up animation-delay-400">
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
                    <Text color="muted" theme={theme} className="text-base">
                      We'll be in touch soon to schedule your demo.
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </Section>
    </div>
  );
}