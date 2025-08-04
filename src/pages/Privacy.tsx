import { Text } from '../components/ui';
import { PrivacyHeader, TermlyPolicy } from '../components/page-sections/legal';
import { TermlyConsentPreferences } from '../components';
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

      {/* Consent Preferences Link */}
      <div className="w-full bg-white border-t border-gray-200">
        <div className="mx-auto max-w-site px-6 py-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Manage Your Privacy Preferences
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You can change your consent preferences at any time by clicking the link below. 
              This will open our preference center where you can manage your privacy settings.
            </p>
            <TermlyConsentPreferences className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Update Consent Preferences
            </TermlyConsentPreferences>
          </div>
        </div>
      </div>
    </div>
  );
}