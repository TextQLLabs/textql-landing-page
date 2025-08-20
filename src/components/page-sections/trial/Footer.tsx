import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Conversation", href: "/conversation" },
      { name: "Business Intelligence", href: "/business-intelligence" },
      { name: "Metadata Integrations", href: "/metadata-integrations" },
      { name: "AI", href: "/ai" },
      { name: "Embedded Analyst", href: "/embedded-analyst" },
    ],
  },
  {
    title: "Solutions for Industries",
    links: [
      { name: "Marketing Analytics", href: "/marketing-analytics" },
      { name: "Manufacturing & Industrials", href: "/manufacturing" },
      { name: "Media, Telecom & Entertainment", href: "/media-telecom" },
      { name: "Retail, Logistics & CPG", href: "/retail-logistics" },
      { name: "Healthcare", href: "/healthcare" },
    ],
  },
  {
    title: "Solutions for Teams",
    links: [
      { name: "Data Teams", href: "/data-teams" },
      { name: "Marketing Teams", href: "/marketing-teams" },
      { name: "Product Teams", href: "/product-teams" },
      { name: "Revenue Teams", href: "/revenue-teams" },
      { name: "Finance Teams", href: "/finance-teams" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export default function Footer() {
  return (
    <footer style={{backgroundColor: 'var(--theme-bg-dark)', color: 'var(--theme-text-dark)'}}>
      <div className="w-full px-12 pb-24">
        <div className="flex flex-col pt-12 pr-12 pb-6 md:flex-row md:flex-wrap md:justify-between">
          {/* Brand Section */}
          <div>
            <Link to="/">
              <img
                src="/images/LogoWordmark-white.svg"
                alt="TextQL"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-xs font-medium pt-4 pb-8 md:basis-full" style={{color: 'var(--theme-text-dark)', opacity: 0.6}}>
              © 2025 TextQL. All rights reserved.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="flex basis-full flex-wrap gap-20 gap-y-16 pt-12 md:pt-0 lg:basis-auto xl:gap-24">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-8">
                <h3 className="text-sm font-display font-medium uppercase tracking-wider" style={{color: 'var(--theme-text-dark)', opacity: 0.6}}>
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm font-normal hover:opacity-80 transition-opacity"
                        style={{color: 'var(--theme-text-dark)'}}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect Section with Social Links */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xs font-display font-semibold uppercase tracking-wider" style={{color: 'var(--theme-text-dark)', opacity: 0.6}}>Connect</h3>
              <ul className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:opacity-80 transition-opacity"
                      style={{color: 'var(--theme-text-dark)'}}
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Links */}
        <div className="border-t pt-8 flex gap-8" style={{borderColor: 'var(--theme-text-dark)', opacity: 0.1}}>
          <Link 
            to="/privacy" 
            className="text-sm hover:opacity-80 transition-opacity"
            style={{color: 'var(--theme-text-dark)', opacity: 0.6}}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-sm hover:opacity-80 transition-opacity"
            style={{color: 'var(--theme-text-dark)', opacity: 0.6}}
          >
            Terms of Service
          </Link>
          <Link 
            to="/cookies" 
            className="text-sm hover:opacity-80 transition-opacity"
            style={{color: 'var(--theme-text-dark)', opacity: 0.6}}
          >
            Consent Preferences
          </Link>
        </div>
      </div>
    </footer>
  );
}
