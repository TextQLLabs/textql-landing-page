import React from 'react';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';
import { useNavigate } from 'react-router-dom';

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
   * Optional video URL to display in the hero section
   */
  videoUrl?: string;
  
  /**
   * Optional CTA props to customize the call-to-action
   */
  ctaProps?: {
    heading?: string;
    subheader?: string;
    useSimpleButton?: boolean;
    buttonText?: string;
  };

  /**
   * Optional mind map data to display a visual relationship diagram
   */
  mindMapData?: {
    nodes: Array<{
      id: string;
      label: string;
    }>;
    links: Array<{
      source: string;
      target: string;
    }>;
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
  videoUrl,
  ctaProps,
  mindMapData
}) => {
  // Create SEO-friendly slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const navigate = useNavigate();
  
  const handleDemoClick = () => {
    navigate('/demo');
  };
  
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title={`${name} Integration | TextQL`}
        description={`Integrate ${name} with TextQL. ${description.substring(0, 100)}...`}
        canonical={`https://textql.com/integrations/${slug}/`}
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section - Two Column Layout */}
      <section className="mt-20 pt-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Hero Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-extralight text-[#B8D8D0] mb-6">{headline}</h1>
              <p className="text-[#729E8C] font-light text-lg mb-6">{description}</p>
              <button 
                className="bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 mt-2 px-6 rounded-md transition-colors duration-200"
                onClick={handleDemoClick}
              >
                Get a demo
              </button>
            </div>
            
            {/* Right Column - Video */}
            <div className="rounded-lg overflow-hidden h-[400px] w-full">
              {videoUrl ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain rounded-lg bg-[#0A1F1C]/30"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="bg-[#0A1F1C]/30 rounded-lg p-8 h-full flex items-center justify-center">
                  <p className="text-[#729E8C] font-light italic">Video placeholder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Section - If still needed */}
      {visualContent && (
        <section className="mt-16">
          <div className="mx-auto max-w-site px-6">
            {visualContent}
          </div>
        </section>
      )}
      
      {/* Additional Content Section - Optional */}
      {additionalContent && (
        <section className="mt-16">
          <div className="mx-auto mx-w-site px-6">
            {additionalContent}
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#0A1F1C]/30 mt-16">
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
      
      {/* Mind Map Section */}
      {mindMapData && (
        <section className="py-16 mt-8">
          <div className="mx-auto max-w-site px-6">
            <h2 className="text-3xl font-extralight text-[#B8D8D0] mb-12">{name} Integration Mind Map</h2>
            
            <div className="bg-[#0A1F1C]/30 p-8 rounded-lg">
              <div className="mind-map-container h-[600px] relative">
                {/* This is a placeholder for an actual mind map visualization */}
                {/* In a real implementation, you would use a visualization library like D3.js */}
                <div className="text-center text-[#729E8C] font-light p-4">
                  <p className="mb-4">Mind Map Visualization</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mindMapData.nodes
                      .filter(node => node.id !== "root" && !node.id.includes("-"))
                      .map((node) => (
                        <div key={node.id} className="border border-[#0A1F1C] p-4 rounded-lg">
                          <h3 className="text-xl text-[#B8D8D0] mb-4">{node.label}</h3>
                          <ul className="list-disc pl-6 space-y-2 text-left">
                            {mindMapData.nodes
                              .filter(childNode => childNode.id.startsWith(`${node.id}-`))
                              .map(childNode => (
                                <li key={childNode.id}>{childNode.label}</li>
                              ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading={ctaProps?.heading || `Ready to integrate ${name} with TextQL?`}
        subheader={ctaProps?.subheader || "Get started with our seamless integration today"}
        useSimpleButton={ctaProps?.useSimpleButton || true}
        buttonText={ctaProps?.buttonText || "Get a demo"}
      />
    </div>
  );
};

export default IntegrationPageTemplate;