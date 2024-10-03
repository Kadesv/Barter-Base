/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Path to your HTML file(s)
    './src/**/*.{js,ts,jsx,tsx}', // Path to all source files that use Tailwind classes
  ],
  theme: {
    extend: {}, // Extend Tailwind's default theme (optional)
  },
  plugins: [require('daisyui')], // DaisyUI plugin for Tailwind
  daisyui: {
    themes: [
      'dark', // Add predefined DaisyUI themes here
      'light',
      'cupcake',
      'emerald',
      'sunset',
      'nord',
      'black',
    ],
  },
};
