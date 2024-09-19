/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        albert:['Albert Sans', 'sans-serif'],
        tenor:['Tenor Sans', 'sans-serif'],
        barlow:['Barlow', 'sans-serif']
      }
    },
  },
  plugins: [],
}

