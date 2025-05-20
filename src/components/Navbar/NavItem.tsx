import { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { NavItem as NavItemType } from './types';
import { NavDropdown } from './NavDropdown';

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyle = item.textColor ? {
    color: item.textColor,
    '--hover-color': `${item.textColor}cc`
  } as React.CSSProperties : {};

  if (item.href) {
    return item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
      >
        {item.icon && (
          <img src={item.icon} alt="" className="w-4 h-4 object-contain" />
        )}
        {item.label}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    ) : (
      <Link
        to={item.href}
        className="flex items-center gap-1.5 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
      >
        {item.icon && (
          <img src={item.icon} alt="" className="w-4 h-4 object-contain" />
        )}
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="flex items-center gap-1 text-[#B8D8D0] hover:text-[--hover-color] transition-colors text-sm"
        style={baseStyle}
      >
        {item.icon && (
          <img src={item.icon} alt="" className="w-4 h-4 object-contain" />
        )}
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {item.children && isOpen && (
        <NavDropdown items={item.children} />
      )}
    </div>
  );
}