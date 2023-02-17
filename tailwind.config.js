/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          bg1: "var(--bg1)",
          t1: "var(--t1)",
          t2: "var(--t2)",
          t3: "var(--t3)",
          t4: "var(--t4)",
          t5: "var(--t5)",
          t6: "var(--t6)",
          accent: "var(--accent)",
          active: "var(--active)",
          inactive: "var(--inactive)",
        },
      },
    },
  },
  plugins: [],
};
