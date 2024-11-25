/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        healing: {
          sage: '#FF69B4',      // Deep pink
          mint: '#FFE6F3',      // Light pink
          ocean: '#9932CC',     // Dark orchid
          sand: '#FFF0F7',      // Softer pink
          lavender: '#E9D5FF',  // Light purple
          blush: '#FCE7F3',     // Soft pink
          primary: '#9932CC',   // Dark orchid
          secondary: '#FF69B4', // Deep pink
        }
      },
      backgroundImage: {
        'magical-gradient': 'linear-gradient(135deg, #FF69B4 0%, #9932CC 50%, #4B0082 100%)',
      },
      boxShadow: {
        'magical': '0 4px 20px -2px rgba(153, 50, 204, 0.25)',
      }
    },
  },
  plugins: [],
};