/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.6875rem',
        micro: '0.625rem',
      },
    },
  },
  plugins: [],
}
