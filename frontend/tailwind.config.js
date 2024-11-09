import flowbitePlugin from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
          {
            "@apply appearance-none": {}, // Removes the spinner in Chrome, Safari, Edge, and Opera
          },
        'input[type="number"]': {
          "@apply appearance-none": {}, // Removes the spinner in Firefox
        },
      });
    },
  ],
};
