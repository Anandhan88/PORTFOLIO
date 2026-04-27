/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': {
          'cyan': '#00d9ff',
          'pink': '#ff006e',
          'purple': '#a000ff',
          'green': '#00ff88',
          'orange': '#ff6b00',
        },
        'dark': {
          'bg': '#0a0e27',
          'card': '#121d3f',
          'border': '#1e2749',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
}