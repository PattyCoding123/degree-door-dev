/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'tokyo-night': '#0a0047',
      },
      textColor: {
        'tokyo-night': '#ffffff',
      },
    },
  },
  plugins: [],
};
