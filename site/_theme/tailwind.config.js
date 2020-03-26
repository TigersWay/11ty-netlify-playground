const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': colors.teal,
        'secondary': colors.purple
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
};
