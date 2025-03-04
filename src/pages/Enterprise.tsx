import { 
  EnterpriseHero, 
  EnterpriseFeatureGrid1, 
  EnterpriseFeatureGrid2 
} from '../components/page-sections/enterprise';
import { CTA } from '../components/sections';
import { SEO } from '../components/SEO';

export default function Enterprise() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Enterprise | TextQL"
        description="Enterprise-grade security and deployment options for TextQL. Deploy in your own cloud with complete control and data sovereignty."
        canonical="https://textql.com/enterprise"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <EnterpriseHero />

      {/* Security Features - Light Mode */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-24">
          <EnterpriseFeatureGrid1 theme="light" />
        </div>
      </section>

      {/* Compliance - Light Mode */}
      <section className="bg-[#F0F5F3]">
        <div className="mx-auto max-w-site px-6 py-24">
          <EnterpriseFeatureGrid2 theme="light" />
        </div>
      </section>

      {/* CTA Section - Dark */}
      <CTA 
        heading="Deploy TextQL in Your Cloud Today"
        subheader="Get started with enterprise-grade security and scalability"
        theme="dark"
        showWave={true}
        variant="wide"
      />
    </div>
  );
}