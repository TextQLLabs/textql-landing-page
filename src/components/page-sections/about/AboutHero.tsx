import { Text } from '../../ui';
import { Section } from '../../ui/Section';
import { missionEssay } from './content/mission';
import { useGlobalTheme } from '../../GlobalThemeProvider';
import { getThemeClasses } from '../../../utils/theme-utils';

export function AboutHero() {
  const { isLightMode } = useGlobalTheme();
  const themeClasses = getThemeClasses(isLightMode);
  return (
    <Section
      variant="content"
      padding="none"
      paddingTop="md"
      paddingBottom="sm"
      background="black"
      hasNavbarOffset
      className="flex items-center"
    >
      {/* Mission Header */}
      <div className="text-center">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-8 leading-none tracking-tight ${themeClasses.textPrimary}`}>
          The Mission
        </h1>
        <a 
          href="https://textql.notion.site/onboarding-library-5766c3ba046e479b878de22cb1d786c4?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 transition-colors text-lg sm:text-xl md:text-2xl ${themeClasses.linkPrimary} hover:opacity-75`}
        >
          Our Intelligence Hub →
        </a>
      </div>
    </Section>
  );
}