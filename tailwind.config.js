/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          25: '#f2f9fc',
          50: '#edfaff',
          100: '#d6f2ff',
          200: '#b5eaff',
          300: '#83dfff',
          400: '#48cbff',
          500: '#1eadff',
          600: '#068fff',
          700: '#007bff',
          800: '#085ec5',
          900: '#0d519b',
          950: '#0e315d',
        },
        'text-strong': colors.slate[950],
        'text-weak': colors.slate[700],
        'stroke-stong': colors.slate[500],
        'stroke-weak': colors.slate[300],
        'fill': colors.slate[100],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
