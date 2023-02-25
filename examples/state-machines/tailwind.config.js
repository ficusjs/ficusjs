/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      './src/**/*.{html,mjs}',
      './src/components/other.js'
    ]
  },
  theme: {
    extend: {}
  },
  plugins: []
}
