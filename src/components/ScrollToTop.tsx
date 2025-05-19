import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls the page to the top
 * whenever the route (pathname) changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Using 'auto' instead of 'smooth' for immediate position reset
    });
  }, [pathname]);

  return null; // This component doesn't render anything
} 