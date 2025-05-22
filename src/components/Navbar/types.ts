import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: {
    label: string;
    description?: string;
    href: string;
    external?: boolean;
  }[];
  icon?: string;
  textColor?: string;
}

export const navigation: NavItem[] = [
  {
    label: 'Product',
    children: [
      {
        label: 'Agents',
        href: '/agents'
      },
      {
        label: 'Ontology',
        href: '/ontology'
      },
      {
        label: 'Enterprise',
        href: '/enterprise'
      },
      {
        label: 'Workflows',
        href: '/workflows'
      }
    ]
  },
    {
    label: 'Integrations',
 children: [
      {
        label: 'Tableau MCP',
        href: '/integrations/tableau-mcp'
      },
      // {
      //   label: 'Snowflake MCP',
      //   href: '/integrations/snowflake-mcp'
      // }
      ]
    }, 
  {
    label: 'Pricing',
    href: '/pricing'
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        href: '/blog'
      },
      {
        label: 'Whitepaper',
        href: '/whitepaper'
      },
      {
        label: 'Documentation',
        href: 'https://docs.textql.com',
        external: true
      },
      {
        label: 'Careers',
        href: '/careers'
      }
    ]
  },
  {
    label: 'About',
    children: [
      {
        label: 'Mission',
        href: '/about'
      },
      {
        label: 'Team',
        href: '/team'
      }
    ]
  }
];
