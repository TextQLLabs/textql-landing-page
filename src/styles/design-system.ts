/**
 * Design System Reference
 */

export const colors = {
  // Color schemes for dark and light modes
  schemes: {
    dark: {
      50: '#B8D8D0',  // Mint - Primary text/highlights (5%)
      100: '#729E8C', // Sage - Secondary text (10%)
      200: '#0A1F1C', // Forest Green - UI panels (25%)
      300: '#000000', // Black - Background (60%)
    },
    light: {
      50: '#2A3B35',  // Deep Forest - Primary text/highlights (5%)
      100: '#4A665C', // Deep Sage - Secondary text (10%)
      200: '#F0F5F3', // Light Sage - UI panels (25%)
      300: '#F7F7F7', // Soft White - Background (60%)
    }
  },

  // Opacity variants
  opacity: {
    'white-20': 'rgba(255, 255, 255, 0.2)',
    'white-30': 'rgba(255, 255, 255, 0.3)',
    'forest-20': 'rgba(42, 59, 53, 0.2)',
    'forest-30': 'rgba(42, 59, 53, 0.3)',
  },

  // Color distribution
  distribution: {
    background: '60%',
    panels: '25%',
    secondary: '10%',
    primary: '5%',
  },
};

export const typography = {
  // Font weights
  fontWeight: {
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes (in pixels)
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Color combinations
  colorScheme: {
    dark: {
      background: colors.schemes.dark[300],
      surface: colors.schemes.dark[200],
      primary: colors.schemes.dark[50],   // Mint (5%) for primary text
      secondary: colors.schemes.dark[100], // Sage (10%) for secondary text
      muted: `rgba(114, 158, 140, 0.6)`,  // Sage with opacity
    },
    light: {
      background: colors.schemes.light[300],
      surface: colors.schemes.light[200],
      primary: colors.schemes.light[50],   // Deep Forest (5%) for primary text
      secondary: colors.schemes.light[100], // Deep Sage (10%) for secondary text
      muted: `rgba(74, 102, 92, 0.6)`,    // Deep Sage with opacity
    }
  },

  // Typography styles
  styles: {
    dark: {
      heading: {
        color: colors.schemes.dark[50],    // Mint (5%)
        fontWeight: 'extralight',
      },
      body: {
        color: colors.schemes.dark[100],   // Sage (10%)
        fontWeight: 'light',
      }
    },
    light: {
      heading: {
        color: colors.schemes.light[50],   // Deep Forest (5%)
        fontWeight: 'extralight',
      },
      body: {
        color: colors.schemes.light[100],  // Deep Sage (10%)
        fontWeight: 'light',
      }
    }
  },

  // Usage guidelines
  guidelines: {
    dark: `
      Typography Guidelines (Dark Mode):
      
      1. Primary Text (5%)
         - Color: Mint (#B8D8D0)
         - Weight: Extralight (200)
         - Usage: Headings, important content, CTAs
      
      2. Secondary Text (10%)
         - Color: Sage (#729E8C)
         - Weight: Light (300)
         - Usage: Body text, descriptions, navigation
      
      3. Muted Text
         - Color: Sage with 60% opacity
         - Weight: Light (300)
         - Usage: Supporting text, metadata, disabled states
    `,
    light: `
      Typography Guidelines (Light Mode):
      
      1. Primary Text (5%)
         - Color: Deep Forest (#2A3B35)
         - Weight: Extralight (200)
         - Usage: Headings, important content, CTAs
      
      2. Secondary Text (10%)
         - Color: Deep Sage (#4A665C)
         - Weight: Light (300)
         - Usage: Body text, descriptions, navigation
      
      3. Muted Text
         - Color: Deep Sage with 60% opacity
         - Weight: Light (300)
         - Usage: Supporting text, metadata, disabled states
    `
  }
};

export const spacing = {
  // Spacing scale (in pixels)
  text: '16px',
  element: '20px',
  panel: '24px',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const accessibility = {
  minimumContrastRatio: '4.5:1',
  focusIndicators: true,
  keyboardNavigation: true,
  semanticMarkup: true,
  lightMode: {
    textOnBackground: '4.5:1', // Deep Forest on Soft White
    textOnSurface: '4.5:1',    // Deep Forest on Light Sage
  },
  darkMode: {
    textOnBackground: '4.5:1', // Mint on Black
    textOnSurface: '4.5:1',    // Mint on Forest Green
  }
};