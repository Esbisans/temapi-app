/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "0rem",
      md: "50.5rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },
    extend: {},
  },
  plugins: [],
}