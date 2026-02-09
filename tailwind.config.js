/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: '#F9F7F2',
          gold: '#D4AF37',
          goldDark: '#8C6D1F', // Darkened for accessibility (prev: #B89628)
          goldLight: '#F3E5AB',
          lilac: '#E6E6FA',
          lilacDark: '#6A4BB8', // Darkened for accessibility (prev: #9370DB)
          dark: '#2C2C2C',
          greenLight: '#E0F2F1'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    }
  },
  plugins: [],
}
