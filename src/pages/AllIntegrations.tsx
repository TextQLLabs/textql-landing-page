import React from 'react';
import { SEO } from '../components/SEO';
import { AllIntegrationsHeader } from '../components/page-sections/integrations/AllIntegrationsHeader';
import { AllIntegrationsSection } from '../components/page-sections/integrations/AllIntegrationsSection';
import { CTA } from '../components/sections';
import { useComponentTheme } from '../hooks/useComponentTheme';

export default function AllIntegrations() {
  const theme = useComponentTheme();
  
  return (
    <>
      <SEO
        title="All Integrations | TextQL"
        description="Connect with data warehouses, BI tools, and communication platforms to supercharge your data workflow."
        canonical="https://textql.com/integrations"
        ogImage="https://textql.com/social-preview.png"
      />
      <AllIntegrationsHeader />
      <AllIntegrationsSection />
      <CTA 
        theme={theme}
        heading="Ready to supercharge your data analysis?"
      />
    </>
  );
}