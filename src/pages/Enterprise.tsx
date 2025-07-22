import { 
  EnterpriseHero, 
  EnterpriseFeatureGrid1, 
  EnterpriseFeatureGrid2 
} from '../components/page-sections/enterprise';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../utils/theme-utils';

export default function Enterprise() {
  const theme = useComponentTheme();
  return (
    <div className={`min-h-screen ${themeBackgroundSecondary(theme)}`}>
      <SEO 
        title="Enterprise | TextQL"
        description="Enterprise-grade security and deployment options for TextQL. Deploy in your own cloud with complete control and data sovereignty."
        canonical="https://textql.com/enterprise/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <EnterpriseHero />

      {/* Security Features */}
      <Section 
        variant="content"
        padding="md"
        background="primary"
      >
        <EnterpriseFeatureGrid1 theme={theme} />
      </Section>

      {/* Compliance */}
      <Section 
        variant="content"
        padding="md"
        background="secondary"
        className={theme === 'light' ? 'bg-[#F0F5F3]' : 'bg-[#0F1712]'}
      >
        <EnterpriseFeatureGrid2 theme={theme} />
      </Section>

      {/* CTA Section - Dark */}
      <CTA 
        heading="Deploy TextQL in Your Cloud Today"
        subheader="Get started with enterprise-grade security and scalability"
        theme={theme}
        showWave={true}
        variant="wide"
      />
    </div>
  );
}