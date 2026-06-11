/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#FCFAF8',
          green: '#7A8B76',
          yellow: '#FDF7E3',
          text: '#4A4A4A',
          beige: '#F0EBE1',
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', 'serif'],
        english: ['"Cormorant Garamond"', 'serif'],
      }
    },
  },
  plugins: [],
}