/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  /** Set files visible to tailwind*/
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      /** Set default font to Open Sans*/
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // Generates custom tailwind classes with this color -> eg. text-brand-gray-1
        "brand-gray-1": "#dadce0",
        "brand-gray-2": "#f8f9fa",
        "brand-gray-3": "#80868b",
        "brand-blue-1": "#1967d2",
        "brand-blue-2": "#4285f4",
        "brand-green-1": "#137333"
      },
      boxShadow: {
        blue: "0 0 3px 3px #4285f4",
        gray: "0 1px 3px 0 rgba(60, 64, 67, .3)"
      }
    }
  },
  plugins: []
};
