const colors = require('tailwindcss/colors')
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '16rem',
        '2xl': '24rem',
      },
    },
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.warmGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      cyan: colors.cyan,
      rose: colors.rose,
      emerald: colors.emerald,
      design: {
        light: '#fbfbfb',
      }
    },
    fontFamily: {
      'titles': ['"Work Sans"', 'sans-serif'],
      'bitter': ['Bitter', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
      'test': ['Fraunces', 'serif'],
    },
    boxShadow: {
    '4xl': '0 56px 60px rgba(0, 0, 0, 0.05);'
    },
    extend: {
      }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
