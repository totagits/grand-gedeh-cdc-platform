/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ggc: {
          dark: '#071f13',
          forest: '#0d3820',
          emerald: '#15803d',
          leaf: '#22c55e',
          lightGreen: '#f0fdf4',
          gold: '#d97706',
          amber: '#b45309',
          yellow: '#f59e0b',
          lightGold: '#fef3c7',
          sky: '#0284c7',
          river: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
