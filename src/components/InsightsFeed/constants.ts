import { type Industry } from '../../types/insights';
import { 
  Building2, 
  HeartPulse, 
  Factory, 
  TrendingUp 
} from 'lucide-react';

export const INDUSTRIES: Industry[] = [
  { id: 'finance', label: 'Finance', icon: TrendingUp },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'retail', label: 'Retail', icon: Building2 },
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory },
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