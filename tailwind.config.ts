import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#EEF4F8",
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E2E8F0",
        primary: "#2563EB",
        cyan: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(15, 23, 42, 0.10)",
        card: "0 8px 24px rgba(15, 23, 42, 0.05)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
