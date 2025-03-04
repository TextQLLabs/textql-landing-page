/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
      },
      width: {
        'site': '80rem', // 1280px - matches the current max-w-7xl
      },
    },
  },
  plugins: [],
};