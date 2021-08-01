const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
