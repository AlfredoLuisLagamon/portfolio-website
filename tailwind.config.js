/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        page: '56rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-strong': '40px',
      },
      colors: {
        'glass': {
          'light': 'rgba(255, 255, 255, 0.1)',
          'light-strong': 'rgba(255, 255, 255, 0.2)',
          'dark': 'rgba(0, 0, 0, 0.1)',
          'dark-strong': 'rgba(0, 0, 0, 0.2)',
        },
        'glass-border': {
          'light': 'rgba(255, 255, 255, 0.2)',
          'dark': 'rgba(255, 255, 255, 0.1)',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-strong': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            a: {
              color: '#3182ce',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities, addComponents }) {
      addUtilities({
        '.glass': {
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'background': 'rgba(255, 255, 255, 0.7)',
          'border': '1px solid rgba(0, 0, 0, 0.1)',
        },
        '.glass-dark': {
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'background': 'rgba(0, 0, 0, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-strong': {
          'backdrop-filter': 'blur(40px)',
          '-webkit-backdrop-filter': 'blur(40px)',
          'background': 'rgba(255, 255, 255, 0.8)',
          'border': '1px solid rgba(0, 0, 0, 0.15)',
        },
      });

      addComponents({
        '.glass-card': {
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          'background': 'rgba(255, 255, 255, 0.7)',
          'border': '1px solid rgba(0, 0, 0, 0.1)',
          'border-radius': '1rem',
          'transition': 'all 0.3s ease-in-out',
          
          '&:hover': {
            'transform': 'translateY(-2px)',
          },
          
          '.dark &': {
            'background': 'rgba(0, 0, 0, 0.1)',
            'border': '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      });
    },
  ],
}