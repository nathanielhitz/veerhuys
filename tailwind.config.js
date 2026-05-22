/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF4',
          100: '#F9F3E5',
          200: '#F2E6CC',
          DEFAULT: '#F5EDD8',
        },
        espresso: {
          DEFAULT: '#1C1008',
          800: '#2C1A0E',
          700: '#3D2514',
          600: '#4E311C',
        },
        amber: {
          cafe: '#B87333',
          light: '#D4944A',
          muted: '#8B6240',
        },
        taupe: {
          DEFAULT: '#8A7560',
          light: '#B5A48A',
          muted: '#6B5C4A',
        },
        sage: {
          DEFAULT: '#4A5C47',
          light: '#6B7D68',
          muted: '#3A4A37',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3.5vw, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        section: '8rem',
        'section-sm': '5rem',
      },
      borderRadius: {
        'card': '1.5rem',
        'card-inner': 'calc(1.5rem - 0.375rem)',
        'pill': '9999px',
      },
      boxShadow: {
        'warm': '0 20px 60px -15px rgba(28, 16, 8, 0.12)',
        'warm-sm': '0 8px 24px -8px rgba(28, 16, 8, 0.10)',
        'inner-highlight': 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
