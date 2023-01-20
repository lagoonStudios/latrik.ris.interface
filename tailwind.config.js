/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: '#00308F',
      secondary: '#ffffff',
      tertiary: '#02B8FE',
      lightGrey: '#EFF2FB',
      white: "#ffffff",
      grey: '#D9D9D9',
      black: '#000000',
      danger: "#FF0000",
      success: '#51F21A',
      warning: '#FF7A00'
    },
    extend: {
      boxShadow: {
        'buttonShadow': "0px 4px 4px rgba(0, 0, 0, 0.25)",
        'tableRowShadow': "-3px 5px 4px rgba(0, 0, 0, 0.25)"
      },
    },
  },
  plugins: [],
}
