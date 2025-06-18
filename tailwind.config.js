/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        ownglyph: ["Ownglyph_ParkDaHyun", "sans-serif"],
      },
    },
  },
  plugins: [],
};
