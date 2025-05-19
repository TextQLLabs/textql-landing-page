import { AboutHero, AboutMission, AboutValues } from '../components/page-sections/about';
import { SEO } from '../components/SEO';

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="About | TextQL"
        description="Learn about TextQL's mission and team. We're building the future of enterprise data analysis with AI."
        canonical="https://textql.com/about/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <AboutHero />
      <AboutMission />
      <AboutValues />
    </div>
  );
}