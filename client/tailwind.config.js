/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#2190FF",
        black: {
          DEFAULT: "#000",
          100: "#05070D",
          200: "#080C16",
          300: "#101E42",
        },
        grey: {
          100: "#0D0D0D",
          200: "#262626",
        },
        white: {
          DEFAULT: "#F2F2F2",
          400: "#A3B3BC",
          500: "#A4B8D5",
          800: "#D0DFFF",
        },
        purple: "#8C7CFF",
        pink: "#ED5FBD",
        violet: "#F16565",
        orange: "#FF964B",
      },
    },
  },
  plugins: [],
}
