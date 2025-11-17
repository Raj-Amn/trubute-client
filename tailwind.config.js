/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1976d2", // matching your MUI theme
          secondary: "#f50057",
        },
      },
    },
    plugins: [],
  }
       