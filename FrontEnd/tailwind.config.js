/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}", "./utils/**/*.{js}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      categoryBg: "#ECECEC",
      black: "#000",
      white: "#fff",
    },
    extend: {
      backgroundImage: {
        "main-shoes": "url('/assets/images/page2-bg.jpg')",
      },
      height: {
        loginMain: "70vh",
      },
    },
  },
  plugins: [],
};
