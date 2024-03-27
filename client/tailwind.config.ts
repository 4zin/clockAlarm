import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "violet": "url('../public/violet-bg.webp')"
      },
      colors: {
        "primary": {
          100: "#00A9A5",
          200: "#0B5351"
        },
        "accents": {
          100: "#30011E",
          200: "#4E8098",
          300: "#5A80AD",
          400: '#C3C3E6'
        }
      },
    },
  },
  plugins: [],
};
export default config;
