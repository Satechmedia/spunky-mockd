import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderColor: {
        primary: '#21272A',
        secondary: '#A7A8B1',
      },
      textColor: {
        secondary: '#3E3F66',
        primary: '#21272A',
        placeholder: '#697077',
      },
      backgroundColor: {
        input: '#F2F4F8',
        primary: '#EC1560',
        secondary: '#3E3F66',
        tertiary: '#FCCEF0',
        secondaryDark: '#3E3F6680',
        tertiaryDark: '#28204a',
      },
      accentColor: {
        primary: '#EC1560',
      },
    },
  },
  darkMode: ['class'],
  plugins: [],
};
export default config;

