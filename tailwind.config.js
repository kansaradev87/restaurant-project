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
        'darkmode-bg': "#343434",
        'darkmode-components': "#424242",
        'lightmode': '#f3f4f6',
        'darkmode-hover': "#bdbdbd",
        'lightmode-component': "#c8cacda6",
        
        // Added hover and active colors for dark mode
        'darkmode-hover': "#525252",
        'darkmode-active': "#606060",
        
        // Added hover and active colors for light mode
        'lightmode-hover': "#e5e7eb",
        'lightmode-active': "#d1d5db",
      },
      textColor: {
        'darkmode': '#ffffff',
        'lightmode': '#f3f4f6',
        'hover-text': "#333333",
        
        // Added hover and active text colors for dark mode
        'darkmode-hover-text': "#f3f4f6",
        'darkmode-active-text': "#ffffff",
        
        // Added hover and active text colors for light mode
        'lightmode-hover-text': "#1f2937",
        'lightmode-active-text': "#111827",
      },
    },
  },
  plugins: [],
}