/**
 * Style Constants
 * Centralized location for all style-related constants and design tokens
 * that extend beyond what's defined in Tailwind config
 */

// ===== SPACING CONSTANTS =====
export const SPACING = {
  // Component spacing
  navbarHeight: 60,
  sectionPaddingY: 80,
  containerPadding: 24,
  cardPadding: 32,
  buttonPadding: {
    x: 24,
    y: 12,
  },
  
  // Layout spacing
  gridGap: 24,
  stackGap: 16,
  inlineGap: 8,
  
  // Responsive spacing multipliers
  mobile: 0.75,
  tablet: 0.875,
  desktop: 1,
} as const;

// ===== TYPOGRAPHY CONSTANTS =====
export const TYPOGRAPHY = {
  // Font families (extending Tailwind)
  fontFamilies: {
    display: '"Cal Sans", system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Cascadia Code", Consolas, monospace',
  },
  
  // Line heights
  lineHeights: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
} as const;

// ===== COLOR CONSTANTS =====
export const COLORS = {
  // Brand colors (hex values for dynamic use)
  brand: {
    mint: '#B8D8D0',
    sage: '#729E8C',
    forest: '#0A1F1C',
    deepForest: '#2A3B35',
  },
  
  // Semantic colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Alpha values for overlays
  alpha: {
    5: '0.05',
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
  },
} as const;

// ===== ANIMATION CONSTANTS =====
export const ANIMATIONS = {
  // Durations (ms)
  durations: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1000,
  },
  
  // Easings
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Spring animations
  springs: {
    soft: {
      stiffness: 100,
      damping: 10,
    },
    medium: {
      stiffness: 300,
      damping: 20,
    },
    stiff: {
      stiffness: 500,
      damping: 30,
    },
  },
} as const;

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

// ===== Z-INDEX SCALE =====
export const Z_INDEX = {
  behind: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  debug: 90,
  max: 99,
} as const;

// ===== SHADOWS =====
export const SHADOWS = {
  // Light mode shadows
  light: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Dark mode shadows
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  },
} as const;

// ===== BORDER RADIUS =====
export const RADIUS = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// ===== TRANSITIONS =====
const transitionProperties = {
  colors: 'background-color, border-color, color, fill, stroke',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
  all: 'all',
} as const;

export const TRANSITIONS = {
  // Transition properties
  properties: transitionProperties,
  
  // Preset transitions
  presets: {
    colors: `${transitionProperties.colors} ${ANIMATIONS.durations.normal}ms ${ANIMATIONS.easings.easeInOut}`,
    fade: `opacity ${ANIMATIONS.durations.normal}ms ${ANIMATIONS.easings.easeInOut}`,
    scale: `transform ${ANIMATIONS.durations.normal}ms ${ANIMATIONS.easings.easeOut}`,
    slide: `transform ${ANIMATIONS.durations.normal}ms ${ANIMATIONS.easings.easeOut}, opacity ${ANIMATIONS.durations.fast}ms ${ANIMATIONS.easings.easeIn}`,
  },
} as const;

// ===== UTILITY FUNCTIONS =====

/**
 * Convert pixel value to rem
 */
export const pxToRem = (px: number, base: number = 16): string => {
  return `${px / base}rem`;
};

/**
 * Get responsive value based on breakpoint
 */
export const getResponsiveValue = <T>(
  values: { base: T; sm?: T; md?: T; lg?: T; xl?: T },
  breakpoint: keyof typeof BREAKPOINTS
): T => {
  const breakpointOrder = ['base', 'sm', 'md', 'lg', 'xl'] as const;
  const currentIndex = breakpointOrder.indexOf(breakpoint as any);
  
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp in values && values[bp as keyof typeof values] !== undefined) {
      return values[bp as keyof typeof values] as T;
    }
  }
  
  return values.base;
};

/**
 * Generate CSS custom properties from constants
 */
export const generateCSSVariables = (prefix: string, obj: Record<string, any>): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  const traverse = (current: any, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      const varPath = [...path, key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        traverse(value, varPath);
      } else {
        const varName = `--${prefix}-${varPath.join('-')}`;
        cssVars[varName] = String(value);
      }
    });
  };
  
  traverse(obj);
  return cssVars;
};

// Export type definitions
export type SpacingKey = keyof typeof SPACING;
export type ColorKey = keyof typeof COLORS.brand | keyof typeof COLORS.semantic;
export type AnimationDuration = keyof typeof ANIMATIONS.durations;
export type AnimationEasing = keyof typeof ANIMATIONS.easings;
export type Breakpoint = keyof typeof BREAKPOINTS;
export type ZIndexKey = keyof typeof Z_INDEX;