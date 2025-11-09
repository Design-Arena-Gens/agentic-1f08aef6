import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)"],
      },
      colors: {
        primary: {
          DEFAULT: "#ff6b2c",
          dark: "#e25b20",
          light: "#ff9870",
        },
        accent: {
          DEFAULT: "#1c6dd0",
          dark: "#0f4f9d",
          light: "#4d91f0",
        },
        surface: {
          DEFAULT: "#111418",
          muted: "#1f242b",
        },
        neutral: {
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5f5",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      boxShadow: {
        glow: "0 10px 40px rgba(28, 109, 208, 0.25)",
        "inner-glow": "inset 0 0 20px rgba(255, 107, 44, 0.2)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        precise: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-4px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s var(--slide-delay, 0ms) forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
