import type { TextProps } from './types';

export const getColorClass = (color: TextProps['color'], theme: TextProps['theme'] = 'dark') => {
  const colors = {
    dark: {
      primary: 'text-[#B8D8D0]',    // Mint (5%)
      secondary: 'text-[#729E8C]',  // Sage (10%)
      muted: 'text-[#729E8C]'    // Sage with opacity
    },
    light: {
      primary: 'text-[#2A3B35]',    // Deep Forest (5%)
      secondary: 'text-[#4A665C]',  // Deep Sage (10%)
      muted: 'text-[#729E8C]'    // Deep Sage with opacity
    }
  };

  return colors[theme][color || 'primary'];
};