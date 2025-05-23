import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import type { NavItem as NavItemType } from './types';
import { NavDropdown } from './NavDropdown';

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const baseStyle = item.textColor ? {
    color: item.textColor,
    '--hover-color': `${item.textColor}cc`
  } as React.CSSProperties : {};

  // Render icon based on type (string path or Lucide icon name)
  const renderIcon = () => {
    if (!item.icon) return null;
    
    // Check if it's a custom image path
    if (typeof item.icon === 'string' && item.icon.includes('/')) {
      return (
        <div 
          className="w-4 h-4 flex-shrink-0 bg-[#B8D8D0] opacity-75 hover:opacity-100 transition-opacity"
          style={{
            mask: `url(${item.icon}) no-repeat center/contain`,
            WebkitMask: `url(${item.icon}) no-repeat center/contain`
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
        className="flex items-center gap-1.5 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
      >
        {renderIcon()}
        {item.label}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    ) : (
      <Link
        to={item.href}
        className="flex items-center gap-1.5 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
      >
        {renderIcon()}
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative inline-block">
      <button 
        className="flex items-center gap-1 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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