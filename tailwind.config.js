/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Hiragino Mincho ProN', 'serif'],
        body: ['Avenir', 'sans-serif'],
      },
      fontWeight: {
        heading1: '600', // W6
        heading2: '300', // W3
      },
    },
  },
  plugins: [],
};