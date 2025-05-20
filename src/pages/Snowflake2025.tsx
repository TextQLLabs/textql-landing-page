import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, Text } from '../components/ui';
import { WaveBackground } from '../components/animations';
import { SEO } from '../components/SEO';
import { DEMO_CONFIG } from '../utils/constants';

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
                "text": `*BI Tools:* ${formData.biTools}`
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
      
      await fetch(DEMO_CONFIG.WEBHOOK_URLS.SLACK.SNOWFLAKE2025, {
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
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Snowflake Logo */}
              <img 
                src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/6fa00556-c185-4755-80ee-515744313500/public" 
                alt="Snowflake Logo" 
                className="h-12 mb-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              
              {/* Stronger gradient effect */}
              <h1 className="text-4xl font-extralight mb-6 bg-gradient-to-r from-[#B8D8D0] pr-5 via-[#B8D8D0] via-[#729E8C] to-[#729E8C] bg-clip-text text-transparent">
              Book your team a Deep Research Agent Workshop with our leadership team

              </h1>
              <div className="max-w-xl text-[#B8D8D0]">
                <div className="flex items-center gap-4">
                  <div className="w-[2px] h-8 bg-[#B8D8D0]/40" />
                  <Text className="text-normal">
                  Our executive team will be curating workshops, where you'll watch Deep Research Agents complete an 8-week management consulting project for your company on a synthetic Snowflake environment via our Snowflake-MCP integration.
                </Text>
                </div>
              </div>
              
              {/* Video section */}
              <div className="mt-8 mb-6 w-full max-w-xl">
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
              </div>
            </div>

            {/* Right Content - Registration Form */}
            <div className="lg:w-4/5 mx-auto bg-black/20 backdrop-blur-sm rounded-lg p-6 shadow-lg pt-2 mt-10 border border-[#729E8C]/30">
              <Text variant="header" className="text-lg mt-2 mb-5 text-[#B8D8D0]">
                Request a meeting
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
                  What was the latest project you hired management consultants for? <span className="text-[#729E8C]">Optional</span>
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
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Snowflake2025() {
  return (
    <main className="relative overflow-x-hidden">
      <SEO
        title="Snowflake 2025 | TextQL"
        description="Meet with TextQL founders during Snowflake Summit 2025"
        canonical="https://textql.com/snowflake-2025"
        ogImage="https://textql.com/social-preview.png"
      />
      <RegistrationForm />
      
      {/* Trusted By Section */}
      <section className="relative z-10 py-6 -mt-6 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-light text-center text-[#B8D8D0] mb-4">Trusted By</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/cbbd6ebc-6b1c-41a9-d110-d58f67ba2b00/public", 
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/f4df4936-1342-4279-d93e-e3e3c9a06400/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/e20d2de7-8cf8-4e7e-cb1e-d9fdba6f4400/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/bad7b0ef-446c-4084-a17f-2b640cbf9200/public",
              "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/c4a10e31-df8b-427d-a511-aac64eb71200/public"
            ].map((src, index) => (
              <div key={`logo-${index}`} className="w-28 h-16 flex items-center justify-center">
                <img 
                  src={src}
                  alt={`Trusted Partner ${index + 1}`}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Venue Section */}
      <section className="relative z-10 py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-left text-[#B8D8D0] mb-4">Venue address</h2>
          <p className="text-xl text-[#B8D8D0] mb-8">Palace Hotel, a Luxury Collection Hotel, San Francisco<br />
          2 New Montgomery St, San Francisco, CA 94105
          </p>
          
          <div className="w-full overflow-hidden rounded-lg">
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
        </div>
      </section>
    </main>
  );
} 