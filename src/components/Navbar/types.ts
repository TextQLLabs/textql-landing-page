import type { LucideIcon } from 'lucide-react';
import { industries } from '../../data/industries';
import { m } from 'framer-motion';

export interface NavSubItem {
  label: string;
  description?: string;
  href: string;
  external?: boolean;
  icon?: keyof typeof import('lucide-react') | string;
}

export interface NavSection {
  title: string;
  items: NavSubItem[];
}

export interface NavMenuContent {
  sections?: NavSection[];
  featuredImage?: {
    src: string;
    alt: string;
    title: string;
    description: string;
    href: string;
    external?: boolean;
    sectionTitle?: string;
  };
}

export interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavSubItem[];
  megaMenu?: NavMenuContent;
  icon?: keyof typeof import('lucide-react') | string;
  textColor?: string;
}

export const navigation: NavItem[] = [
  {
    label: 'Product',
    megaMenu: {
      sections: [
        {
          title: 'Product',
          items: [
            {
              label: 'Agents',
              description: 'Deep research on your structured data.',
              href: '/agents',
              icon: 'Bot'
            },
            {
              label: 'Ontology',
              description: 'Best-in-class semantic layer.',
              href: '/ontology',
              icon: 'Network'
            },
            {
              label: 'Enterprise',
              description: 'Resilience, scalability, and security',
              href: '/enterprise',
              icon: 'Building'
            },
            {
              label: 'Ana Small',
              description: 'Free, open-source text-to-SQL',
              href: 'https://small.textql.com/',
              external: true,
              icon: 'Zap'
            }
          ]
        },
        {
          title: 'Integrations',
          items: [
            {
              label: 'All Integrations',
              description: 'Browse all available integrations',
              href: '/integrations',
              icon: 'Grid'
            },
            {
              label: 'Databricks MCP',
              description: 'Native Databricks integration',
              href: '/integrations/databricks',
              icon: '/images/navbar/databricks.png'
            },
            {
              label: 'Snowflake MCP',
              description: 'Connect to Snowflake warehouses',
              href: '/integrations/snowflake',
              icon: '/images/navbar/snowflake.png'
            },
            {
              label: 'Tableau MCP',
              description: 'Enhanced visualization with Tableau',
              href: '/integrations/tableau',
              icon: '/images/navbar/tableau.png'
            }
          ]
        }
      ],
      featuredImage: {
        sectionTitle: 'FEATURED',
        src: '/images/blog/building-data-agent/header.png',
        alt: 'Building Data Agent',
        title: 'Ten-Year Thesis',
        description: 'Our vision for the future of data.',
        href: '/blog/ten-year-thesis',
        external: false
      }
    }
  },
  {
    label: 'Solutions',
    megaMenu: {
      sections: [
        {
          title: 'Featured Solutions',
          items: [
            {
              label: 'All Solutions',
              description: 'Browse our complete library of industry solutions',
              href: '/solutions',
              icon: 'GitMerge'
            },
            {
              label: 'Digital Banking',
              description: 'Transform traditional banking into seamless digital experiences',
              href: '/solutions/digital-banking',
              icon: 'Smartphone'
            },
            {
              label: 'Predictive Maintenance',
              description: 'Maximize equipment reliability with IoT-powered predictions',
              href: '/solutions/predictive-maintenance',
              icon: 'Wrench'
            },
            {
              label: 'Fraud Prevention',
              description: 'Advanced AI-powered fraud detection and prevention',
              href: '/solutions/fraud-prevention',
              icon: 'Shield'
            }
          ]
        },
        {
          title: 'By Industry',
          items: [
            {
              label: 'Banking & Finance',
              description: 'Digital transformation, fraud prevention, personalization',
              href: '/solutions?industry=banking',
              icon: 'Building2'
            },
            {
              label: 'Healthcare',
              description: 'Patient care optimization, operational efficiency',
              href: '/solutions?industry=healthcare',
              icon: 'Heart'
            },
            {
              label: 'Manufacturing',
              description: 'Predictive maintenance, quality control, efficiency',
              href: '/solutions?industry=manufacturing',
              icon: 'Factory'
            },
            {
              label: 'Insurance',
              description: 'Claims optimization, risk assessment, automation',
              href: '/solutions?industry=insurance',
              icon: 'Shield'
            },
            {
              label: 'Retail & E-commerce',
              description: 'Customer loyalty, inventory optimization, personalization',
              href: '/solutions?industry=retail',
              icon: 'ShoppingCart'
            },
            {
              label: 'Media & Entertainment',
              description: 'Content performance, audience engagement, optimization',
              href: '/solutions?industry=media',
              icon: 'Newspaper'
            }
          ]
        }
      ]
    }
  },
  {
    label: 'Resources',
    megaMenu: {
      sections: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Blog',
              description: 'Latest news and updates',
              href: '/blog',
              icon: 'BookOpen'
            },
            {
              label: 'Data Assessment',
              description: 'Free enterprise data analysis',
              href: '/data-assessment',
              icon: 'BarChart3'
            },
            {
              label: 'Whitepaper',
              description: 'Technical documentation',
              href: '/whitepaper',
              icon: 'FileText'
            },
            {
              label: 'Documentation',
              description: 'API and usage guides',
              href: 'https://docs.textql.com',
              external: true,
              icon: 'FileCode'
            }
          ]
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Careers',
              description: 'Join our team building the future of data intelligence',
              href: '/careers',
              icon: 'Briefcase'
            },
            {
              label: 'Mission',
              description: 'Our vision to democratize data through natural language',
              href: '/about',
              icon: 'Target'
            },
          ]
        }
      ],
      featuredImage: {
        sectionTitle: 'FEATURED',
        src: '/images/blog/big-data/header.png',
        alt: 'Making AI That Can Process 1,000,000x More Data',
        title: 'Making AI That Can Process 1,000,000x More Data',
        description: 'Your AI can analyze 1GB of data. Your enterprise has 1,000,000 times that.',
        href: '/blog/big-data',
        external: false
      }
    }
  },
  {
    label: 'Pricing',
    href: '/pricing'
  },
];

// Add Customers section only in development
if (import.meta.env.DEV) {
  // Find the index where we want to insert (after Solutions, before Resources)
  const resourcesIndex = navigation.findIndex(item => item.label === 'Resources');
  navigation.splice(resourcesIndex, 0, {
    label: 'Customers',
    href: '/customers'
  });
}
