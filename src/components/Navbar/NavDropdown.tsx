import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import type { NavMenuContent, NavSection, NavSubItem } from './types';

interface NavDropdownProps {
  content: NavMenuContent | undefined;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
  isDarkPage?: boolean;
}

const NavIcon = ({ iconName, isDarkPage = false }: { iconName: keyof typeof LucideIcons | string; isDarkPage?: boolean }) => {
  // Check if it's a custom image path
  if (typeof iconName === 'string' && iconName.includes('/')) {
    return (
      <div 
        className={isDarkPage ? "w-5 h-5 flex-shrink-0 bg-gray-400 opacity-75 group-hover:opacity-100 transition-opacity" : "w-5 h-5 flex-shrink-0 bg-gray-600 opacity-75 group-hover:opacity-100 transition-opacity"}
        style={{
          mask: `url(${iconName}) no-repeat center/contain`,
          WebkitMask: `url(${iconName}) no-repeat center/contain`
        }}
      />
    );
  }
  
  // Handle Lucide icons
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>;
  return Icon ? <Icon className={isDarkPage ? "w-5 h-5 text-gray-400 flex-shrink-0" : "w-5 h-5 text-gray-600 flex-shrink-0"} /> : null;
};

const SectionPanel = ({ section, onClose, isDarkPage = false }: { section: NavSection; onClose?: () => void; isDarkPage?: boolean }) => {
  return (
    <div className="w-full">
      <h3 className={isDarkPage ? "text-xs font-medium text-gray-400 uppercase tracking-wide mb-3" : "text-xs font-medium text-gray-500 uppercase tracking-wide mb-3"}>{section.title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {section.items.map((item) => (
          <div key={item.href} className="w-full">
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={isDarkPage ? "flex items-start gap-3 p-3 hover:bg-gray-700 rounded-md transition-colors group" : "flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors group"}
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} isDarkPage={isDarkPage} />}
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className={isDarkPage ? "text-gray-100 text-sm font-medium group-hover:text-gray-50" : "text-gray-900 text-sm font-medium group-hover:text-gray-900"}>{item.label}</span>
                    <ArrowUpRight className={isDarkPage ? "w-3.5 h-3.5 text-gray-400" : "w-3.5 h-3.5 text-gray-500"} />
                  </div>
                  {item.description && (
                    <p className={isDarkPage ? "mt-1 text-xs text-gray-400" : "mt-1 text-xs text-gray-600"}>{item.description}</p>
                  )}
                </div>
              </a>
            ) : (
              <Link
                to={item.href}
                className={isDarkPage ? "flex items-start gap-3 p-3 hover:bg-gray-700 rounded-md transition-colors group" : "flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors group"}
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} isDarkPage={isDarkPage} />}
                <div>
                  <div className={isDarkPage ? "text-gray-100 text-sm font-medium group-hover:text-gray-50" : "text-gray-900 text-sm font-medium group-hover:text-gray-900"}>{item.label}</div>
                  {item.description && (
                    <p className={isDarkPage ? "mt-1 text-xs text-gray-400" : "mt-1 text-xs text-gray-600"}>{item.description}</p>
                  )}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturedPanel = ({ 
  src, 
  alt, 
  title, 
  description, 
  href, 
  external,
  sectionTitle,
  onClose,
  isDarkPage = false
}: NavMenuContent['featuredImage'] & { external: boolean; onClose?: () => void; isDarkPage?: boolean }) => {
  const content = (
    <div className="w-full h-full flex flex-col">
      {sectionTitle && (
        <h3 className={isDarkPage ? "text-xs font-medium text-gray-400 uppercase tracking-wide mb-3" : "text-xs font-medium text-gray-500 uppercase tracking-wide mb-3"}>{sectionTitle}</h3>
      )}
      <div className={isDarkPage ? "rounded-md overflow-hidden bg-gray-800 flex-1 flex flex-col" : "rounded-md overflow-hidden bg-gray-50 flex-1 flex flex-col"}>
        <div className={isDarkPage ? "flex-1 overflow-hidden flex items-center justify-center bg-gray-700" : "flex-1 overflow-hidden flex items-center justify-center bg-gray-100"}>
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </div>
        <div className="p-3 flex-shrink-0">
          <h3 className={isDarkPage ? "font-medium text-gray-100 text-sm" : "font-medium text-gray-900 text-sm"}>{title}</h3>
          <p className={isDarkPage ? "mt-1 text-xs text-gray-400 line-clamp-2" : "mt-1 text-xs text-gray-600 line-clamp-2"}>{description}</p>
        </div>
      </div>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        onClick={onClose}
      >
        {content}
      </a>
    );
  }
  
  return (
    <Link to={href} className="block h-full" onClick={onClose}>
      {content}
    </Link>
  );
};

export function NavDropdown({ content, isOpen, onMouseEnter, onMouseLeave, onClose, isDarkPage = false }: NavDropdownProps) {
  if (!content) return null;
  
  const { sections, featuredImage } = content;
  
  // Calculate number of columns based on content
  const sectionsCount = sections?.length || 0;
  const hasFeatureImage = !!featuredImage;
  const totalColumns = sectionsCount + (hasFeatureImage ? 1 : 0);
  
  // Determine grid columns class
  const getGridCols = () => {
    switch (totalColumns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      default: return 'grid-cols-2';
    }
  };
  
  return (
    <div 
      className={`
        fixed left-0 right-0 top-[64px] z-50 flex justify-center px-4
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      style={{ pointerEvents: isOpen ? 'none' : 'none' }}
    >
      <div 
        className={isDarkPage ? "bg-gray-900 border border-gray-700 shadow-xl rounded-md" : "bg-[#F7F7F7] border border-gray-200 shadow-xl rounded-md"}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="p-6">
          <div className={`grid ${getGridCols()} gap-6 min-w-0 items-start`}>
            {sections && sections.map((section, index) => (
              <div key={index} className="min-w-[200px] h-full">
                <SectionPanel section={section} onClose={onClose} isDarkPage={isDarkPage} />
              </div>
            ))}
            
            {featuredImage && (
              <div className="min-w-[280px] max-w-[320px] h-full">
                <FeaturedPanel {...featuredImage} external={featuredImage.external || false} onClose={onClose} isDarkPage={isDarkPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 