import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { TextLogo } from '../Logo';
import { NavItem } from './NavItem';
import { navigation } from './types';
import { Menu, X } from 'lucide-react';
import { handleSimpleDemoRequest } from '../../utils/demo-requests/simple';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDevelopment = import.meta.env.DEV;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/demo');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6">
      <nav className={`mx-auto max-w-7xl py-2 transition-all duration-300 ring-1 ring-[#B8D8D0]/20 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-md shadow-lg' 
          : 'bg-black/30 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between px-4 md:px-6">
          <Link to="/" className="text-white hover:text-[#B8D8D0] transition-colors">
            <TextLogo className="h-6 md:h-6 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Design System link - commented out
            {isDevelopment && (
              <Link to="/design-system">
                <Button variant="ghost" size="sm">Design System</Button>
              </Link>
            )}
            */}
            <a 
              href="https://app.textql.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm">Sign In</Button>
            </a>
            <Button 
              variant="primary" 
              size="sm"
              onClick={onDemoRequest}
            >
              Request a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <div key={item.label} className="py-2">
                {item.href ? (
                  item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ) : (
                  <div className="space-y-2">
                    <div className="text-[#B8D8D0]">{item.label}</div>
                    {item.children && (
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          child.external ? (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-[#729E8C] hover:text-[#B8D8D0] transition-colors text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block text-[#729E8C] hover:text-[#B8D8D0] transition-colors text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 border-t border-[#B8D8D0]/10 space-y-3">
              {/* Design System link - commented out
              {isDevelopment && (
                <Link 
                  to="/design-system"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
                >
                  Design System
                </Link>
              )}
              */}
              <a 
                href="https://app.textql.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
              >
                Sign In
              </a>
              <button
                onClick={(e) => {
                  onDemoRequest(e);
                  setIsMenuOpen(false);
                }}
                className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors font-medium"
              >
                Request a Demo →
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}