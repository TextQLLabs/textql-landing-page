import { Link } from 'react-router-dom';

interface NavDropdownItem {
  label: string;
  description?: string;
  href: string;
  external?: boolean;
}

interface NavDropdownProps {
  items: NavDropdownItem[];
}

export function NavDropdown({ items }: NavDropdownProps) {
  return (
    <div className="absolute left-1/2 top-full pt-4 -translate-x-1/2">
      <div className="w-[280px] md:w-[320px] bg-black/95 backdrop-blur-md ring-1 ring-[#B8D8D0]/20 shadow-xl shadow-[#B8D8D0]/20">
        <div className="relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black/95 ring-1 ring-[#B8D8D0]/20 ring-b-0 ring-r-0" />
          <div className="p-3 md:p-4 space-y-3 md:space-y-4">
            {items.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 md:p-3 hover:bg-[#B8D8D0]/10 transition-colors"
                >
                  <div className="text-[#B8D8D0] text-sm font-medium">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="mt-1 text-xs text-[#729E8C]">
                      {item.description}
                    </div>
                  )}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block p-2 md:p-3 hover:bg-[#B8D8D0]/10 transition-colors"
                >
                  <div className="text-[#B8D8D0] text-sm font-medium">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="mt-1 text-xs text-[#729E8C]">
                      {item.description}
                    </div>
                  )}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}