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
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Top Row - Title and Coming Soon/Arrow */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl mt-4 ml-2 font-medium text-[#0A1F1C] leading-tight flex-1 min-w-0 break-words">{name}</h3>
          <div className="flex-shrink-0">
            {isComingSoon && (
              <span className="text-xs font-medium bg-gray-200 text-gray-600 py-1 px-2 whitespace-nowrap">
                Coming Soon
              </span>
            )}
            {!isComingSoon && href && (
              <ArrowUpRight className="w-5 h-5 text-[#0A1F1C]/70 flex-shrink-0" />
            )}
          </div>
        </div>
        
        {/* Bottom Row - Category Tag */}
        <div className="mt-auto ml-2 pt-2">
          <span className="text-xs font-medium bg-[#B8D8D0]/30 text-[#0A1F1C]/70 py-1 px-2 inline-block max-w-full truncate">
            {category}
          </span>
        </div>
      </div>
    </div>
  );

  if (href && !isComingSoon) {
    return (
      <Link to={href} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}; 