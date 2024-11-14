/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        aerospace: ['Aerospace Bold', 'sans-serif'],
      },
      // Define the custom utility here
      animation: {
        'underline-animation': 'underline-slide-in 0.3s ease-out forwards',
      },
      keyframes: {
        'underline-slide-in': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      addComponents({
        '.underline-animation': {
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '0',
            height: '2px', // Adjust height for underline thickness
            backgroundColor: 'currentColor',
            transition: 'width 0.3s ease-out',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      });
    },
  ],
  daisyui: {
    themes: [
      'dark', 
      'light',
      'cupcake',
      'emerald',
      'sunset',
      'nord',
      'black',
    ],
  },
};
