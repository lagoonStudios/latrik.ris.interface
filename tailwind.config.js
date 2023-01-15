/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#93eef3',
      secondary: '#c4f5f9',
      tertiary: '#809fdc',
      transparent: "transparent",
      current: "currentColor",
      danger: "#FF0000",
      white: "#ffffff",
      grey: '#D9D9D9',
      lightGrey: '#d5d5d5',
      black: '000000',
      blue: '#77acd6',
      green: '#98E47E',
      orange: '#FF7A00'
    },
    extend: {
      boxShadow: {
        'buttonShadow': "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}
