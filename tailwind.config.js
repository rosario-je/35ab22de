/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['"Libre Franklin"', 'serif'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}