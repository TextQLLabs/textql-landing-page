import { ValuesBlock } from '../components/careers/ValuesBlock';
import { AboutHero, AboutMission, AboutValues } from '../components/page-sections/about';
import { missionEssay } from '../components/page-sections/about/content/mission';
import { SEO } from '../components/SEO';

export default function About() {
  return (
    <div className="bg-black" style={{ backgroundColor: '#000000' }}>
      <SEO 
        title="About | TextQL"
        description="Learn about TextQL's mission and team. We're building the future of enterprise data analysis with AI."
        canonical="https://textql.com/about/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <div className="min-h-screen flex flex-col justify-center"> 
      <AboutHero />
      <AboutMission />
      </div>
      {/* Mission Essay */}
      <div className="max-w-2xl lg:max-w-site px-12 lg:px-12 flex flex-col justify-center mx-auto space-y-12 pb-12">
          {missionEssay.map((paragraph, index) => (
            <p key={index} className="text-base lg:text-xl justify-center font-light text-[#B8D8D0] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      <ValuesBlock />
    </div>
  );
}