import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Layout() {
  return (
    <div className="min-h-screen">
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