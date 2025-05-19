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

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="flex items-center gap-1.5 text-[#B8D8D0] hover:text-[#729E8C] transition-colors text-sm"
      >
        {item.label}
        {item.external && <ArrowUpRight className="w-3.5 h-3.5" />}
      </a>
    );
  }

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-[#B8D8D0] hover:text-[#729E8C] transition-colors text-sm">
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {item.children && isOpen && (
        <NavDropdown items={item.children} />
      )}
    </div>
  );
}