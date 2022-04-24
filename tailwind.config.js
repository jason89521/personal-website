/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              padding: '0',
              'background-color': '',
            },
            code: {
              padding: '0.15em 0.3em',
              'background-color': '#dcdcdc',
              'border-radius': '5px',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        invert: {
          css: {
            code: {
              'background-color': '#6e7681',
            },
            'pre code': {
              'background-color': 'transparent',
            },
          },
        },
      },
    },
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1000px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
