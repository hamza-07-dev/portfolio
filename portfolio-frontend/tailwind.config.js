/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-elevated": "var(--bg-elevated)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--border-color)",
        text: "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        cyan: {
          DEFAULT: "#22D3EE",
          400: "#22D3EE",
          500: "#06B6D4",
        },
        blue: {
          DEFAULT: "#3B82F6",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
        },
        indigo: {
          DEFAULT: "#6366F1",
          400: "#818CF8",
          500: "#6366F1",
        },
        purple: "#8B5CF6",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #22D3EE 0%, #3B82F6 50%, #6366F1 100%)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 36px rgba(34,211,238,0.28)",
        "glow-blue": "0 0 40px rgba(59,130,246,0.3)",
        card: "var(--shadow-card)",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
