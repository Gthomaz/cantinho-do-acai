/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#4a148c', 
        'brand-purple-dark': '#311b92',
        'brand-yellow': '#fbc02d', 
        'brand-yellow-light': '#fff59d',
        'bg-dark': '#5f4b8b', /* Tonalidade de Lilás elegante */
        'bg-card': '#4a148c', /* Roxo profundo (estilo área de bebidas do panfleto) */
        'bg-surface': '#311b92',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
