/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1000px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
