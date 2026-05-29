import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ELM brand palette
        forest: {
          DEFAULT: "#14352A", // vert profond (primaire)
          deep: "#14352A",
          light: "#2E5E45", // vert forêt (secondaire)
        },
        gold: {
          DEFAULT: "#C9A24B", // or doux (accent)
          dark: "#B08D3C",
        },
        cream: "#FAF6EC", // fond clair
        sand: "#E8E0CE", // neutre
        ink: "#1A1A14", // texte principal
      },
      fontFamily: {
        heading: ["var(--font-tajawal)", "sans-serif"],
        body: ["var(--font-almarai)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(20, 53, 42, 0.12)",
        gold: "0 6px 24px -6px rgba(201, 162, 75, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
