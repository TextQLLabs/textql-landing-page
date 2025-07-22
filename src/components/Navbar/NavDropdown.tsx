import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import type { NavMenuContent, NavSection, NavSubItem } from './types';
import { useGlobalTheme } from '../GlobalThemeProvider';
import filterStyles from '../../styles/filters.module.css';

interface NavDropdownProps {
  content: NavMenuContent | undefined;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
}

const NavIcon = ({ iconName }: { iconName: keyof typeof LucideIcons | string }) => {
  const { isLightMode } = useGlobalTheme();
  // Check if it's a custom image path
  if (typeof iconName === 'string' && iconName.includes('/')) {
    return (
      <div 
        className={`w-5 h-5 flex-shrink-0 ${isLightMode ? filterStyles.iconMaskLight : filterStyles.iconMaskDark} group-hover:opacity-100`}
        style={{
          maskImage: `url(${iconName})`,
          WebkitMaskImage: `url(${iconName})`
        }}
      />
    );
  }
  
  // Handle Lucide icons
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>;
  return Icon ? <Icon className={!isLightMode ? "w-5 h-5 text-gray-400 flex-shrink-0" : "w-5 h-5 text-gray-600 flex-shrink-0"} /> : null;
};

const SectionPanel = ({ section, onClose }: { section: NavSection; onClose?: () => void }) => {
  const { isLightMode } = useGlobalTheme();
  return (
    <div className="w-full">
      <h3 className={!isLightMode ? "text-xs font-medium text-gray-400 uppercase tracking-wide mb-3" : "text-xs font-medium text-gray-500 uppercase tracking-wide mb-3"}>{section.title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {section.items.map((item) => (
          <div key={item.href} className="w-full">
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={!isLightMode ? "flex items-start gap-3 p-3 hover:bg-gray-700 rounded-md transition-colors group cursor-pointer" : "flex items-start gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors group cursor-pointer"}
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} />}
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className={!isLightMode ? "text-gray-100 text-sm font-medium group-hover:text-gray-50" : "text-gray-900 text-sm font-medium group-hover:text-gray-900"}>{item.label}</span>
                    <ArrowUpRight className={!isLightMode ? "w-3.5 h-3.5 text-gray-400" : "w-3.5 h-3.5 text-gray-500"} />
                  </div>
                  {item.description && (
                    <p className={!isLightMode ? "mt-1 text-xs text-gray-400" : "mt-1 text-xs text-gray-600"}>{item.description}</p>
                  )}
                </div>
              </a>
            ) : (
              <Link
                to={item.href}
                className={!isLightMode ? "flex items-start gap-3 p-3 hover:bg-gray-700 rounded-md transition-colors group cursor-pointer" : "flex items-start gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors group cursor-pointer"}
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} />}
                <div>
                  <div className={!isLightMode ? "text-gray-100 text-sm font-medium group-hover:text-gray-50" : "text-gray-900 text-sm font-medium group-hover:text-gray-900"}>{item.label}</div>
                  {item.description && (
                    <p className={!isLightMode ? "mt-1 text-xs text-gray-400" : "mt-1 text-xs text-gray-600"}>{item.description}</p>
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
  onClose
}: NavMenuContent['featuredImage'] & { external: boolean; onClose?: () => void }) => {
  const { isLightMode } = useGlobalTheme();
  const content = (
    <div className="w-full h-full flex flex-col">
      {sectionTitle && (
        <h3 className={!isLightMode ? "text-xs font-medium text-gray-400 uppercase tracking-wide mb-3" : "text-xs font-medium text-gray-500 uppercase tracking-wide mb-3"}>{sectionTitle}</h3>
      )}
      <div className={!isLightMode ? "rounded-md overflow-hidden bg-gray-800 flex-1 flex flex-col hover:bg-gray-700 transition-colors" : "rounded-md overflow-hidden bg-gray-50 flex-1 flex flex-col hover:bg-gray-100 transition-colors"}>
        <div className={!isLightMode ? "flex-1 overflow-hidden flex items-center justify-center bg-gray-700" : "flex-1 overflow-hidden flex items-center justify-center bg-gray-100"}>
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </div>
        <div className="p-3 flex-shrink-0">
          <h3 className={!isLightMode ? "font-medium text-gray-100 text-sm" : "font-medium text-gray-900 text-sm"}>{title}</h3>
          <p className={!isLightMode ? "mt-1 text-xs text-gray-400 line-clamp-2" : "mt-1 text-xs text-gray-600 line-clamp-2"}>{description}</p>
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
        className="block h-full cursor-pointer"
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

export function NavDropdown({ content, isOpen, onMouseEnter, onMouseLeave, onClose }: NavDropdownProps) {
  const { isLightMode } = useGlobalTheme();
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
        transition-all duration-300 ease-in-out pointer-events-none
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div 
        className={`${!isLightMode ? "bg-gray-900 border border-gray-700 shadow-xl rounded-md" : "bg-white border border-gray-200 shadow-xl rounded-md"} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="p-6">
          <div className={`grid ${getGridCols()} gap-6 min-w-0 items-start`}>
            {sections && sections.map((section, index) => (
              <div key={index} className="min-w-[200px] h-full">
                <SectionPanel section={section} onClose={onClose} />
              </div>
            ))}
            
            {featuredImage && (
              <div className="min-w-[280px] max-w-[320px] h-full">
                <FeaturedPanel {...featuredImage} external={featuredImage.external || false} onClose={onClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 