import { useEffect, useState } from "react";
import { SEO } from "../components/SEO";
import { Text, Heading, Button, Input, Select } from "../components/ui";
import { Section } from "../components/ui/Section";
import { WaveBackground } from "../components/animations";
import { useComponentTheme } from "../hooks/useComponentTheme";
import { trackEvent, trackButtonClick } from "../utils/analytics";
import { Check } from "lucide-react";

export default function RequestDemo() {
  const theme = useComponentTheme();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    phoneNumber: '',
    howDidYouHear: ''
  });
  
  // Track page visit
  useEffect(() => {
    trackEvent('page_viewed', {
      page: 'request_demo',
      source: 'direct_navigation'
    });
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackButtonClick('Request Demo', 'demo_form', {
      page: 'request_demo',
      button_type: 'form_submit',
      form_source: 'request_demo_page'
    });

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // For now, redirect to the existing demo page or show success message
    window.location.href = '/demo';
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-8 lg:gap-12 items-start">
            
            {/* Left Content */}
            <div className="space-y-8 bg-white p-8 border border-[#2A3B35]/20">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <Text color="secondary" theme={theme} className="text-sm font-medium uppercase tracking-wide mb-4">
                    CONTACT SALES
                  </Text>
                  <Heading level={1} theme={theme} className="text-4xl md:text-5xl font-extralight mb-6">
                    Talk to our Sales team
                  </Heading>
                  <Text color="muted" theme={theme} className="text-lg font-light leading-relaxed max-w-lg">
                    Connect with our sales team to explore how we can support your use case.
                  </Text>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
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
              <div className="space-y-4">
                <Text color="primary" theme={theme} className="text-2xl md:text-xl font-light italic leading-relaxed max-w-md">
                  "TextQL is a lifesaver. It created these graphs and pulled stats instantly from our Snowflake warehouse right before an All Hands meeting."
                </Text>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 overflow-hidden">
                    <img 
                      src="/images/testimonial_logos/tackle_person.png"
                      alt="Dillon Woods"
                      className="w-full h-full object-cover scale-350 object-top"
                    />
                  </div>
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
          <div className="w-full">
            <div className={`border p-6 md:p-8 ${
              theme === 'light' ? 'border-[#2A3B35]/20 bg-white' : 'border-[#B8D8D0]/20 bg-[#000000]'
            }`}>
              <Heading level={2} theme={theme} className="text-xl md:text-2xl font-medium mb-6">
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
                 
                 
                 
                 {/* Submit Button */}
                 <div className="pt-8">
                  <Button
                    variant="primary"
                    theme={theme}
                    size="md"
                    fullWidth
                    type="submit"
                  >
                    Request Demo
                  </Button>
                </div>
              </form>
            </div>
          </div>
          </div>

          {/* Contact Info */}
          {/* <div className="mt-8 text-center lg:text-left">
          <Text color="muted" theme={theme} className="text-sm">
            Questions? Email us at{' '}
            <a 
              href="mailto:hello@textql.com" 
              className={`underline hover:no-underline transition-colors ${
                theme === 'light' ? 'text-[#2A3B35] hover:text-[#4A665C]' : 'text-[#B8D8D0] hover:text-[#729E8C]'
              }`}
            >
              hello@textql.com
            </a>
          </Text>
          </div> */}
        </div>
      </Section>
    </div>
  );
}