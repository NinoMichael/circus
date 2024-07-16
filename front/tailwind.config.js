/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens :  {
        xs : '430px',
      },
      fontFamily : {
        poppins : 'Poppins',
        kanit : 'Kanit',
      },

      colors : {
        main : '#fadbb9',
        accent : '#F85046',
        tertiary: "#1E1E1E",
      }
    },
  },
  plugins: [],
}

