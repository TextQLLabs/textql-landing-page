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
        }
      },
      maxWidth: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
      },
      width: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
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
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};