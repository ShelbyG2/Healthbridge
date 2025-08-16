/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-bg": "#F8FAFC",
        "dark-bg": "#0F172A",

        "light-surface": "#FFFFFF",
        "dark-surface": "#1E293B",

        "light-text": "#1E3A8A", // Primary blue from light mode
        "dark-text": "#F1F5F9", // Light off-white for dark mode primary text

        "light-secondary": "#6B7280", // Gray for labels in light mozde
        "dark-secondary": "#94A3B8", // Lighter gray for labels in dark mode

        "light-accent": "#14B8A6", // Button teal in light mode
        "dark-accent": "#06B6D4", // Button teal in dark mode (slightly brighter)

        "light-success": "#22C55E", // Logo green
        "dark-success": "#22C55E", // Logo green (retained)

        "light-border": "#ADD8E6", // Input field border in light mode
        "dark-border": "#475569", // Input field border in dark mode

        "light-input-text": "#1E3A8A", // Input text color in light mode
        "dark-input-text": "#F1F5F9", // Input text color in

        "light-error": "#DC2626", // Assuming this is an error color, keeping it for now
        "dark-error": "#FF6B6B", // Assuming this is an error color, keeping it for now

        "light-hover": "#2CAAA6", // Assuming this is a hover color, keeping it for now
        "dark-hover": "#258E8A", // Assuming this is a hover color, keeping it for now

        "light-disabled": "#E5E7EB", // Assuming this is a disabled color, keeping it for now
        "dark-disabled": "#5C6770", // Assuming this is a disabled color, keeping it for now

        "light-logo-blue": "#06B6D4", // Logo teal
        "dark-logo-blue": "#06B6D4", // Logo teal

        "light-bg-shape1": "#F8FAFC",
        "dark-bg-shape1": "#0F172A",

        "light-bg-highlight": "#5b76c2", // Light mode background highlight
        "dark-bg-highlight": "#1E3A8A", // Dark mode background highlight

        "light-bg-shape2": "#042361",
        "dark-bg-shape2": "#031230",
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(6, 182, 212, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".glass-effect": {
          background: "rgba(255, 255, 255, 0.05)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".neon-border": {
          "box-shadow":
            '0 0 5px theme("colors.primary.500"), 0 0 20px theme("colors.primary.500")',
        },
        ".card-hover": {
          transform: "translateY(-5px)",
          transition: "all 0.3s ease",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
