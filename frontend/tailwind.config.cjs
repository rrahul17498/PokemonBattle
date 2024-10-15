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
      gridTemplateColumns: {
        "1-2-1": "1fr 2fr 1fr"
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
        },
        pokemonHealth: {
          low: "var(--pokemon-health-low)",
          high: "var(--pokemon-health-high)",
        }
      },
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
       },
      keyframes: {
        'shake' : {
            '10%, 90%': {
                transform: 'translate3d(-1px, 0, 0)'
            },
            '20%, 80%' : {
                transform: 'translate3d(2px, 0, 0)'
            },
            '30%, 50%, 70%': {
                transform: 'translate3d(-4px, 0, 0)'
            },
            '40%, 60%': {
                transform: 'translate3d(4px, 0, 0)'
            }
        }
      }
      
    },
  },
  plugins: [],
}

