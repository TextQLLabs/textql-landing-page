import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,auto,auto]">
      {/* Header area - navbar uses fixed positioning */}
      <div className="relative z-50">
        <Navbar/>
        {/* Spacer to account for fixed header height */}
        <div className="h-[60px]"></div>
      </div>
      
      {/* Content area - uses remaining space */}
      <main className="relative overflow-x-hidden">
        <Outlet />
      </main>
      
      {/* Footer area - auto height */}
      <Footer />
    </div>
  );
}