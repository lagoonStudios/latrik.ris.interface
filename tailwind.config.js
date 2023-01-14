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
      danger: "#dc2626",
      white: "#ffffff",
      grey: '#D9D9D9',
      black: '000000',
      blue: '#77acd6',
      primary: '#93eef3',
      secondary: '#c4f5f9',
      tertiary: '#809fdc',
    },
    extend: {
      boxShadow: {
        'buttonShadow': "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}
