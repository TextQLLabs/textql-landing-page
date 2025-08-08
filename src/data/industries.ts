import { Building2, Zap, Heart, Shield, Factory, Radio, Newspaper, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Industry {
  id: string;
  name: string;
  Icon: LucideIcon;
  customHeadline?: string;
  customDescription?: string;
}

export const industries: Industry[] = [
  {
    id: 'banking',
    name: 'Banking',
    Icon: Building2,
    customHeadline: 'Finally, Banking Analytics That Transforms Data Silos into Strategic Advantages',
    customDescription: 'Connect core banking, CRM, risk systems, and regulatory data into one intelligent platform that answers questions instantly.'
  },
  {
    id: 'energy',
    name: 'Energy',
    Icon: Zap,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    Icon: Heart,
    customHeadline: 'Thousands of AI agents uncovering hidden revenue while reducing patient safety risks.',
    customDescription: 'TextQL is leading provider of Agentic Analytics, enabling enterprises with highly secure and siloed data environments to deploy 10,000s of agents to surface insights 24/7.'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    Icon: Shield,
    customHeadline: 'From Claims to Compliance: AI-Powered Analytics for Modern Insurance.',
    customDescription: 'Streamline operations with natural language data queries and automated reporting.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    Icon: Factory,
    customHeadline: 'AI Agents Transform Siloed Manufacturing Data Into Operational Excellence.',
    customDescription: 'Query production, quality, and supply chain data using natural language.'
  },
  {
    id: 'media',
    name: 'Media',
    Icon: Newspaper,
    customHeadline: 'From Content Creation to Monetization: Agentic Analytics for Modern Media',
    customDescription: 'Thousands of AI agents unlock hidden monetization turning content into media revenue pipeline.'
  },
  {
    id: 'retail',
    name: 'Retail',
    Icon: Building2,
    customHeadline: 'Thousands of AI Agents Turn Data Chaos to Retail Clarity in Seconds',
    customDescription: 'TextQL transforms complex retail data into clear answers with SQL-powered answers that boost sales, optimize inventory, and delight customers.'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    Icon: Truck,
  },
  {
    id: 'telecom',
    name: 'Telecom',
    Icon: Radio,
  }
];