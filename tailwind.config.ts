import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gamee)'],
        inter: ['var(--font-inter)']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs' : '400px'
      }
    },
    colors: {
      "primary-white": "#ffffff",
      "primary-black": "#000000",
      "primary-dark-blue": "#040E43",
      "primary-pink": "#ff73d4",
    }
  },
  plugins: [],
};
export default config;
