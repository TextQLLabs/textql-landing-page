export interface BusinessObject {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon;
}

export interface OntologyConfig {
  interactive?: boolean;
  opacity?: {
    mesh?: {
      default: number;
      front: number;
      back: number;
    };
    lines?: {
      default: number;
      front: number;
      back: number;
    };
    labels?: {
      visible: number;
      hidden: number;
    };
  };
}