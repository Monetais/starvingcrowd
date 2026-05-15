import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        border: "rgba(201, 208, 228, 0.50)",
        "border-strong": "rgba(201, 208, 228, 0.80)",
        accent: {
          DEFAULT: "#2563eb",
          light: "#eff4ff",
          muted: "#3b82f6"
        }
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};

export default config;
