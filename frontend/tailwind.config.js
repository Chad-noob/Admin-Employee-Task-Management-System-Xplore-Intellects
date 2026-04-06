/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.14)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top left, rgba(96,165,250,0.24), transparent 28%), radial-gradient(circle at top right, rgba(45,212,191,0.2), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))'
      }
    }
  },
  plugins: []
};