/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flyonui/dist/js/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "up-lg":
          "0 -4px 6px -3px rgba(0, 0, 0, 0.1), 0 -2px 3px -2px rgba(0, 0, 0, 0.1)",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "cloudybook-grey": "#23272f",
      "cloudybook-dark-grey": "#181a1b",
      "cloudybook-nav-color": "#212425",
      "red-500": "#f56565",
      "red-700": "#c53030",
      "grey-300": "#e2e8f0",
      "green-100": "#f0fff4",
      "green-800": "#22543d",
      "sky-500": "#0ea5e9",
      "sky-600": "#38b3eb",
    },
  },
  plugins: [require("flyonui"), require("flyonui/plugin")],
};
