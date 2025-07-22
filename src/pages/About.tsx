import { ValuesBlock } from '../components/careers/ValuesBlock';
import { AboutHero, AboutValues } from '../components/page-sections/about';
import { missionEssay } from '../components/page-sections/about/content/mission';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { useGlobalTheme } from '../components/GlobalThemeProvider';
import { getThemeClasses } from '../utils/theme-utils';

export default function About() {
  const { isLightMode } = useGlobalTheme();
  const themeClasses = getThemeClasses(isLightMode);
  return (
    <div className={themeClasses.bgSecondary}>
      <SEO 
        title="About | TextQL"
        description="Learn about TextQL's mission and team. We're building the future of enterprise data analysis with AI."
        canonical="https://textql.com/about/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <AboutHero />
      {/* Mission Essay */}
      <Section
        variant="content"
        padding="sm"
        background="secondary"
        className="flex flex-col justify-center space-y-12"
      >
        {missionEssay.map((paragraph, index) => (
          <p key={index} className={`text-base lg:text-xl font-light ${themeClasses.textSecondary} leading-relaxed`}>
            {paragraph}
          </p>
        ))}
      </Section>
      <ValuesBlock />
    </div>
  );
}