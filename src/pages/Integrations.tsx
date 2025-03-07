import { SEO } from '../components/SEO';
import { IntegrationsHero } from '../components/page-sections/integrations/IntegrationsHero';
import { DataSourcesSection } from '../components/page-sections/integrations/DataSourcesSection';
import { DataMovementSection } from '../components/page-sections/integrations/DataMovementSection';
import { CTASection } from '../components/page-sections/integrations/CTASection';

export default function Integrations() {
  return (
    <>
      <SEO
        title="TextQL | Integrations"
        description="Connect TextQL to your data sources and systems of record. Explore our supported connectors and integrations."
        canonical="https://textql.com/integrations"
      />

      <IntegrationsHero />
      <DataSourcesSection />
      <DataMovementSection />
      <CTASection />
    </>
  );
} 