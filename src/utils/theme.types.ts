/**
 * TypeScript types for theme utilities
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeUtilityFunction {
  (theme: ThemeMode): string;
}

export interface ThemeConfig {
  light: string;
  dark: string;
}

export interface ThemeUtilities {
  // Background utilities
  background: ThemeUtilityFunction;
  backgroundSecondary: ThemeUtilityFunction;
  backgroundMuted: ThemeUtilityFunction;
  backgroundCard: ThemeUtilityFunction;
  backgroundHover: ThemeUtilityFunction;
  backgroundOverlay: ThemeUtilityFunction;
  
  // Text utilities
  text: ThemeUtilityFunction;
  textSecondary: ThemeUtilityFunction;
  textMuted: ThemeUtilityFunction;
  textHeading: ThemeUtilityFunction;
  textHover: ThemeUtilityFunction;
  
  // Border utilities
  border: ThemeUtilityFunction;
  borderMuted: ThemeUtilityFunction;
  borderFocus: ThemeUtilityFunction;
  
  // Shadow utilities
  shadow: ThemeUtilityFunction;
  shadowCard: ThemeUtilityFunction;
  shadowHover: ThemeUtilityFunction;
  
  // Composite utilities
  card: ThemeUtilityFunction;
  button: ThemeUtilityFunction;
  input: ThemeUtilityFunction;
  select: ThemeUtilityFunction;
  modal: ThemeUtilityFunction;
  
  // Specialized utilities
  accent: ThemeUtilityFunction;
  accentBackground: ThemeUtilityFunction;
  ring: ThemeUtilityFunction;
}

export interface ThemeHookReturn {
  theme: ThemeMode;
  isLightMode: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ComponentThemeProps {
  theme?: ThemeMode;
  className?: string;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  persistTheme?: boolean;
}