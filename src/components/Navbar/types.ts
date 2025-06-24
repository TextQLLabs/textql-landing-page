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
    label: 'Workflows',
    megaMenu: {
      sections: [
        {
          title: 'Browse Workflows',
          items: [
            {
              label: 'All Workflows',
              description: '',
              href: '/workflows',
              icon: 'GitMerge'
            },
            {
              label: 'Banking',
              description: '',
              href: '/workflows?industry=banking',
              icon: 'Building2'
            },
            {
              label: 'Healthcare',
              description: '',
              href: '/workflows?industry=healthcare',
              icon: 'Heart'
            },
            {
              label: 'Insurance',
              description: '',
              href: '/workflows?industry=insurance',
              icon: 'Shield'
            }
          ]
        },
        {
          title: '',
          items: [
            {
              label: 'Manufacturing',
              description: '',
              href: '/workflows?industry=manufacturing',
              icon: 'Factory'
            },
            {
              label: 'Media',
              description: '',
              href: '/workflows?industry=media',
              icon: 'Newspaper'
            },
            {
              label: 'Retail',
              description: '',
              href: '/workflows?industry=retail',
              icon: 'Building2'
            }
          ]
        }
      ]
    }
  },
  {
    label: 'Integrations',
    megaMenu: {
      sections: [
        {
          title: 'Browse Integrations',
          items: [
            {
              label: 'All Integrations',
              description: '',
              href: '/integrations',
              icon: 'Grid'
            },
            {
              label: 'Databricks MCP',
              description: '',
              href: '/integrations/databricks',
              icon: '/images/navbar/databricks.png'
            },
            {
              label: 'Snowflake MCP',
              description: '',
              href: '/integrations/snowflake',
              icon: '/images/navbar/snowflake.png'
            },
            {
              label: 'Tableau MCP',
              description: '',
              href: '/integrations/tableau',
              icon: '/images/navbar/tableau.png'
            }
          ]
        }
      ],
      featuredImage: {
        sectionTitle: 'FEATURED',
        src: '/images/navbar/textql-tableau.png',
        alt: 'TextQL Tableau Integration',
        title: 'Tableau Integration',
        description: 'Seamless integration with Tableau for enhanced data visualization',
        href: '/blog/tableau-integration',
        external: false
      }
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
              description: '',
              href: '/careers',
              icon: 'Briefcase'
            },
            {
              label: 'Mission',
              description: '',
              href: '/about',
              icon: 'Target'
            },
            {
              label: 'Team',
              description: '',
              href: '/team',
              icon: 'Users'
            }
          ]
        }
      ],
      featuredImage: {
        sectionTitle: 'FEATURED',
        src: '/images/navbar/ana-small.png',
        alt: 'Building Data Agent',
        title: 'Ana Small',
        description: 'Open-sourcing state of the art Text-to-SQL',
        href: '/blog/ana-small',
        external: false
      }
    }
  },
  {
    label: 'Pricing',
    href: '/pricing'
  },
];
