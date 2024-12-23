// tailwind.config.js

/** @type {import('tailwindcss').Config} */


import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-color': 'var(--primary-color)',
      },
    },
  },
  mode: 'jit', 
  plugins: [tailwindcss, autoprefixer, purgecss],
}
