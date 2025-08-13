import { Link } from 'react-router-dom';
import { TextLogo, IconLogo } from './Logo';
import { TermlyConsentPreferences } from './index';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeText, themeTextSecondary } from '../utils/theme-utils';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Agents', href: '/agents' },
      { label: 'Ontology', href: '/ontology' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Ana Small', href: 'https://small.textql.com/', external: true },
    ]
  },
  workflows: {
    title: 'Solutions',
    links: [
      { label: 'Digital Banking Transformation', href: '/solutions/digital-banking' },
      { label: 'Fraud Prevention & Detection', href: '/solutions/fraud-prevention' },
      { label: 'Customer Loyalty Optimization', href: '/solutions/customer-loyalty' },
      { label: 'Predictive Maintenance', href: '/solutions/predictive-maintenance' },
      { label: 'Supply Chain Optimization', href: '/solutions/supply-chain' },
      { label: 'Patient Care Enhancement', href: '/solutions/patient-care' },
      { label: 'Content Performance Optimization', href: '/solutions/content-performance' },
      { label: 'Risk Assessment & Pricing', href: '/solutions/risk-assessment' },
      { label: 'Production Efficiency', href: '/solutions/production-efficiency' },
      { label: 'Digital Health Transformation', href: '/solutions/digital-health' },
      { label: 'All Solutions', href: '/solutions' },
    ]
  },
  // integrations: {
  //   title: 'Popular Integrations',
  //   links: [
  //     { label: 'Databricks MCP', href: '/integrations/databricks' },
  //     { label: 'Snowflake MCP', href: '/integrations/snowflake' },
  //     { label: 'Tableau MCP', href: '/integrations/tableau' },
  //     { label: 'All Integrations', href: '/integrations' }
  //   ]
  // },
  company: {
    title: 'Resources',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Data Assessment', href: '/data-assessment' },
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'Documentation', href: 'https://docs.textql.com', external: true },
      { label: 'Careers', href: '/careers' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Terms & conditions', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Cookie policy', href: '/cookies' }
    ]
  },
  contact: {
    title: 'Contact',
    links: [
      { 
        label: 'Get a Demo', 
        href: '/demo'
      },
      { label: 'Email', href: 'mailto:support@textql.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/textql' },
      { label: 'X / Twitter', href: 'https://twitter.com/textql' }
    ]
  }
};

export default function Footer() {
  const theme = useComponentTheme();
  return (
    <footer className={`footer-section w-full ${themeBackgroundSecondary(theme)} ${themeText(theme)} relative overflow-hidden`}>
      {/* Giant Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] opacity-[0.02]">
          <IconLogo />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full">
        {/* Links Section */}
        <div className={`w-full border-b ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
          <div className="mx-auto max-w-site px-6 py-12">
            {/* Logo and Description */}
            {/* <div className="mb-12">
              <a href="/" className="inline-block">
                <IconLogo className="h-12 w-12 text-[#B8D8D0]" />
              </a>
              <p className="mt-4 text-sm text-white/60 max-w-md">
              </p>
            </div> */}

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)] gap-6">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key}>
                  <h3 className={`text-sm font-medium ${themeText(theme)} mb-4`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${themeTextSecondary(theme)} ${theme === 'light' ? 'hover:text-black/80' : 'hover:text-white/80'} transition-colors`}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className={`text-sm ${themeTextSecondary(theme)} ${theme === 'light' ? 'hover:text-black/80' : 'hover:text-white/80'} transition-colors`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full">
          <div className="mx-auto max-w-site px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <TextLogo className="h-6" />
                <span className={`text-sm ${themeTextSecondary(theme)}`}>
                  © Copyright {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <TermlyConsentPreferences 
                  className={`text-sm ${themeTextSecondary(theme)} ${theme === 'light' ? 'hover:text-black/80' : 'hover:text-white/80'} transition-colors underline`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}