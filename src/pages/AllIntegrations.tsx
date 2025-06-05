import React from 'react';
import { SEO } from '../components/SEO';
import { AllIntegrationsHeader } from '../components/page-sections/integrations/AllIntegrationsHeader';
import { PopularIntegrationsSection } from '../components/page-sections/integrations/PopularIntegrationsSection';
import { AllIntegrationsSection } from '../components/page-sections/integrations/AllIntegrationsSection';
import { CTA } from '../components/sections';

export default function AllIntegrations() {
  return (
    <>
      <SEO
        title="All Integrations | TextQL"
        description="Connect with data warehouses, BI tools, and communication platforms to supercharge your data workflow."
        canonical="https://textql.com/all-integrations"
        ogImage="https://textql.com/social-preview.png"
      />
      <div className="min-h-screen flex flex-col justify-center">
      <AllIntegrationsHeader />
      <PopularIntegrationsSection />
      </div>
      <AllIntegrationsSection />
      <CTA 
        theme="dark"
        heading="Ready to supercharge your data analysis?"
      />
    </>
  );
} 