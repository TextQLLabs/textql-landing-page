import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { TextLogo } from '../Logo';
import { NavItem } from './NavItem';
import { navigation } from './types';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { handleSimpleDemoRequest } from '../../utils/demo-requests/simple';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const isDevelopment = import.meta.env.DEV;
  // Check if debug borders should be shown (look for a global flag or localStorage)
  const [showDebugBorders, setShowDebugBorders] = useState(false);
  
  useEffect(() => {
    // Listen for debug toggle events or check localStorage
    const checkDebugState = () => {
      const debugState = localStorage.getItem('showDebugBorders') === 'true';
      setShowDebugBorders(debugState);
    };
    
    checkDebugState();
    // Listen for storage changes
    window.addEventListener('storage', checkDebugState);
    // Custom event for same-tab updates
    window.addEventListener('debugToggle', checkDebugState);
    
    return () => {
      window.removeEventListener('storage', checkDebugState);
      window.removeEventListener('debugToggle', checkDebugState);
    };
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animate navbar in after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedSections([]);
  }, [location.pathname]);

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/demo');
  };

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} transition-all duration-500 ease-out ${showDebugBorders ? 'border-2 border-red-500' : ''}`}>
      <nav className={`w-full py-3 md:py-4 transition-all duration-300 ease-out border-b ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg border-white/30' 
          : 'bg-black/60 backdrop-blur-sm border-white/20'
      } ${showDebugBorders ? 'border-2 border-cyan-500' : ''}`}>
        <div className={`mx-auto max-w-7xl px-4 md:px-6 ${showDebugBorders ? 'border-2 border-pink-500' : ''}`}>
          <div className="flex items-center justify-between">
          <Link to="/" className="text-white hover:text-[#B8D8D0] transition-colors duration-300">
            <TextLogo className="h-6 md:h-7 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
            className="lg:hidden p-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300"
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
            lg:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className={`px-4 py-3 space-y-1 ${isMenuOpen ? 'overflow-y-auto scrollbar-hide' : ''} max-h-[460px]`}>
            {navigation.map((item) => (
              <div key={item.label}>
                {/* Main navigation item */}
                {item.href ? (
                  // Simple link items (like Pricing)
                  item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-3 text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-3 text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ) : (
                  // Items with megaMenu
                  <div>
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="flex items-center justify-between w-full py-3 text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300"
                    >
                      <span>{item.label}</span>
                      {expandedSections.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Expanded sub-items */}
                    {expandedSections.includes(item.label) && item.megaMenu && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.megaMenu.sections?.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            {section.items.map((subItem) => (
                              subItem.external ? (
                                <a
                                  key={subItem.href}
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-2 text-sm text-[#B8D8D0]/80 hover:text-[#B8D8D0] transition-colors duration-300"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.label}
                                </a>
                              ) : (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className="block py-2 text-sm text-[#B8D8D0]/80 hover:text-[#B8D8D0] transition-colors duration-300"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              )
                            ))}
                          </div>
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
                className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300"
              >
                Sign In
              </a>
              <button
                onClick={(e) => {
                  onDemoRequest(e);
                  setIsMenuOpen(false);
                }}
                className="block text-[#B8D8D0] hover:text-[#729E8C] transition-colors duration-300 font-medium"
              >
                Request a Demo →
              </button>
            </div>
          </div>
        </div>
        </div>
      </nav>
    </div>
  );
}