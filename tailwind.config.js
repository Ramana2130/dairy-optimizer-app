/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: '#6F3D24',
        lightbrown:"#CA9979",
        grey: '#3a393e',
        pink: '#c26766',
        lightWhite:'#eaded1',
      },
    },
  },
  plugins: [],
}