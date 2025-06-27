import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Layout() {
  const location = useLocation();
  
  // Check if current page should have dark background
  const isDarkPage = location.pathname.startsWith('/careers') || 
                     location.pathname.startsWith('/about');
  
  return (
    <div className={`min-h-screen ${isDarkPage ? 'bg-black' : ''}`}>
      {/* 
        Fixed navbar overlay - positioned above all content
        The navbar uses fixed positioning and overlays the viewport
        without affecting the layout flow of the main content
      */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar/>
      </div>
      
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