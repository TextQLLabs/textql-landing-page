import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface IntegrationCardProps {
  name: string;
  description: string;
  category: string;
  logoSrc: string;
  href?: string;
  isComingSoon?: boolean;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  category,
  logoSrc,
  href,
  isComingSoon = false
}) => {
  // Debug logging
  console.log(`${name}: href=${href}, isComingSoon=${isComingSoon}`);
  
  const CardContent = () => (
    <div className={`bg-white shadow-sm p-6 h-full border border-[#2A3B35]/20 flex transition-all duration-200 ${
      isComingSoon ? 'opacity-60 grayscale' : 'hover:shadow-md'
    }`}>
      {/* Left Column - Logo */}
      <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 mr-4">
        <img
          src={logoSrc}
          alt={`${name} logo`}
          className="w-16 h-16 object-contain"
        />
      </div>
      
      {/* Right Column - Title and Category */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Title positioned in center but gravitating down */}
        <div className="flex-1 flex items-center justify-between pb-10">
          <h3 className="text-xl font-medium text-[#0A1F1C] leading-tight flex-1 min-w-0 break-words transform translate-y-2">{name}</h3>
          <div className="flex-shrink-0">
            {isComingSoon && (
              <span className="text-xs font-medium bg-gray-200 text-gray-600 py-1 px-2 whitespace-nowrap">
                Coming Soon
              </span>
            )}
            {!isComingSoon && false && href && (
              <ArrowUpRight className="w-5 h-5 text-[#0A1F1C]/70 flex-shrink-0" />
            )}
          </div>
        </div>
        
        {/* Bottom Row - Category Tag */}
        <div className="absolute bottom-0 left-0 right-0">
          <span className="text-xs font-medium bg-[#B8D8D0]/30 text-[#0A1F1C]/70 py-1 px-2 inline-block max-w-full truncate">
            {category}
          </span>
        </div>
      </div>
    </div>
  );

  if (href && !isComingSoon) {
    // Check if it's an external link
    const isExternalLink = href.startsWith('http');
    console.log(`${name}: isExternalLink=${isExternalLink}`);
    
    if (isExternalLink) {
      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
      };
      
      return (
        <div 
          onClick={handleClick}
          className="block h-full cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.open(href, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <CardContent />
        </div>
      );
    } else {
      return (
        <Link to={href} className="block h-full">
          <CardContent />
        </Link>
      );
    }
  }

  return <CardContent />;
}; 