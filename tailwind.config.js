/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './public/**/*.html',
    './public/**/*.vue',
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'patrick-hand': ['Patrick Hand', 'cursive']
      },
      backgroundImage: {
        'login': "url('@/assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
}
