import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { TextLogo } from '../Logo';
import { NavItem } from './NavItem';
import { navigation } from './types';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { handleSimpleDemoRequest } from '../../utils/demo-requests/simple';
import { useGlobalTheme } from '../GlobalThemeProvider';
import { getThemeClasses } from '../../utils/theme-utils';
import { SPACING, COLORS } from '../../styles/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { isLightMode } = useGlobalTheme();
  const isDevelopment = import.meta.env.DEV;
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

  const themeClasses = getThemeClasses(isLightMode);
  
  return (
    <div className="sticky top-0 z-50">
      <div className={`w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} transition-all duration-500 ease-out`}>
      <nav className={`w-full py-1.5 md:py-2.5 transition-all duration-300 ease-out border-b ${
        !isLightMode
          ? isScrolled 
            ? 'bg-black/90 backdrop-blur-md shadow-lg border-dark-100/20' 
            : 'bg-black/80 backdrop-blur-sm border-dark-100/20'
          : isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-light-100/20' 
            : 'bg-white/80 backdrop-blur-sm border-light-100/20'
      }`}>
        <div className={`mx-auto max-w-7xl px-4 md:px-6`}>
          <div className="flex items-center justify-between">
          <Link to="/" className={`${themeClasses.textPrimary} hover:opacity-80 transition-opacity duration-300`}>
            <TextLogo className="h-6 md:h-7 w-auto" color={!isLightMode ? COLORS.brand.mint : COLORS.brand.deepForest} />
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
            <Button 
              variant="primary" 
              size="sm"
              theme={!isLightMode ? "dark" : "light"}
              onClick={onDemoRequest}
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${themeClasses.textSecondary} ${themeClasses.textHover} transition-colors duration-300`}
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
            ${isMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className={`px-4 py-1.5 space-y-1 ${isMenuOpen ? 'overflow-y-auto scrollbar-hide max-h-[420px]' : ''}`}>
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
                      className={`block py-2 transition-colors duration-300 ${themeClasses.textSecondary} ${themeClasses.textHover}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block py-2 transition-colors duration-300 ${themeClasses.textSecondary} ${themeClasses.textHover}`}
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
                      className={`flex items-center justify-between w-full py-2 transition-colors duration-300 ${themeClasses.textSecondary} ${themeClasses.textHover}`}
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
                                  className={`block py-2 text-sm transition-colors duration-300 ${themeClasses.textMuted} hover:opacity-100`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.label}
                                </a>
                              ) : (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className={`block py-2 text-sm transition-colors duration-300 ${themeClasses.textMuted} hover:opacity-100`}
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
            <div className={`pt-4 border-t space-y-3 ${themeClasses.borderMuted}`}>
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
              <button
                onClick={(e) => {
                  onDemoRequest(e);
                  setIsMenuOpen(false);
                }}
                className={`block transition-colors duration-300 ${themeClasses.textSecondary} ${themeClasses.textHover}`}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
        </div>
      </nav>
      </div>
    </div>
  );
}