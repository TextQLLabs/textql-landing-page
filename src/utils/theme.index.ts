/**
 * Theme utilities index file for easy imports
 */

// Export all theme utilities from the renamed file
export * from './theme-utils';

// Export theme types
export * from './theme.types';

// Export the hook
export { useComponentTheme } from '../hooks/useComponentTheme';

// Re-export the GlobalThemeProvider utilities for convenience
export { useGlobalTheme, GlobalThemeProvider } from '../components/GlobalThemeProvider';

// Common theme utility combinations for easy access
import { ThemeMode, combineThemeUtilities } from './theme-utils';
import { 
  themeBackground, 
  themeText, 
  themeBorder, 
  themeShadow,
  themeBackgroundHover,
  themeTextHover
} from './theme-utils';

/**
 * Pre-configured theme utility combinations for common use cases
 */
export const themePresets = {
  /**
   * Complete navigation bar styling
   */
  navbar: (theme: ThemeMode) => combineThemeUtilities([
    themeBackground,
    themeText,
    themeBorder,
    themeShadow
  ], theme),

  /**
   * Complete section styling for page sections
   */
  section: (theme: ThemeMode) => combineThemeUtilities([
    themeBackground,
    themeText
  ], theme),

  /**
   * Complete interactive element styling
   */
  interactive: (theme: ThemeMode) => combineThemeUtilities([
    themeBackground,
    themeText,
    themeBorder,
    themeBackgroundHover,
    themeTextHover
  ], theme),
};

/**
 * Utility for creating theme-aware class strings with fallbacks
 */
export function createThemeClass(theme: ThemeMode, baseClasses: string, themeClasses: string): string {
  return `${baseClasses} ${themeClasses}`;
}

/**
 * Utility for merging theme utilities with custom classes
 */
export function mergeThemeClasses(themeClasses: string, customClasses?: string): string {
  return customClasses ? `${themeClasses} ${customClasses}` : themeClasses;
}