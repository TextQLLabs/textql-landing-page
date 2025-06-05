import { useState, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button, Text } from '../components/ui';
import { WaveBackground } from '../components/animations';
import { SEO } from '../components/SEO';
import { DEMO_CONFIG } from '../utils/constants';
import DatabricksImageAndDropdownsInfo from '../components/sections/DatabricksImageAndDropdownsInfo';

declare global {
  interface Window {
    tf?: any;
  }
}

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    biTools: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Track page visits
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        const visitData = {
          timestamp: new Date().toISOString(),
          page: 'Databricks 2025 Landing Page',
          url: window.location.href,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct visit',
          sessionId: Math.random().toString(36).substring(7)
        };

        const messageText = `🏂 NEW PAGE VISIT: Databricks 2025 Landing Page`;
        
        const payload = {
          "text": messageText,
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": messageText
              }
            },
            {
              "type": "section",
              "fields": [
                {
                  "type": "mrkdwn",
                  "text": `*Page:* ${visitData.page}`
                },
                {
                  "type": "mrkdwn",
                  "text": `*URL:* ${visitData.url}`
                },
                {
                  "type": "mrkdwn",
                  "text": `*Timestamp:* ${new Date(visitData.timestamp).toLocaleString()}`
                },
                {
                  "type": "mrkdwn",
                  "text": `*Referrer:* ${visitData.referrer}`
                },
                {
                  "type": "mrkdwn",
                  "text": `*Session ID:* ${visitData.sessionId}`
                }
              ]
            }
          ],
          "page-visit": true,
          "page-name": "snowflake-2025",
          "timestamp": visitData.timestamp,
          "url": visitData.url,
          "referrer": visitData.referrer,
          "user-agent": visitData.userAgent
        };

        // await fetch(DEMO_CONFIG.WEBHOOK_URLS.SLACK.PAGE_VISITS, {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(payload)
        // });
      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    trackPageVisit();
  }, []); // Empty dependency array means this runs once when component mounts

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Format the message text
      const messageText = `${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()} OF ${formData.company.toUpperCase()} WITH EMAIL ${formData.email} HAS REQUESTED A MEETING WITH TEXTQL`;
      
      // Send to Slack webhook
      const payload = {
        "text": messageText,
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": messageText
            }
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": `*Name:* ${formData.firstName} ${formData.lastName}`
              },
              {
                "type": "mrkdwn",
                "text": `*Company:* ${formData.company}`
              },
              {
                "type": "mrkdwn",
                "text": `*Email:* ${formData.email}`
              },
              {
                "type": "mrkdwn",
                "text": `*Business Intelligence:* ${formData.biTools}`
              },
              {
                "type": "mrkdwn",
                "text": `*Phone:* ${formData.phone || 'Not provided'}`
              },
              {
                "type": "mrkdwn",
                "text": `*URL:* ${window.location.href}`
              }
            ]
          }
        ],
        "page-name": window.location.pathname,
        "first-name": formData.firstName,
        "last-name": formData.lastName,
        "email": formData.email,
        "company": formData.company,
        "bi-tools": formData.biTools,
        "phone": formData.phone,
        "url": window.location.href
      };
      
      await fetch(DEMO_CONFIG.WEBHOOK_URLS.SLACK.DATABRICKS2025, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        biTools: '',
        phone: ''
      });
      
      setSubmitMessage({
        type: 'success',
        text: 'Registration successful! We will be in touch soon.'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="hidden md:block absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center pr-4 pl-4">
        <div className="mx-auto max-w-7xl pr-4 pl-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] lg:gap-36 items-center pb-36">
            {/* Left Content */}
            <div className="flex flex-col justify-center min-h-screen lg:min-h-0 pb-40 md:pb-28 lg:pb-0">
              <div className="flex items-left">
                <img 
                src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/1ef677cf-ebd7-4117-53e1-e31c9aaea000/public" 
                alt="Databrick Summit Logo" 
                className="h-28"
style={{ filter: 'brightness(0) saturate(100%) invert(91%) sepia(8%) saturate(654%) hue-rotate(114deg) brightness(93%) contrast(92%)' }}
              />
              </div>
              <h1 className="text-xl lg:text-2xl font-extralight leading-tight text-[#B8D8D0] mb-6">
              Deep Research Agents that Actually Connect to Your Databricks Data
              </h1>
              <p className="text-base lg:text-m text-[#729E8C] font-light mb-4 max-w-2xl">
              You've got millions of rows in Databricks and you've tried AI research tools. But you're still waiting weeks for insights that should take hours. The problem isn't AI capability—it's that most tools can't actually work with <i>your</i> data architecture.
              </p>
              <p className="text-base lg:text-m text-[#729E8C] font-light mb-6 max-w-2xl">
              This isn't another AI demo. We'll analyze your Databricks instance live and tell you within 10 minutes if our approach won't work for your setup. Most vendors won't do that.              </p>
              <div className="flex items-center text-sm text-[#729E8C] font-light">
                <MapPin className="h-6 md:h-4 w-6 md:w-4 mr-4 md:mr-2 text-[#b4ded3]" />
                <span>Palace Hotel, 2 New Montgomery St, San Francisco, CA 94105</span>
              </div>
              
              {/* Video section */}
              <div className="mt-2 mb-6 w-full max-w-xl">
                <video 
                  className="w-full rounded-lg shadow-lg pointer-events-none" 
                  autoPlay
                  muted
                  loop
                  disablePictureInPicture
                  playsInline
                >
                  <source src="/videos/snowflake-meeting.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-xs text-[#729E8C] mt-2 italic text-left">
                  Watch an agent identify opportunities to improve insurance Salesforce performance using our Tableau MCP
                </p>
              </div>
            </div>

            {/* Right Content - Registration Form */}
            <div className="flex items-center">
              <div className="mx-auto bg-black/20 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#729E8C]/30 w-full max-w-md lg:max-w-none">
                <Text variant="header" className="text-lg mt-2 mb-5 text-[#B8D8D0]">
                  RSVP to a session
                </Text>
                
                {submitMessage && (
                  <div className={`p-3 mb-5 rounded-md ${submitMessage.type === 'success' ? 'bg-[#729E8C]/20 text-[#B8D8D0]' : 'bg-red-500/20 text-red-200'}`}>
                    {submitMessage.text}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[#B8D8D0] text-xs mb-1.5">
                      First name<span className="text-[#729E8C]">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-[#B8D8D0] text-xs mb-1.5">
                      Last name<span className="text-[#729E8C]">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#B8D8D0] text-xs mb-1.5">
                      Business Email<span className="text-[#729E8C]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-[#B8D8D0] text-xs mb-1.5">
                      Company name<span className="text-[#729E8C]">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-[#B8D8D0] text-xs mb-1.5">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="biTools" className="block text-[#B8D8D0] text-xs mb-1.5">
                    Tell us about your priorities <span className="text-[#729E8C]">(Optional)</span>
                    </label>
                    <textarea
                      id="biTools"
                      name="biTools"
                      value={formData.biTools}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-black/30 border border-[#729E8C]/30 rounded-md p-2.5 text-[#B8D8D0] text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D8D0]"
                    />
                  </div>
                              
                  <Button 
                    type="submit"
                    variant="primary" 
                    size="md"
                    disabled={isSubmitting}
                    className="group w-full relative overflow-hidden mt-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] opacity-20" />
                    <span className="relative flex items-center justify-center">
                      {isSubmitting ? 'Submitting...' : 'Register'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-[#b4ded3]" />}
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Databricks2025() {
  return (
    <main className="relative overflow-x-hidden">
      <SEO
        title="Databricks Summit 2025 | TextQL"
        description="Meet with TextQL founders during Databricks' Data + AI Summit 2025"
        canonical="https://textql.com/databricks-2025"
        ogImage="https://textql.com/social-preview.png"
      />
      <RegistrationForm />
      
      {/* Trusted By Section */}
      <section className="relative z-10 py-6 bg-black md:pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-light text-center text-[#B8D8D0] mb-4">Trusted By</h2>
          <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-8 px-8 md:px-16">
            {[
              // "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/e63c02b7-3729-49c0-d8db-0329e6579b00/public", 
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/73e2845d-8b6a-429d-7c90-6b79b8cf8800/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/0af61563-d6d9-49ff-b086-cc703757d600/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/3c5f678e-8426-478c-92bb-211aca6c4100/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/7ebcf0cd-717b-4b7b-c5d4-6563ec395600/public"
            //   "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/c4a10e31-df8b-427d-a511-aac64eb71200/public"
            ].map((src, index) => (
              <div key={`logo-${index}`} className="flex-1 flex items-center justify-center min-w-[140px]">
                <img 
                  src={src}
                  alt={`Trusted Partner ${index + 1}`}
                  className="h-12 w-auto object-contain"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(91%) sepia(8%) saturate(654%) hue-rotate(114deg) brightness(93%) contrast(92%)' 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Executive Deep Dive Sessions Section */}
      <DatabricksImageAndDropdownsInfo />

      
      {/* Venue Section */}
      <section className="relative z-10 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#B8D8D0] mb-2">Location</h2>
          <div className="flex items-center justify-center mb-8">
            <svg className="w-6 h-6 mr-2 text-[#b4ded3]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-m md:text-xl mt-4 md:mt-0 text-[#B8D8D0]">2 New Montgomery St, San Francisco, CA 94105</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-7/12 overflow-hidden rounded-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.081741983245!2d-122.40447702411595!3d37.78812407198206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580881f0c9dd7%3A0xbe09e1083f7d7fcb!2sPalace%20Hotel%2C%20a%20Luxury%20Collection%20Hotel%2C%20San%20Francisco!5e0!3m2!1sen!2sus!4v1747717508988!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location Map"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-5/12 text-[#B8D8D0] h-full">
              <div className="border border-[#729E8C]/30 rounded-lg p-6 bg-black/30 h-full flex flex-col">
                <h3 className="text-2xl font-light mb-4">From Moscone Center</h3>
                <p className="mb-4">7-minute walk (1500 ft):</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Exit to Howard St</li>
                  <li>Right on 3rd St</li>
                  <li>Left on Market St</li>
                  <li>Right on New Montgomery St</li>
                </ol>
                <div className="flex-grow"></div>
                <p className="mt-6">
                  The Palace Hotel is just steps from Moscone Center and easily accessible from all Summit venues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 