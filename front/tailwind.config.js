/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'xmd' : '960px',
        'xsm': '720px',
        'xs': '450px',
        'xxs': '370px',
      },

      fontFamily : {
        poppins : 'Poppins',
        kanit : 'Kanit',
      },

    },
  },
  plugins: [],
}

