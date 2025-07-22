/**
 * Styles Module Index
 * Central export point for all style-related modules and constants
 */

// Export style constants
export * from './constants';

// Export design system tokens
export * from './design-system';

// Export CSS module classes
// Note: CSS modules are imported directly in components that need them
// This export is for TypeScript type definitions if needed

// CSS Module type definitions
export interface AnimationClasses {
  fadeIn: string;
  fadeOut: string;
  slideInRight: string;
  slideInLeft: string;
  scaleIn: string;
  pulse: string;
  wave: string;
  waveReverse: string;
  rotate: string;
  rotateY: string;
  shimmer: string;
  bounce: string;
  staggerChildren: string;
  hoverFloat: string;
  hoverScale: string;
}

export interface FilterClasses {
  logoFilterLight: string;
  logoFilterDark: string;
  grayscaleHover: string;
  blurLight: string;
  blurDark: string;
  glassMorphism: string;
  glassMorphismDark: string;
  imageOverlay: string;
  imageOverlayLight: string;
  duotone: string;
  duotoneLight: string;
  brighten: string;
  darken: string;
  svgFilter: string;
  glowLight: string;
  glowDark: string;
  colorShift: string;
  noiseTexture: string;
}

// Helper to get CSS module classes with type safety
export const getCSSModuleClasses = <T extends Record<string, string>>(
  module: T,
  classNames: (keyof T)[]
): string => {
  return classNames
    .map(className => module[className])
    .filter(Boolean)
    .join(' ');
};

// Re-export commonly used style utilities
export { pxToRem, getResponsiveValue, generateCSSVariables } from './constants';