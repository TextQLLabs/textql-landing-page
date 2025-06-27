import { Text } from '../components/ui';
import { PrivacyHeader, TermlyPolicy } from '../components/page-sections/legal';
import { SEO } from '../components/SEO';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <SEO 
        title="Privacy Policy | TextQL"
        description="Privacy policy for TextQL services. Learn how we collect, use, and protect your data."
        canonical="https://textql.com/privacy/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <PrivacyHeader />

      {/* Termly Policy Content */}
      <div className="w-full">
        <TermlyPolicy />
      </div>
    </div>
  );
}