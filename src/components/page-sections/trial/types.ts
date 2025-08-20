/**
 * Trial Page Types
 * 
 * TypeScript type definitions for trial-specific components and functionality.
 */

// Common theme prop that trial components might use
export interface TrialComponentProps {
  theme?: 'light' | 'dark';
  className?: string;
}

// Trial-specific types
export interface TrialStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TrialFormData {
  email: string;
  company: string;
  useCase: string;
  dataSize: 'small' | 'medium' | 'large' | 'enterprise';
}

export interface TrialFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  available: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
