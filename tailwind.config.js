/** @type {import('tailwindcss/plugin').TailwindPluginCreator} */
const plugin = require('tailwindcss/plugin');

const customPlugin = plugin(({ addVariant }) => {
  addVariant('child', '& > *');
  addVariant('child-hover', '& > *:hover');
});

/** @type {import('tailwindcss/tailwind-config').TailwindConfig}  */
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
              'background-color': 'transparent',
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
      colors: {
        primary: 'var(--color-primary)',
        dark: {
          50: '#aaabac',
          100: '#999a9b',
          200: '#88898a',
          300: '#777879',
          400: '#666768',
          500: '#555657',
          600: '#444546',
          700: '#333435',
          800: '#222324',
          900: '#111213',
        },
      },
      maxWidth: {
        post: '45rem',
      },
    },
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1000px' },
    },
  },
  plugins: [require('@tailwindcss/typography'), customPlugin],
};
