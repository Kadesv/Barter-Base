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
    }, 
  },
  plugins: [require('daisyui')], 
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
