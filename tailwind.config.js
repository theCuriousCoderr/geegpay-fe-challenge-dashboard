/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jarkarta: ["Plus Jakarta Sans", "sans-serif" ],
        inter: ["Inter", "sans-serif"]
      },
      screens: {
        xs: "340px"
      }
    },
  },
  plugins: [],
}