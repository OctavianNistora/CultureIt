/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#F7BA4B',
        secondary: '#FFFFFF',
        medium_primary: '#D48900',
        lighter_primary: '#F3E9B5',
        black: '#393838',
        grey: '#98A3C7'
      },

      fontFamily: {
        inter_regular: ['Inter-Regular'],
        inter_bold: ['Inter-Bold'],
      }
    },
  },
  plugins: [],
}