import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BannerCarousel } from './';

// Banner items for the top carousel
const bannerItems = [
  { 
    text: "Databricks Summit 2025: book a private session with TextQL ↗",
    link: "/databricks-2025",
    icon: '/images/navbar/databricks.png'
  },
  { 
    text: "In SF June 9-12 for Databricks Summit? Meet the founders of TextQL ↗",
    link: "/databricks-2025",
    icon: '/images/navbar/databricks.png'
  }
];

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,auto,auto]">
      {/* Header area - both components use fixed positioning */}
      <div className="relative z-50">
        <BannerCarousel items={bannerItems} />
        <Navbar/>
        {/* Spacer to account for fixed header height */}
        <div className="h-[120px]"></div>
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