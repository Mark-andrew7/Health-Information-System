/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8', // Blue for buttons and accents
          secondary: '#6B7280', // Gray for text
          background: '#F3F4F6', // Light gray background
        },
      },
    },
    plugins: [],
  }