/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B8D8D0', // Mint - Primary text/highlights (5%)
          50: '#F7FAF9',
          100: '#E8F2EF',
          200: '#D0E5E0',
          300: '#B8D8D0',
          400: '#A0CBC0',
          500: '#88BEB0',
          600: '#70B1A0',
          700: '#58A490',
          800: '#409780',
          900: '#288A70',
        },
        secondary: {
          DEFAULT: '#729E8C', // Sage - Secondary text (10%)
          100: '#E5EDE9',
          200: '#CBDBD3',
          300: '#B1C9BD',
          400: '#97B7A7',
          500: '#729E8C',
          600: '#5D8471',
          700: '#486A56',
          800: '#33503B',
          900: '#1E3620',
        },
        dark: {
          50: '#B8D8D0',  // Mint - Primary text/highlights (5%)
          100: '#729E8C', // Sage - Secondary text (10%)
          200: '#0A1F1C', // Forest Green - UI panels (25%)
          250: '#0F1712', // Darkest Green - Deep UI elements
          300: '#000000', // Black - Background (60%)
        },
        light: {
          50: '#2A3B35',  // Deep Forest - Primary text/highlights (5%)
          100: '#4A665C', // Deep Sage - Secondary text (10%)
          200: '#F0F5F3', // Light Sage - UI panels (25%)
          300: '#F7F7F7', // Soft White - Background (60%)
        },
        slack: {
          sidebar: '#4A154B',      // Slack's signature purple sidebar
          hover: '#350d36',        // Darker purple for hover states
          border: '#5b2c5d',       // Border color for sidebar elements
          'text-muted': '#d1d2d3', // Muted text in sidebar
        },
        // Semantic color aliases for easier usage
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
          muted: 'var(--background-muted)',
          accent: 'var(--accent-background)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
          muted: 'var(--foreground-muted)',
          accent: 'var(--accent)',
        },
        border: {
          DEFAULT: 'var(--border)',
          muted: 'var(--border-muted)',
          accent: 'var(--border-accent)',
        }
      },
      fontFamily: {
        slack: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',  // 18px - for intermediate spacing
        '5.5': '1.375rem',  // 22px - for intermediate spacing
        '13': '3.25rem',    // 52px - common in components
        '15': '3.75rem',    // 60px - navbar height
        '17': '4.25rem',    // 68px
        '18': '4.5rem',     // 72px - common height
        '22': '5.5rem',     // 88px - common height  
        '30': '7.5rem',     // 120px - common for sections
        '120': '30rem',     // 480px - for large fixed heights
        '160': '40rem',     // 640px - for extra large fixed heights
      },
      maxWidth: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
      },
      width: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
      },
      height: {
        '18': '4.5rem',     // 72px - common in components
        '22': '5.5rem',     // 88px - common in components
        '30': '7.5rem',     // 120px
        '120': '30rem',     // 480px
        '160': '40rem',     // 640px
      },
      screens: {
        'xs': '475px',      // Extra small devices
        '3xl': '1920px',    // Extra large screens
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseFast: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
        'pulse-fast': 'pulseFast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Common typography scales
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title-1': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'title-2': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'title-3': ['1.75rem', { lineHeight: '1.4' }],
      },
      // Common filter utilities
      backdropFilter: {
        'dark': 'brightness(0) saturate(100%) invert(91%) sepia(21%) saturate(298%) hue-rotate(118deg) brightness(95%) contrast(93%)',
        'light': 'brightness(0) saturate(100%) invert(18%) sepia(17%) saturate(589%) hue-rotate(93deg) brightness(96%) contrast(93%)',
      },
    },
  },
  plugins: [
    // Custom plugin for common patterns
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Logo filter utilities
        '.filter-light-logo': {
          filter: 'brightness(0) saturate(100%) invert(91%) sepia(21%) saturate(298%) hue-rotate(118deg) brightness(95%) contrast(93%)',
        },
        '.filter-dark-logo': {
          filter: 'brightness(0) saturate(100%) invert(18%) sepia(17%) saturate(589%) hue-rotate(93deg) brightness(96%) contrast(93%)',
        },
        // Common positioning patterns
        '.fixed-navbar': {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '50',
        },
        '.below-navbar': {
          paddingTop: '60px',
        },
        // Glass morphism effects
        '.glass-light': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
        // Common aspect ratios
        '.aspect-hero': {
          aspectRatio: '16 / 9',
        },
        '.aspect-card': {
          aspectRatio: '4 / 3',
        },
        // Hide scrollbar utilities
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};