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
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full transition-all duration-200 ${
      isComingSoon 
        ? 'opacity-60 cursor-not-allowed' 
        : href 
          ? 'hover:shadow-md hover:border-gray-300 cursor-pointer' 
          : ''
    }`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center mb-4">
        <img
          src={logoSrc}
          alt={`${name} logo`}
          className="h-12 w-auto object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/integrations/placeholder.png';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>
          {isComingSoon && (
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
              Coming Soon
            </span>
          )}
          {!isComingSoon && href && (
            <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
        
        <div className="pt-2">
          <span className="inline-block text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );

  if (href && !isComingSoon) {
    // Check if it's an external link
    const isExternalLink = href.startsWith('http');
    
    if (isExternalLink) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <CardContent />
        </a>
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