/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Harmonia Sans'],
      },
      colors: {
        'main': "#fff",
        'golden': '#ffcf40',
        'gold-yellow': '#ffdc73',
        'instragram': '#ee2a7b'
      },
      boxShadow: {
        'custom-red': 'red',
      }, 
    },
  },
  plugins: [],
}