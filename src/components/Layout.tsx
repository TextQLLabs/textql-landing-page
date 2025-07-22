import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavbarHeight } from '../hooks/useNavbarHeight';


export default function Layout() {
  const location = useLocation();
  const navbarHeight = useNavbarHeight();
  
  // Update CSS custom property for navbar height
  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }, [navbarHeight]);
  
  return (
    <div className="min-h-screen">
      {/* 
        Fixed navbar overlay - positioned above all content
        The navbar uses fixed positioning and overlays the viewport
        without affecting the layout flow of the main content
        Note: z-index is now handled by the navbar's DebugWrapper
      */}
      <Navbar/>
      
      {/* 
        Main content area - full viewport height
        Content flows naturally without navbar spacing
        Individual sections handle their own navbar clearance if needed
      */}
      <main className="relative overflow-x-hidden">
        <Outlet />
      </main>
      
      {/* Footer area - auto height */}
      <Footer />
    </div>
  );
}