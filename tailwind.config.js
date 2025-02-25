/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#252525",
        whiting: '#6b6b6b',
        whiting2: '#ebebeb',
        graying: '#808080',
        redprimary: '#d70000'
      },
    },
  },
  plugins: [],
}

