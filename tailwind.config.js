/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F7EFE3', light: '#FBF6EE', dark: '#EFE2CF' },
        burgundy: { DEFAULT: '#6B1E2E', dark: '#4E1420', light: '#8A2E40' },
        rouge: '#A23B3B',
        blush: { DEFAULT: '#E8C4BC', light: '#F3DDD7' },
        cocoa: { DEFAULT: '#3B2418', light: '#5C3D2E', muted: '#7A5E50' },
        gold: { DEFAULT: '#B8954F', light: '#D4B77A' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hand: ['"Homemade Apple"', '"Caveat"', 'cursive'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(59,36,24,.06), 0 8px 24px -8px rgba(59,36,24,.18)',
        lift: '0 2px 4px rgba(59,36,24,.06), 0 24px 48px -16px rgba(78,20,32,.28)',
      },
    },
  },
  plugins: [],
};
