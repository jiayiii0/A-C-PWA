import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F9FBFF",
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
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(37, 99, 235, 0.08)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
