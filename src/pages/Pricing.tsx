import { 
  PricingHeader,
  PricingPlansSection,
  PricingFAQSection
} from '../components/page-sections/pricing';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';
import { useComponentTheme } from '../hooks/useComponentTheme';

export default function Pricing() {
  const theme = useComponentTheme();
  
  return (
    <div className="min-h-screen">
      <SEO 
        title="Pricing | TextQL"
        description="Transparent pricing with predictable ROI for TextQL's AI platform. Choose the perfect deployment option for your needs."
        canonical="https://textql.com/pricing/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Dark Mode Header */}
      <PricingHeader />

      {/* Deployment Options */}
      <PricingPlansSection />

      {/* FAQ Section */}
      <PricingFAQSection />

      {/* CTA Section */}
      <CTA 
        theme={theme}
        showWave={true}
        variant="wide"
        heading="Ready to Transform Your Data?"
        subheader="Join leading enterprises using TextQL to unlock insights and drive value from their data today"
      />
    </div>
  );
}