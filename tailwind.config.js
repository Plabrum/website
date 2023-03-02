/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "376px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        custom: {
          bg1: "var(--bg1)",
          bg2: "var(--bg2)",
          bg3: "var(--bg3)",
          bg4: "var(--bg4)",
          t1: "var(--t1)",
          t2: "var(--t2)",
          t3: "var(--t3)",
          t4: "var(--t4)",
        },
      },
    },
  },
  plugins: [],
};
