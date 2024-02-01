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
    screens: {
      xs: '420px',
      sm: '640px',
      md: '820px',
      lg: '1220px',
      xl: '1220px',
      '2xl': '1440px',
      '3xl': '1700px',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2b3d4f',
        primary_light: '#2b4259',
        primary_dark: '#1c2b3b',
        'light-gray': '#D4CECE',
      },
    },
  },
  plugins: [nextui(),
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements', }),],
  
};

export default config;
