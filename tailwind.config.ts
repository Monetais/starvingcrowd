import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.10)",
        glow: "0 28px 80px rgba(99, 102, 241, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
