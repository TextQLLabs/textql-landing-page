import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import type { NavItem as NavItemType } from './types';
import { NavDropdown } from './NavDropdown';
import { useGlobalTheme } from '../GlobalThemeProvider';
import filterStyles from '../../styles/filters.module.css';

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const { isLightMode } = useGlobalTheme();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  // CSS variables for custom text color
  const cssVars = item.textColor ? {
    '--text-color': item.textColor,
    '--hover-color': `${item.textColor}cc`
  } as React.CSSProperties : undefined;

  // Render icon based on type (string path or Lucide icon name)
  const renderIcon = () => {
    if (!item.icon) return null;
    
    // Check if it's a custom image path
    if (typeof item.icon === 'string' && item.icon.includes('/')) {
      return (
        <div 
          className={`w-4 h-4 flex-shrink-0 ${isLightMode ? filterStyles.iconMaskLight : filterStyles.iconMaskDark}`}
          style={{
            maskImage: `url(${item.icon})`,
            WebkitMaskImage: `url(${item.icon})`
          }}
        />
      );
    }
    
    // Handle Lucide icons
    if (typeof item.icon === 'string') {
      const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>;
      return Icon ? <Icon className="w-4 h-4" /> : null;
    }
    
    return null;
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150); // 150ms delay
  };

  if (item.href) {
    return item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={!isLightMode ? "flex items-center gap-1.5 text-gray-300 hover:text-gray-100 transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer" : "flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer"}
        style={cssVars}
      >
        {renderIcon()}
        {item.label}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    ) : (
      <Link
        to={item.href}
        className={!isLightMode ? "flex items-center gap-1.5 text-gray-300 hover:text-gray-100 transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer" : "flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors text-sm px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer"}
        style={cssVars}
      >
        {renderIcon()}
        {item.label}
      </Link>
    );
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`flex items-center gap-1 transition-all text-sm px-3 py-2 rounded-md cursor-pointer ${
          isOpen 
            ? !isLightMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
            : !isLightMode ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {renderIcon()}
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <NavDropdown 
        content={item.megaMenu} 
        isOpen={isOpen} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}