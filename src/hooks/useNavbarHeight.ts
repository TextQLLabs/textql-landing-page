import { useState, useEffect } from 'react';

/**
 * Hook to dynamically measure and track navbar height
 * Returns the current navbar height in pixels
 */
export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(80); // reasonable fallback

  useEffect(() => {
    const measureNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Measure on mount
    measureNavbarHeight();
    
    // Measure on window resize (navbar height might change on mobile/desktop)
    window.addEventListener('resize', measureNavbarHeight);
    
    // Optional: remeasure if fonts load late
    const timer = setTimeout(measureNavbarHeight, 100);
    
    return () => {
      window.removeEventListener('resize', measureNavbarHeight);
      clearTimeout(timer);
    };
  }, []);

  return navbarHeight;
}