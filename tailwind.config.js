/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        beige: {
          50: '#F5F5DC',
          100: '#ECEAD3',
        },
        gold: {
          500: '#D4AF37',
          600: '#C09630',
        },

        MainBGColorYellow: '#C6B198',
        BGColorYellow: '#796855',
        LightBGColor: '#E3DBD0',
        richBrown: '#7A6752',
        goldenBeige: '#CBB59F',
        softCream: '#DED6CB',

      },

      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        didot: ['"Playfair Display"', 'serif'], 
        Helvetica: ['Poppins','Helvetica Neue', 'Helvetica,Arial', 'sans-serif'],
        Logo: ["Baskervville SC", 'serif']
      },

    },
    plugins: [],
  }
}