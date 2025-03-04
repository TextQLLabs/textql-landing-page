import { type Industry } from '../../types/insights';
import { 
  Building2, 
  HeartPulse, 
  Building, 
  Factory, 
  Truck, 
  Film,
  Shield 
} from 'lucide-react';

export const INDUSTRIES: Industry[] = [
  { id: 'retail', label: 'Retail', icon: Building2 },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'banking', label: 'Banking', icon: Building },
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory },
  { id: 'supply-chain', label: 'Supply Chain', icon: Truck },
  { id: 'media', label: 'Media', icon: Film },
  { id: 'insurance', label: 'Insurance', icon: Shield },
] as const;

export const ANIMATION_VARIANTS = {
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  }
} as const;

export const CONTENT_VARIANTS = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 }
  },
  collapsed: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
} as const;