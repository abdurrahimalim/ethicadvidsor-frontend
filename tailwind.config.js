/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d4aa',
        secondary: '#0ea5e9',
        warning: '#f59e0b',
        danger: '#ef4444',
        success: '#22c55e',
        dark: {
          100: '#111820',
          200: '#0d1117',
          300: '#080c10',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}