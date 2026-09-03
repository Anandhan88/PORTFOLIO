/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'Courier New', 'monospace'],
      },
      colors: {
        'onyx': {
          DEFAULT: '#0a0a0a',
          '900': '#0a0a0a',
          '800': '#121212',
          '700': '#1a1a1a',
          '600': '#262626',
        },
        'bone': {
          DEFAULT: '#f9f8f6',
          '100': '#ffffff',
          '200': '#f9f8f6',
          '300': '#f0eee9',
          '400': '#e2ded4',
        },
        'editorial': {
          'silver': '#e2e8f0',
          'accent': '#ffffff',
          'muted': '#a3a3a3',
          'border': '#262626',
        }
      }
    }
  },
  plugins: [],
}