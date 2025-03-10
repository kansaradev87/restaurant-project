/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        // 'darkmode': '#121212da',
        'darkmode-bg':"#343434",
        'darkmode-components':"#424242",
        'lightmode':'#f3f4f6',
        'darkmode-hover':"#bdbdbd",
        'lightmode-component':"#c8cacda6"
        // You can customize this color
      },
      textColor: {
        'darkmode': '#ffffff',
        'lightmode':'#f3f4f6',
        'hover-text':"#333333"
        // You can customize this color
      },
    },
  },
  plugins: [],
}