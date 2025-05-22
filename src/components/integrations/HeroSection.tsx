import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FunnelFlow } from '../animations/FunnelFlow';
import { WaveBackground } from '../animations';

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
    <section className="mt-20 pt-24 z-0 relative">
      {/* Background funnel flow - positioned behind everything */}
      {/* <div className="absolute inset-0 -z-1 opacity-60 scale-125 translate-y-[15%]">
        <FunnelFlow />
      </div> */}
       <div className="absolute inset-0 z-0 translate-y-[20%]">
        <WaveBackground />
      </div>
      
      <div className="mx-auto max-w-site px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-extralight text-[#B8D8D0] mb-6">{headline}</h1>
            <p className="text-[#729E8C]/70 font-light text-lg mb-6">{description}</p>
            {/* <button 
              className="bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 mt-2 px-6 rounded-md transition-colors duration-200"
              onClick={handleDemoClick}
            >
              Get a demo
            </button> */}
          </div>
          
          {/* Right Column - Video */}
          <div className="rounded-lg overflow-hidden h-[400px] w-full">
            {videoUrl ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain rounded-lg bg-black/30"
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
  );
}
