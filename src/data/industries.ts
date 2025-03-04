import { Building2, Zap, Heart, Shield, Factory, Radio, Newspaper, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Industry {
  id: string;
  name: string;
  Icon: LucideIcon;
}

export const industries: Industry[] = [
  {
    id: 'banking',
    name: 'Banking',
    Icon: Building2,
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
  },
  {
    id: 'insurance',
    name: 'Insurance',
    Icon: Shield,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    Icon: Factory,
  },
  {
    id: 'media',
    name: 'Media',
    Icon: Newspaper,
  },
  {
    id: 'retail',
    name: 'Retail',
    Icon: Building2,
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