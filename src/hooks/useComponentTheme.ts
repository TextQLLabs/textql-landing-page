import { useGlobalTheme } from '../components/GlobalThemeProvider';

/**
 * Hook to get the current theme string for component usage
 * @returns 'light' | 'dark' - The current theme string
 */
export function useComponentTheme(): 'light' | 'dark' {
  const { isLightMode } = useGlobalTheme();
  return isLightMode ? 'light' : 'dark';
}