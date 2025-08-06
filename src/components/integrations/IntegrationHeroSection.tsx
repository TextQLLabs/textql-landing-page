import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FunnelFlow } from '../animations/FunnelFlow';
import { WaveBackground } from '../animations';
import { Testimonial } from '../Testimonial';
import { DemoRequestForm } from '../ui/DemoRequestForm';
import { DemoRequestButton } from '../ui/Button/DemoRequestButton';
import { Section } from '../ui/Section';

interface HeroSectionProps {
  headline: string;
  description: string;
  videoUrl?: string;
}

export default function HeroSection({ headline, description, videoUrl }: HeroSectionProps) {
  const navigate = useNavigate();
  
  const handleDemoClick = () => {
    navigate('/demo');
  };
  
  return (
    <Section
      variant="content"
      padding="none"
      height="min-screen"
      background="transparent"
      className="z-0 relative"
    >
      {/* Background funnel flow - positioned behind everything */}
      {/* <div className="absolute inset-0 -z-1 opacity-60 scale-125 translate-y-[15%]">
        <FunnelFlow />
      </div> */}
       <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      <div className="flex flex-col justify-center relative z-10 min-h-screen px-6 pb-40 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center px-6 max-w-xl lg:max-w-site mx-auto lg:min-h-0 pb-10 lg:pb-20">
          {/* Left Column - Hero Content */}
          <div className="text-left">
            <h1 className="text-3xl lg:text-5xl text-center lg:text-left lg:pt-0 font-extralight text-[#B8D8D0] mb-6 opacity-0 animate-slide-up animation-delay-100 mx-auto lg:mx-0">{headline}</h1>
            <p className="text-[#729E8C] font-light text-center lg:text-left text-sm md:text-base lg:text-lg mb-6 opacity-0 animate-slide-up animation-delay-200">{description}</p>
            {/* <button 
              className="bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 mt-2 px-6 rounded-md transition-colors duration-200"
              onClick={handleDemoClick}
            >
              Get a demo
            </button> */}
          </div>
          
          {/* Right Column - Video */}
          <div className="bg-transparent opacity-0 animate-slide-up animation-delay-300 lg:mb-0">
            {videoUrl ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="bg-[#0A1F1C]/30 rounded-[20px] p-8 h-full flex items-center justify-center">
                <p className="text-[#729E8C] font-light italic">Video placeholder</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Demo Request Form - Now outside the grid as a separate block */}
        {/* Show form on desktop/tablet, button on mobile */}
        <div className="flex justify-center hidden md:flex">
          <div className="max-w-lg w-full">
            <DemoRequestForm />
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <DemoRequestButton theme="dark" buttonText="Get a demo" />
        </div>

        <div className="hidden">
          <Testimonial
          quote="TextQL's Databricks integration has revolutionized how we analyze our lakehouse data and ML models."
          author="VP of Data, F500"
          title=""
          // title="Machine Learning Director"
        />
        </div>
      </div>
    </Section>
  );
}
