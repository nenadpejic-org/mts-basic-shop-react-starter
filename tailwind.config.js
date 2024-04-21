import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
      },
    },
    screens: {
      md: defaultTheme.screens.md,
    },
    extend: {},
  },
  plugins: [],
}