/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🔥 ADD THIS LINE

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        glow: "0 0 42px rgba(59, 130, 246, 0.28)",
      },

      keyframes: {
        slowPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.88" },
          "50%": { transform: "scale(1.045)", opacity: "1" },
        },
        softFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      animation: {
        "slow-pulse": "slowPulse 3s ease-in-out infinite",
        "soft-float": "softFloat 5s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};