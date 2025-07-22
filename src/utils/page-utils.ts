/**
 * Page-Level Utilities
 * 
 * This module provides utilities for common page-level patterns including:
 * - Dynamic content styling
 * - Background image handling
 * - Responsive typography
 * - Fixed positioning helpers
 * - Dynamic metric displays
 * 
 * These utilities help eliminate inline styles for dynamic content on pages.
 */

import { ThemeMode } from './theme-utils';
import { SPACING, TYPOGRAPHY } from '../styles/constants';

// ===== DYNAMIC BACKGROUND UTILITIES =====

/**
 * Generate data attributes for background images
 * Use with CSS to apply background images without inline styles
 */
export const getBackgroundImageAttrs = (imageUrl: string) => ({
  'data-bg-image': imageUrl,
  'data-bg-position': 'center',
  'data-bg-size': 'cover',
});

/**
 * Get overlay gradient classes for images
 * Provides consistent gradients for image overlays
 */
export const getImageOverlayClasses = (variant: 'light' | 'medium' | 'heavy' = 'medium', theme?: ThemeMode) => {
  const variants = {
    light: 'bg-gradient-to-br from-black/20 to-black/30',
    medium: 'bg-gradient-to-br from-black/30 to-black/50',
    heavy: 'bg-gradient-to-br from-black/50 to-black/70',
  };
  
  // Theme-aware variants
  if (theme === 'light') {
    return {
      light: 'bg-gradient-to-br from-white/20 to-white/30',
      medium: 'bg-gradient-to-br from-white/30 to-white/50',
      heavy: 'bg-gradient-to-br from-white/50 to-white/70',
    }[variant];
  }
  
  return variants[variant];
};

// ===== RESPONSIVE TYPOGRAPHY UTILITIES =====

/**
 * Calculate responsive font size based on container width
 * Returns CSS custom property that can be used with var()
 */
export const getResponsiveFontSize = (
  minSize: number,
  maxSize: number,
  minWidth: number = 320,
  maxWidth: number = 1920
) => {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const intercept = minSize - slope * minWidth;
  
  return {
    '--font-size-responsive': `clamp(${minSize}px, ${intercept}px + ${slope * 100}vw, ${maxSize}px)`,
  };
};

/**
 * Get dynamic title classes that scale with viewport
 * Replaces the need for JavaScript-calculated font sizes
 */
export const getDynamicTitleClasses = (variant: 'hero' | 'page' | 'section' = 'page') => {
  const variants = {
    hero: 'text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tighter',
    page: 'text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-tight',
    section: 'text-[clamp(1.5rem,4vw,3rem)] leading-[1.1] tracking-tight',
  };
  
  return variants[variant];
};

// ===== FIXED POSITIONING UTILITIES =====

/**
 * Get viewport-aware positioning classes
 * Accounts for navbar and other fixed elements
 */
export const getViewportPositioning = (options: {
  includeNavbar?: boolean;
  fullHeight?: boolean;
  position?: 'fixed' | 'sticky' | 'absolute';
} = {}) => {
  const {
    includeNavbar = true,
    fullHeight = true,
    position = 'fixed',
  } = options;
  
  const classes = [position];
  
  if (includeNavbar) {
    classes.push(`top-[${SPACING.navbarHeight}px]`);
    if (fullHeight) {
      classes.push(`h-[calc(100vh-${SPACING.navbarHeight}px)]`);
    }
  } else {
    classes.push('top-0');
    if (fullHeight) {
      classes.push('h-screen');
    }
  }
  
  return classes.join(' ');
};

// ===== DYNAMIC METRIC DISPLAYS =====

/**
 * Get classes for large metric displays
 * Used for customer stories, case studies, etc.
 */
export const getMetricDisplayClasses = (size: 'sm' | 'md' | 'lg' | 'xl' = 'lg') => {
  const sizes = {
    sm: {
      value: 'text-3xl sm:text-4xl font-light',
      label: 'text-sm sm:text-base mt-1',
    },
    md: {
      value: 'text-4xl sm:text-5xl font-light',
      label: 'text-base sm:text-lg mt-2',
    },
    lg: {
      value: 'text-5xl sm:text-6xl lg:text-7xl font-light',
      label: 'text-lg sm:text-xl mt-2',
    },
    xl: {
      value: 'text-6xl sm:text-7xl lg:text-8xl font-light',
      label: 'text-xl sm:text-2xl mt-3',
    },
  };
  
  return sizes[size];
};

// ===== LOGO FILTER UTILITIES =====

/**
 * Get filter classes for logos based on background
 * Eliminates need for inline filter styles
 */
export const getLogoFilterClass = (background: 'light' | 'dark' | 'auto', currentTheme?: ThemeMode) => {
  if (background === 'auto' && currentTheme) {
    background = currentTheme === 'light' ? 'dark' : 'light';
  }
  
  // Using CSS module classes from filters.module.css
  return background === 'light' ? 'filter-dark-logo' : 'filter-light-logo';
};

// ===== CARD GRID UTILITIES =====

/**
 * Get responsive grid classes for card layouts
 * Standardizes grid patterns across pages
 */
export const getCardGridClasses = (columns: {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
} = {}) => {
  const {
    base = 1,
    sm = 2,
    md = 2,
    lg = 3,
    xl = 4,
  } = columns;
  
  return [
    `grid`,
    `grid-cols-${base}`,
    sm && `sm:grid-cols-${sm}`,
    md && `md:grid-cols-${md}`,
    lg && `lg:grid-cols-${lg}`,
    xl && `xl:grid-cols-${xl}`,
    'gap-4 sm:gap-6 lg:gap-8',
  ].filter(Boolean).join(' ');
};

// ===== DYNAMIC CONTENT CONTAINERS =====

/**
 * Get container classes for dynamic content sections
 * Provides consistent spacing and max-widths
 */
export const getDynamicContainerClasses = (variant: 'narrow' | 'medium' | 'wide' | 'full' = 'medium') => {
  const variants = {
    narrow: 'max-w-3xl mx-auto px-4 sm:px-6',
    medium: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    full: 'w-full px-4 sm:px-6 lg:px-8',
  };
  
  return variants[variant];
};

// ===== ANIMATION UTILITIES =====

/**
 * Get scroll-triggered animation classes
 * For dynamic content that animates on scroll
 */
export const getScrollAnimationClasses = (
  animation: 'fadeIn' | 'slideUp' | 'scaleIn' = 'fadeIn',
  delay: number = 0
) => {
  const animations = {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    scaleIn: 'animate-scaleIn',
  };
  
  return {
    className: `${animations[animation]} opacity-0`,
    style: {
      '--animation-delay': `${delay}ms`,
    },
  };
};

// ===== ASPECT RATIO UTILITIES =====

/**
 * Get aspect ratio container classes
 * For responsive images and videos
 */
export const getAspectRatioClasses = (ratio: '1:1' | '4:3' | '16:9' | '21:9' = '16:9') => {
  const ratios = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-4/3',
    '16:9': 'aspect-video',
    '21:9': 'aspect-[21/9]',
  };
  
  return `relative overflow-hidden ${ratios[ratio]}`;
};

// ===== UTILITY HELPERS =====

/**
 * Convert inline styles to data attributes
 * Helps migrate from style props to data-* attributes
 */
export const stylesToDataAttrs = (styles: Record<string, any>): Record<string, string> => {
  const attrs: Record<string, string> = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const attrName = `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    attrs[attrName] = String(value);
  });
  
  return attrs;
};

/**
 * Generate CSS custom properties from dynamic values
 * Use when you need truly dynamic values that can't be predefined
 */
export const generateCSSVars = (vars: Record<string, string | number>): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  Object.entries(vars).forEach(([key, value]) => {
    const varName = key.startsWith('--') ? key : `--${key}`;
    cssVars[varName] = typeof value === 'number' ? `${value}px` : value;
  });
  
  return cssVars;
};

// ===== EVENT PAGE UTILITIES =====

/**
 * Get consistent styling for event page headers
 */
export const getEventHeaderClasses = () => {
  return {
    container: 'relative overflow-hidden bg-black text-white',
    content: 'relative z-10 py-16 md:py-24',
    title: getDynamicTitleClasses('hero'),
    subtitle: 'text-xl sm:text-2xl lg:text-3xl opacity-90 mt-4',
    logoContainer: 'flex items-center gap-4 sm:gap-6 mt-8',
  };
};

/**
 * Get consistent styling for event page sections
 */
export const getEventSectionClasses = (variant: 'primary' | 'secondary' = 'primary') => {
  const variants = {
    primary: 'py-16 md:py-24 bg-white text-gray-900',
    secondary: 'py-16 md:py-24 bg-gray-50 text-gray-900',
  };
  
  return variants[variant];
};