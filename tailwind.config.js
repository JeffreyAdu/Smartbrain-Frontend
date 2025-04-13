/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea526f',
          light: '#f27d94',
          dark: '#c02e4b',
        },
        secondary: {
          DEFAULT: '#2D4059',
          light: '#405c80',
          dark: '#1a2536',
        },
        accent: {
          DEFAULT: '#FFD460',
          light: '#ffe08f',
          dark: '#e5b520',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 