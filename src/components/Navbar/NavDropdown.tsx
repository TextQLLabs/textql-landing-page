import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { NavMenuContent, NavSection, NavSubItem } from './types';

interface NavDropdownProps {
  content: NavMenuContent | undefined;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
}

const NavIcon = ({ iconName }: { iconName: keyof typeof LucideIcons | string }) => {
  // Check if it's a custom image path
  if (typeof iconName === 'string' && iconName.includes('/')) {
    return (
      <div 
        className="w-5 h-5 flex-shrink-0 bg-[#B8D8D0] opacity-75 group-hover:opacity-100 transition-opacity"
        style={{
          mask: `url(${iconName}) no-repeat center/contain`,
          WebkitMask: `url(${iconName}) no-repeat center/contain`
        }}
      />
    );
  }
  
  // Handle Lucide icons
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>;
  return Icon ? <Icon className="w-5 h-5 text-[#B8D8D0] flex-shrink-0" /> : null;
};

const SectionPanel = ({ section, onClose }: { section: NavSection; onClose?: () => void }) => {
  return (
    <div className="w-full">
      <h3 className="text-xs font-medium text-[#729E8C] uppercase tracking-wide mb-3">{section.title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {section.items.map((item) => (
          <div key={item.href} className="w-full">
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 hover:bg-[#B8D8D0]/10 rounded-md transition-colors group"
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} />}
                <div>
                  <div className="text-[#B8D8D0] text-sm font-medium group-hover:text-white">{item.label}</div>
                  {item.description && (
                    <p className="mt-1 text-xs text-[#729E8C]">{item.description}</p>
                  )}
                </div>
              </a>
            ) : (
              <Link
                to={item.href}
                className="flex items-start gap-3 p-3 hover:bg-[#B8D8D0]/10 rounded-md transition-colors group"
                onClick={onClose}
              >
                {item.icon && <NavIcon iconName={item.icon} />}
                <div>
                  <div className="text-[#B8D8D0] text-sm font-medium group-hover:text-white">{item.label}</div>
                  {item.description && (
                    <p className="mt-1 text-xs text-[#729E8C]">{item.description}</p>
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
  const content = (
    <div className="w-full h-full">
      {sectionTitle && (
        <h3 className="text-xs font-medium text-[#729E8C] uppercase tracking-wide mb-3">{sectionTitle}</h3>
      )}
      <div className="rounded-md overflow-hidden bg-[#B8D8D0]/5 h-full">
        <div className="h-36 overflow-hidden">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-[#B8D8D0] text-sm">{title}</h3>
          <p className="mt-1 text-xs text-[#729E8C]">{description}</p>
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

export function NavDropdown({ content, isOpen, onMouseEnter, onMouseLeave, onClose }: NavDropdownProps) {
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
        fixed left-0 right-0 top-[52px] z-50 flex justify-center
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="min-w-fit max-w-none bg-black border border-[#B8D8D0]/20 shadow-xl ">
        <div className="p-6">
          <div className={`grid ${getGridCols()} gap-8 min-w-0`}>
            {sections && sections.map((section, index) => (
              <div key={index} className="min-w-64">
                <SectionPanel section={section} onClose={onClose} />
              </div>
            ))}
            
            {featuredImage && (
              <div className="min-w-72">
                <FeaturedPanel {...featuredImage} external={featuredImage.external || false} onClose={onClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 