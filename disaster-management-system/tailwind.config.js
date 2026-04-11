/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d9efff',
          200: '#b6e0ff',
          300: '#83c8ff',
          400: '#4aa7ff',
          500: '#1f85ff',
          600: '#0f64db',
          700: '#0d4fb0',
          800: '#0f428f',
          900: '#123970',
        },
        danger: {
          50: '#fff2f2',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ff9b9b',
          400: '#ff5c5c',
          500: '#ff2f2f',
          600: '#e11919',
          700: '#b31010',
          800: '#8c1010',
          900: '#731414',
        },
      },
    },
  },
  plugins: [],
}

