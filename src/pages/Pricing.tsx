import { 
  PricingHeader,
  PricingPlansSection
} from '../components/page-sections/pricing';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to Transform Your Data?"
        subheader="Join leading enterprises using TextQL to unlock insights and drive value from their data today"
      />
    </div>
  );
}