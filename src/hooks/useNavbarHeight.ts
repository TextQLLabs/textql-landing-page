import { useState, useEffect } from 'react';

/**
 * Hook to dynamically measure and track navbar height
 * Returns the current navbar height in pixels
 */
export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(72); // more accurate fallback based on typical navbar
  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    const measureNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const newHeight = navbar.offsetHeight;
        setNavbarHeight(newHeight);
      }
    };

    // Wait for navbar animation to complete before measuring
    // Navbar animates in after 200ms with 500ms duration = 700ms total
    const initialTimer = setTimeout(() => {
      measureNavbarHeight();
      // Mark as stable after navbar animation is complete
      setTimeout(() => setIsStable(true), 100);
    }, 750); // Wait for navbar animation to fully complete
    
    // Measure on window resize (navbar height might change on mobile/desktop)
    window.addEventListener('resize', measureNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', measureNavbarHeight);
      clearTimeout(initialTimer);
    };
  }, []);

  return { navbarHeight, isStable };
}