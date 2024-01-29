import type { Config } from 'tailwindcss';

const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2b3d4f',
        primary_light: '#2b4259',
        primary_dark: '#1c2b3b',
        'light-gray': '#f4f4f4',
      },
    },
  },
  plugins: [nextui(),
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements', }),],
  
};

export default config;
