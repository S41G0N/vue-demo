/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
/** Set files visible to tailwind*/
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
    /** Set default font to Open Sans*/
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Generates custom tailwind classes with this color -> eg. text-brand-gray-1
        "brand-gray-1": "#dadce0",
        "brand-blue-1": "#1967d2",
        "brand-green-1": "#137333",
      },
    },
  },
  plugins: [],
}


