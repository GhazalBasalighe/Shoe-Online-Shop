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
      gray: "#f3f3f3",
      red: "rgb(220 38 38)",
      lime: "rgb(163 230 53)",
      emerald: "rgb(52 211 153)",
      cyan: "rgb(103 232 249)",
      indigo: "rgb(129 140 248)",
      pink: "rgb(232 121 249)",
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
