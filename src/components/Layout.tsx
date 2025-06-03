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
    text: "In SF June 2-4 for Snowflake Summit? Meet the founders of TextQL ↗",
    link: "/snowflake-2025",
    icon: '/images/navbar/snowflake.png'
  }
];

export default function Layout() {
  return (
    <>
      <BannerCarousel items={bannerItems} />
      <Navbar />
      <div className="mt-32 md:mt-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}