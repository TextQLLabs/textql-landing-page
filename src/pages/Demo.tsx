import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSimpleDemoRequest } from '../utils/demo-requests/simple';
import { handleEmailDemoRequest } from '../utils/demo-requests/with-email';
import { DEMO_CONFIG } from '../utils/constants';
import { SEO } from '../components/SEO';

export default function Demo() {
  const navigate = useNavigate();

  useEffect(() => {
    // Track this page visit and redirect to the demo form
    const handleRedirect = async () => {
      try {
        // Check if we have an email in session storage
        const email = sessionStorage.getItem('demo_email');
        
        if (email) {
          // Clear the email from storage
          sessionStorage.removeItem('demo_email');
          
          // Check if user came from data assessment page
          const referrer = sessionStorage.getItem('demo_source') || document.referrer;
          const isFromDataAssessment = referrer.includes('/data-assessment');
          
          // Use email-based demo request
          const result = await handleEmailDemoRequest({
            email,
            pathname: '/demo',
            requestType: isFromDataAssessment ? 'consultation' : 'demo'
          });
          window.location.href = result.formUrl;
        } else {
          // Use simple demo request
          const result = await handleSimpleDemoRequest('/demo');
          window.location.href = result.formUrl;
        }
      } catch (error) {
        console.error('Error redirecting to demo form:', error);
        // Fallback in case of error
        window.location.href = DEMO_CONFIG.FORM_URLS.SIMPLE;
      }
    };

    handleRedirect();

    // Add a small delay to ensure tracking completes
    const timeout = setTimeout(() => {
      if (window.location.pathname === '/demo') {
        window.location.href = DEMO_CONFIG.FORM_URLS.SIMPLE;
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  // Return a minimal loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A1F1C]">
      <SEO 
        title="Request Demo | TextQL AI Data Analysis Platform"
        description="Get a personalized demo of TextQL's AI-powered data analysis platform. See how our AI agents can help your enterprise discover valuable insights across all your data."
        canonical="https://textql.com/demo/"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#B8D8D0] mb-4">Redirecting to demo request form...</h1>
        <div className="w-16 h-1 bg-[#729E8C] mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
} 