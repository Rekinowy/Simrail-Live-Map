import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "820px",
      lg: "1220px",
      xl: "1440px",
      "2xl": "1700px",
      "3xl": "1920px",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#2b3d4f",
        primary_light: "#3A5269",
        primary_dark: "#1D2935",
        light_primary: "#c9d4e3",
        light_primary_light: "#E4EAF1",
        light_primary_dark: "#AEBFD5",
        light_gray: "#D4CECE",
      },
    },
  },
  plugins: [
    nextui(),
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
  darkMode: "class",
};

export default config;
