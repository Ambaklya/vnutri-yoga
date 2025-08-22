/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f8f7',
          100: '#eef0ee',
          200: '#dde2dd',
          300: '#c2ccc2',
          400: '#9fad9f',
          500: '#7a8a7a',
          600: '#5f6f5f',
          700: '#4a574a',
          800: '#3b4b3b',
          900: '#2f3d2f',
          950: '#1a241a',
        },
        yoga: {
          50: '#f7f8f7',
          100: '#eef0ee',
          200: '#dde2dd',
          300: '#c2ccc2',
          400: '#9f8a7a',
          500: '#7a6a5f',
          600: '#5f4f4a',
          700: '#4a3f3a',
          800: '#3b4b3b',
          900: '#2f3d2f',
          950: '#1a241a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
