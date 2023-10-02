/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
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
