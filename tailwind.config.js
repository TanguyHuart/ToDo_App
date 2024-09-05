/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        hand: ["Shantell Sans", "cursive"],
      },
      keyframes: {
        entrance: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        entrance: "entrance 200ms ease-in-out 1",
      },
    },
  },
  plugins: [],
};
