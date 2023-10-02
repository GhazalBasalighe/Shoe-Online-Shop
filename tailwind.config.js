/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-shoes": "url('/assets/images/page2-bg.jpg')",
      },
    },
  },
  plugins: [],
};
