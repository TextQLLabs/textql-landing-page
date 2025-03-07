import { Link } from 'react-router-dom';
import { TextLogo, IconLogo } from './Logo';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Agents', href: '/agents' },
      { label: 'Ontology', href: '/ontology' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Workflows', href: '/workflows' }
    ]
  },
  workflows: {
    title: 'Popular Workflows',
    links: [
      { label: 'Digital Banking Transformation', href: '/workflows/digital-banking' },
      { label: 'Fraud Prevention & Detection', href: '/workflows/fraud-prevention' },
      { label: 'Customer Loyalty Optimization', href: '/workflows/customer-loyalty' },
      { label: 'Predictive Maintenance', href: '/workflows/predictive-maintenance' },
      { label: 'Supply Chain Optimization', href: '/workflows/supply-chain' },
      { label: 'Patient Care Enhancement', href: '/workflows/patient-care' },
      { label: 'Content Performance Optimization', href: '/workflows/content-performance' },
      { label: 'Risk Assessment & Pricing', href: '/workflows/risk-assessment' },
      { label: 'Production Efficiency', href: '/workflows/production-efficiency' },
      { label: 'Digital Health Transformation', href: '/workflows/digital-health' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Docs', href: 'https://docs.textql.com', external: true },
      { label: 'Terms & conditions', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' }
    ]
  },
  contact: {
    title: 'Contact',
    links: [
      { 
        label: 'Get a Demo', 
        href: '/demo'
      },
      { label: 'Email', href: 'mailto:ethan@textql.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/textql' },
      { label: 'X / Twitter', href: 'https://twitter.com/textql' }
    ]
  }
};

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white relative overflow-hidden">
      {/* Giant Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] opacity-[0.02]">
          <IconLogo />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full">
        {/* Links Section */}
        <div className="w-full border-b border-white/10">
          <div className="mx-auto max-w-site px-6 py-12">
            {/* Logo and Description */}
            <div className="mb-12">
              <a href="/" className="inline-block">
                <IconLogo className="h-12 w-12 text-[#B8D8D0]" />
              </a>
              <p className="mt-4 text-sm text-white/60 max-w-md">
                TextQL helps enterprises unlock the full potential of their data with AI-powered insights and automation.
              </p>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)] gap-8">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key}>
                  <h3 className="text-sm font-medium text-white/60 mb-4">
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
                            className="text-sm text-white hover:text-white/80 transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-sm text-white hover:text-white/80 transition-colors"
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
                <span className="text-sm text-white/60">
                  © Copyright {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant TextQL Logo */}
        <div className="w-full border-t border-white/10">
          <div className="mx-auto max-w-site px-6 py-24">
            <TextLogo className="w-full max-w-[800px] mx-auto opacity-[0.03]" />
          </div>
        </div>
      </div>
    </footer>
  );
}