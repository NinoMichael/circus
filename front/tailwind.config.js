/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'xmd' : '900px',
        'xs': '450px',
      },
    },
  },
  plugins: [],
}

