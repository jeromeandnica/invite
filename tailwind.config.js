/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        'sage-dark': '#56644B',
        'sage-light': '#8FA083',
        'brown-earth': '#6F5643',
        'beige-sand': '#C1AA87',
        'cream-soft': '#F4F0E6',
        'paper': '#F9F8F4',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        heading: ['"Libre Baskerville"', 'serif'],
        body: ['"Merriweather"', 'serif'],
      },
      // --- TRANSFERRED ANIMATIONS FROM YOUR HTML ---
      animation: {
        'fade-in-up': 'fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}