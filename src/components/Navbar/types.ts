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
}

export const navigation: NavItem[] = [
  {
    label: 'Agents',
    href: '/agents'
  },
  {
    label: 'Ontology',
    href: '/ontology'
  },
  {
    label: 'Integrations',
    href: '/integrations'
  },
  {
    label: 'Enterprise',
    href: '/enterprise'
  },
  {
    label: 'Pricing',
    href: '/pricing'
  },
  {
    label: 'Workflows',
    href: '/workflows'
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        description: 'Latest updates and technical articles',
        href: '/blog'
      },
      {
        label: 'Events',
        description: 'Meet our team and learn about TextQL in person',
        href: '/events'
      },
      {
        label: 'Benchmark',
        description: 'See how TextQL compares to other solutions',
        href: '/benchmark'
      },
      {
        label: 'Documentation',
        description: 'Learn how to integrate and use TextQL',
        href: 'https://docs.textql.com',
        external: true
      },
      {
        label: 'About',
        description: 'Learn about our mission and team',
        href: '/about'
      }
    ]
  }
];