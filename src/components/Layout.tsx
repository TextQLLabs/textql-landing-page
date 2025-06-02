import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BannerCarousel } from './';

// Banner items for the top carousel
const bannerItems = [
  { 
    text: "In SF June 2-4 for Summit? Meet the founders of TextQL in a private session ↗",
    link: "/snowflake-2025",
    icon: '/images/navbar/snowflake.png'
  },
  { 
    text: "Snowflake Summit 2025: how real companies find real insights ↗",
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