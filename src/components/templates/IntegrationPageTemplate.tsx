import React from 'react';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';

interface IntegrationPageProps {
  /**
   * Name of the integration (e.g., "Tableau MCP", "ADP Workforce Now")
   */
  name: string;
  
  /**
   * Main headline for the integration page
   */
  headline: string;
  
  /**
   * Subheadline or description text below the main headline
   */
  description: string;
  
  /**
   * FAQ items with questions and answers
   */
  faqItems: {
    question: string;
    answer: React.ReactNode;
  }[];
  
  /**
   * Custom content for the visual section (replaces default placeholder)
   */
  visualContent?: React.ReactNode;
  
  /**
   * Optional additional content to display between description and FAQ
   */
  additionalContent?: React.ReactNode;
  
  /**
   * Optional CTA props to customize the call-to-action
   */
  ctaProps?: {
    heading?: string;
    subheader?: string;
    buttonText?: string;
  };
}

/**
 * Reusable template for integration pages
 */
const IntegrationPageTemplate: React.FC<IntegrationPageProps> = ({
  name,
  headline,
  description,
  faqItems,
  visualContent,
  additionalContent,
  ctaProps
}) => {
  // Create SEO-friendly slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title={`${name} Integration | TextQL`}
        description={`Integrate ${name} with TextQL. ${description.substring(0, 100)}...`}
        canonical={`https://textql.com/integrations/${slug}/`}
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section - Centered */}
      <section className="mt-10 pt-24 pb-16">
        <div className="mx-auto max-w-site px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-[#B8D8D0] mb-6">{headline}</h1>
          <p className="text-[#729E8C] font-light text-lg max-w-3xl mx-auto mb-12">{description}</p>
          <button className="bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 px-6 rounded-md transition-colors duration-200">
            Get a demo
          </button>
        </div>
      </section>
      
      {/* Visual Section */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          {visualContent ? (
            visualContent
          ) : (
            <div className="bg-[#0A1F1C]/30 rounded-lg p-8 h-64 flex items-center justify-center">
              {/* 
                INTEGRATION VISUAL PLACEHOLDER
                Replace this comment with the integration-specific visual component
                This could be an illustration, diagram, screenshot, or other visual representation
                of how the integration works
              */}
              <p className="text-[#729E8C] font-light italic">Integration visual placeholder</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Additional Content Section - Optional */}
      {additionalContent && (
        <section className="py-16">
          <div className="mx-auto max-w-site px-6">
            {additionalContent}
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#0A1F1C]/30">
        <div className="mx-auto max-w-site px-6">
          <h2 className="text-3xl font-extralight text-[#B8D8D0] mb-12">FAQ on integrating with {name}</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details 
                key={index} 
                className="border border-[#0A1F1C] rounded-lg overflow-hidden group"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer text-xl font-light text-[#B8D8D0]">
                  {item.question}
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L18 9L16.6 7.6L12 12.2L7.4 7.6L6 9L12 15Z" fill="#B8D8D0"/>
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-[#729E8C] font-light border-t border-[#0A1F1C]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading={ctaProps?.heading || `Ready to integrate ${name} with TextQL?`}
        subheader={ctaProps?.subheader || "Get started with our seamless integration today"}
        useSimpleButton={true}
        buttonText={ctaProps?.buttonText || "Get Started"}
      />
    </div>
  );
};

export default IntegrationPageTemplate;