/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          light:  "var(--primary-light)"
        },
        link: "var(--link)",
        border: "var(--border)",
        disabled: {
          DEFAULT: "var(--disabled)",
          foreground: "var(--disabled-foreground)"  
        },
        danger: {
          DEFAULT: "var(--danger)",
          foreground: "var(--danger-foreground)"
        },
        fire: {
          DEFAULT: "var(--fire-theme)",
        },
        grass: {
          DEFAULT: "var(--grass-theme)",
        },
        water: {
          DEFAULT: "var(--water-theme)",
        }
      }
    },
  },
  plugins: [],
}

