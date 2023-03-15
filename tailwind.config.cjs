/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "tokyo-night": "#0a0047",
        primary: "#f9f9f9",
      },
      textColor: {
        "tokyo-night": "#ffffff",
      },
      padding: {
        "footer-fit": "10.5rem",
        "footer-fit-small": "16rem",
      },
    },
  },
  plugins: [],
};
