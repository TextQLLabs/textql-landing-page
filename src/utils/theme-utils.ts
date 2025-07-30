/**
 * Comprehensive Theme Utilities Module
 * 
 * This module provides a complete set of theme utility functions for consistent
 * theme-aware styling across the application. All functions return Tailwind
 * className strings ready for use.
 * 
 * Features:
 * - Dynamic class generators based on theme mode
 * - Comprehensive color mappings using our design tokens
 * - Support for complex styling patterns
 * - Type-safe theme utilities
 * 
 * @module theme-utils
 */

export type ThemeMode = 'light' | 'dark';

// ===== THEME CLASS MAPPINGS =====

/**
 * Get comprehensive theme classes for all common UI elements
 * This is the main function to use for getting all theme-specific classes
 */
export const getThemeClasses = (isLight: boolean) => ({
  // Background classes
  bgPrimary: isLight ? 'bg-light-300' : 'bg-dark-300',
  bgSecondary: isLight ? 'bg-white' : 'bg-black',
  bgMuted: isLight ? 'bg-light-200' : 'bg-dark-200',
  bgAccent: isLight ? 'bg-light-50' : 'bg-dark-50',
  bgHover: isLight ? 'hover:bg-light-200' : 'hover:bg-dark-200',
  bgActive: isLight ? 'bg-light-100' : 'bg-dark-100',
  
  // Text classes
  textPrimary: isLight ? 'text-light-50' : 'text-dark-50',
  textSecondary: isLight ? 'text-light-100' : 'text-dark-100',
  textMuted: isLight ? 'text-light-100/70' : 'text-dark-100/70',
  textAccent: isLight ? 'text-primary-700' : 'text-primary-300',
  textInverse: isLight ? 'text-white' : 'text-black',
  
  // Border classes
  borderDefault: isLight ? 'border-light-100/20' : 'border-dark-100/20',
  borderMuted: isLight ? 'border-light-100/10' : 'border-dark-100/10',
  borderAccent: isLight ? 'border-primary-700' : 'border-primary-300',
  borderHover: isLight ? 'hover:border-light-100/40' : 'hover:border-dark-100/40',
  
  // Shadow classes
  shadowDefault: isLight ? 'shadow-sm shadow-black/5' : 'shadow-lg shadow-black/20',
  shadowMd: isLight ? 'shadow-md shadow-black/10' : 'shadow-xl shadow-black/30',
  shadowLg: isLight ? 'shadow-lg shadow-black/15' : 'shadow-2xl shadow-black/40',
  
  // Component-specific classes
  cardBg: isLight ? 'bg-white' : 'bg-dark-200',
  cardBorder: isLight ? 'border-light-100/10' : 'border-dark-100/10',
  cardShadow: isLight ? 'shadow-md shadow-black/5' : 'shadow-xl shadow-black/20',
  
  buttonBg: isLight ? 'bg-light-50' : 'bg-dark-50',
  buttonText: isLight ? 'text-white' : 'text-black',
  buttonHover: isLight ? 'hover:bg-light-50/90' : 'hover:bg-dark-50/90',

  badgeBg: isLight ? 'bg-[#2A3B35]/10' : 'bg-[#B8D8D0]/10',
  badgeBorder: isLight ? 'border-[#2A3B35]/20' : 'border-[#B8D8D0]/20',
  badgeDot: isLight ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]',
   
  inputBg: isLight ? 'bg-white' : 'bg-dark-200',
  inputBorder: isLight ? 'border-light-100/20' : 'border-dark-100/20',
  inputFocus: isLight ? 'focus:border-primary-500' : 'focus:border-primary-400',
  
  // Gradient classes
  gradientFrom: isLight ? 'from-light-300' : 'from-dark-300',
  gradientTo: isLight ? 'to-white' : 'to-transparent',
  gradientOverlay: isLight ? 'from-black/20' : 'from-black/40',
});

/**
 * Get dynamic filter classes for logos and images
 */
export const getFilterClasses = (isLight: boolean) => ({
  logoFilter: isLight ? 'filter-dark-logo' : 'filter-light-logo',
  imageOverlay: isLight ? 'bg-black/5' : 'bg-black/20',
  glassMorphism: isLight ? 'glass-light' : 'glass-dark',
});

// ===== CORE THEME UTILITIES =====

/**
 * Get the primary background color for the current theme
 * Uses CSS variables for smooth transitions
 */
export function themeBackground(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-[#F7F7F7]' : 'bg-[#0F1712]';
}

/**
 * Get the secondary background color for the current theme
 * Uses CSS variables for smooth transitions
 */
export function themeBackgroundSecondary(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-white' : 'bg-black';
}

/**
 * Get the primary text color for the current theme
 */
export function themeText(theme: ThemeMode): string {
  return theme === 'light' ? 'text-[#2A3B35]' : 'text-white';
}

/**
 * Get the secondary text color for the current theme
 */
export function themeTextSecondary(theme: ThemeMode): string {
  return theme === 'light' ? 'text-[#4A665C]' : 'text-[#B8D8D0]';
}

/**
 * Get the accent color for the current theme
 */
export function themeAccent(theme: ThemeMode): string {
  return theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]';
}

/**
 * Get the accent background color for the current theme
 */
export function themeAccentBackground(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]';
}

/**
 * Get badge styling for the current theme
 */
export function themeBadge(theme: ThemeMode): string {
  const bg = theme === 'light' ? 'bg-[#2A3B35]/10' : 'bg-[#B8D8D0]/10';
  const border = theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#B8D8D0]/20';
  return `${bg} ${border}`;
}

/**
 * Get badge dot color for the current theme
 */
export function themeBadgeDot(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-[#2A3B35]' : 'bg-[#B8D8D0]';
}

// ===== THEME MANAGEMENT UTILITIES =====

/**
 * Apply theme to the document body
 */
export function applyTheme(theme: ThemeMode): void {
  const body = document.body;
  
  if (theme === 'light') {
    body.classList.add('global-light-mode');
  } else {
    body.classList.remove('global-light-mode');
  }
}

/**
 * Get current theme from body class
 */
export function getCurrentTheme(): ThemeMode {
  return document.body.classList.contains('global-light-mode') ? 'light' : 'dark';
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): ThemeMode {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  return newTheme;
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(defaultTheme: ThemeMode = 'light'): void {
  applyTheme(defaultTheme);
}

// ===== LEGACY UTILITIES (for backward compatibility) =====

/**
 * Get the muted background color for the current theme
 * Light: gray-100, Dark: gray-800
 */
export function themeBackgroundMuted(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-gray-100' : 'bg-gray-800';
}

/**
 * Get the card background color for the current theme
 * Light: white, Dark: gray-900
 */
export function themeBackgroundCard(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-white' : 'bg-gray-900';
}

/**
 * Get the hover background color for the current theme
 * Light: gray-50, Dark: gray-800
 */
export function themeBackgroundHover(theme: ThemeMode): string {
  return theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800';
}

// ===== TEXT UTILITIES =====

/**
 * Get the muted text color for the current theme
 * Light: gray-500, Dark: gray-400
 */
export function themeTextMuted(theme: ThemeMode): string {
  return theme === 'light' ? 'text-gray-500' : 'text-gray-400';
}

/**
 * Get the heading text color for the current theme
 * Light: gray-900, Dark: white
 */
export function themeTextHeading(theme: ThemeMode): string {
  return theme === 'light' ? 'text-gray-900' : 'text-white';
}

/**
 * Get the hover text color for the current theme
 * Light: gray-900, Dark: gray-100
 */
export function themeTextHover(theme: ThemeMode): string {
  return theme === 'light' ? 'hover:text-gray-900' : 'hover:text-gray-100';
}

// ===== BORDER UTILITIES =====

/**
 * Get the primary border color for the current theme
 * Light: gray-200, Dark: gray-700
 */
export function themeBorder(theme: ThemeMode): string {
  return theme === 'light' ? 'border-gray-200' : 'border-gray-700';
}

/**
 * Get the muted border color for the current theme
 * Light: gray-100, Dark: gray-800
 */
export function themeBorderMuted(theme: ThemeMode): string {
  return theme === 'light' ? 'border-gray-100' : 'border-gray-800';
}

/**
 * Get the focus border color for the current theme
 * Light: blue-500, Dark: blue-400
 */
export function themeBorderFocus(theme: ThemeMode): string {
  return theme === 'light' ? 'focus:border-blue-500' : 'focus:border-blue-400';
}

// ===== SHADOW UTILITIES =====

/**
 * Get the primary shadow for the current theme
 * Light: shadow-sm, Dark: shadow-lg with darker color
 */
export function themeShadow(theme: ThemeMode): string {
  return theme === 'light' ? 'shadow-sm' : 'shadow-lg shadow-black/20';
}

/**
 * Get the card shadow for the current theme
 * Light: shadow-md, Dark: shadow-xl with darker color
 */
export function themeShadowCard(theme: ThemeMode): string {
  return theme === 'light' ? 'shadow-md' : 'shadow-xl shadow-black/30';
}

/**
 * Get the hover shadow for the current theme
 * Light: hover:shadow-lg, Dark: hover:shadow-xl with darker color
 */
export function themeShadowHover(theme: ThemeMode): string {
  return theme === 'light' ? 'hover:shadow-lg' : 'hover:shadow-xl hover:shadow-black/30';
}

// ===== COMPOSITE UTILITIES =====

/**
 * Get a complete card styling for the current theme
 * Includes background, border, shadow, and text
 */
export function themeCard(theme: ThemeMode): string {
  return [
    themeBackgroundCard(theme),
    themeBorder(theme),
    'border',
    themeShadowCard(theme),
    themeText(theme),
    'rounded-lg'
  ].join(' ');
}

/**
 * Get a complete button styling for the current theme
 * Includes background, border, text, and hover states
 */
export function themeButton(theme: ThemeMode): string {
  return [
    themeBackgroundCard(theme),
    themeBorder(theme),
    'border',
    themeText(theme),
    themeBackgroundHover(theme),
    themeTextHover(theme),
    'transition-colors',
    'px-4 py-2 rounded'
  ].join(' ');
}

/**
 * Get a complete input styling for the current theme
 * Includes background, border, text, and focus states
 */
export function themeInput(theme: ThemeMode): string {
  return [
    themeBackgroundCard(theme),
    themeBorder(theme),
    'border',
    themeText(theme),
    themeBorderFocus(theme),
    'transition-colors',
    'px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20'
  ].join(' ');
}

/**
 * Get a complete dropdown/select styling for the current theme
 * Includes background, border, text, and focus states
 */
export function themeSelect(theme: ThemeMode): string {
  return [
    themeBackgroundCard(theme),
    themeBorder(theme),
    'border',
    themeText(theme),
    themeBorderFocus(theme),
    'transition-colors',
    'px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20'
  ].join(' ');
}

/**
 * Get a complete modal/overlay styling for the current theme
 * Includes background, border, shadow, and text
 */
export function themeModal(theme: ThemeMode): string {
  return [
    themeBackgroundCard(theme),
    themeBorder(theme),
    'border',
    themeShadowCard(theme),
    themeText(theme),
    'rounded-lg'
  ].join(' ');
}

// ===== SPECIALIZED UTILITIES =====

/**
 * Get transparent background with opacity for overlays
 * Light: bg-white/90, Dark: bg-black/90
 */
export function themeBackgroundOverlay(theme: ThemeMode): string {
  return theme === 'light' ? 'bg-white/90' : 'bg-black/90';
}


/**
 * Get ring color for focus states
 * Light: ring-blue-500/20, Dark: ring-blue-400/20
 */
export function themeRing(theme: ThemeMode): string {
  return theme === 'light' ? 'ring-blue-500/20' : 'ring-blue-400/20';
}

// ===== UTILITY FUNCTION FOR CONDITIONAL CLASSES =====

/**
 * Utility function to conditionally apply theme classes
 * @param theme - The current theme
 * @param lightClass - Classes to apply in light mode
 * @param darkClass - Classes to apply in dark mode
 * @returns The appropriate class string
 */
export function themeConditional(theme: ThemeMode, lightClass: string, darkClass: string): string {
  return theme === 'light' ? lightClass : darkClass;
}

/**
 * Utility function to combine multiple theme utilities
 * @param utilities - Array of theme utility functions
 * @param theme - The current theme
 * @returns Combined class string
 */
export function combineThemeUtilities(utilities: Array<(theme: ThemeMode) => string>, theme: ThemeMode): string {
  return utilities.map(util => util(theme)).join(' ');
}

// ===== GRADIENT UTILITIES =====

/**
 * Get gradient 'from' color for backgrounds
 * Light: from-[#F7F7F7], Dark: from-black
 */
export function themeGradientFrom(theme: ThemeMode): string {
  return theme === 'light' ? 'from-[#F7F7F7]' : 'from-black';
}

/**
 * Get gradient 'from' color for white/black contrast
 * Light: from-white, Dark: from-black
 */
export function themeGradientFromContrast(theme: ThemeMode): string {
  return theme === 'light' ? 'from-white' : 'from-black';
}

/**
 * Get gradient 'to' color for backgrounds
 * Light: to-white, Dark: to-transparent
 */
export function themeGradientTo(theme: ThemeMode): string {
  return theme === 'light' ? 'to-white' : 'to-transparent';
}

/**
 * Get overlay gradient for cards/images
 * Light: from-black/20, Dark: from-black/40
 */
export function themeGradientOverlay(theme: ThemeMode): string {
  return theme === 'light' ? 'from-black/20' : 'from-black/40';
}

/**
 * Get text gradient colors
 * Returns gradient classes for text effects
 */
export function themeTextGradient(theme: ThemeMode): string {
  return theme === 'light' 
    ? 'from-[#2A3B35] via-[#2A3B35] to-[#4A665C]' 
    : 'from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C]';
}

// ===== ADVANCED THEME UTILITIES =====

/**
 * Get responsive typography classes
 * Automatically adjusts font sizes across breakpoints
 */
export const getResponsiveTypography = (variant: 'display' | 'title' | 'body' | 'small') => {
  const variants = {
    display: 'text-3xl sm:text-4xl md:text-5xl lg:text-display-1',
    title: 'text-2xl sm:text-3xl md:text-title-1',
    body: 'text-base sm:text-lg',
    small: 'text-sm sm:text-base',
  };
  return variants[variant];
};

/**
 * Get dynamic spacing based on viewport
 * Useful for responsive padding/margins
 */
export const getDynamicSpacing = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  const sizes = {
    sm: 'p-4 sm:p-6 md:p-8',
    md: 'p-6 sm:p-8 md:p-12',
    lg: 'p-8 sm:p-12 md:p-16',
    xl: 'p-12 sm:p-16 md:p-24',
  };
  return sizes[size];
};

/**
 * Get animation classes with theme awareness
 * Includes duration and easing variations
 */
export const getThemeAnimation = (type: 'fade' | 'slide' | 'scale', theme: ThemeMode) => {
  const duration = theme === 'light' ? 'duration-300' : 'duration-400';
  const animations = {
    fade: `animate-fadeIn ${duration}`,
    slide: `animate-slideUp ${duration}`,
    scale: `transform transition-transform ${duration} hover:scale-105`,
  };
  return animations[type];
};

/**
 * Get complete component styles
 * Returns all necessary classes for common components
 */
export const getComponentStyles = (component: 'card' | 'button' | 'input' | 'modal', theme: ThemeMode) => {
  const isLight = theme === 'light';
  const themeClasses = getThemeClasses(isLight);
  
  const components = {
    card: `${themeClasses.cardBg} ${themeClasses.cardBorder} ${themeClasses.cardShadow} border rounded-lg p-6`,
    button: `${themeClasses.buttonBg} ${themeClasses.buttonText} ${themeClasses.buttonHover} px-6 py-3 rounded-lg font-medium transition-colors`,
    input: `${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.inputFocus} border rounded-lg px-4 py-2 w-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20`,
    modal: `${themeClasses.cardBg} ${themeClasses.cardBorder} ${themeClasses.shadowLg} border rounded-xl p-8 max-w-2xl w-full`,
  };
  
  return components[component];
};

/**
 * CSS Variable helpers for dynamic styling
 * Use these when you need to apply styles via style prop
 */
export const getCSSVariables = (theme: ThemeMode) => {
  const isLight = theme === 'light';
  return {
    '--background': isLight ? '#F7F7F7' : '#0F1712',
    '--background-secondary': isLight ? '#FFFFFF' : '#000000',
    '--foreground': isLight ? '#2A3B35' : '#FFFFFF',
    '--foreground-secondary': isLight ? '#4A665C' : '#B8D8D0',
    '--accent': isLight ? '#2A3B35' : '#B8D8D0',
    '--accent-background': isLight ? '#2A3B35' : '#B8D8D0',
    '--border': isLight ? 'rgba(74, 102, 92, 0.2)' : 'rgba(184, 216, 208, 0.2)',
  };
};

/**
 * Utility to generate theme-aware inline styles
 * Useful for dynamic values that can't be expressed as classes
 */
export const getThemeStyles = (theme: ThemeMode, styles: Record<string, any>) => {
  const cssVars = getCSSVariables(theme);
  return {
    ...styles,
    ...Object.entries(cssVars).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }), {}),
  };
};