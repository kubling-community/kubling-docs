import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroyLight: ['gilroy-light'],
        gilroyExtraBold: ['gilroy-extra-bold'],
        gilroyMedium: ['gilroy-medium'],
        gilroyHeavy: ['gilroy-heavy'],
        gilroyBold: ['gilroy-bold'],
        gilroyRegular: ['gilroy-regular']
      },
      colors: {
        'kubling-green': '#26a69a',
        'kubling-green-hover': '#5baaa2',
        'kubling-light-green': '#67e9a2',
        'kubling-dark-violet': '#0b0122',
        'kubling-med-violet': '#571b96',
        'kubling-light-violet': '#863ae8',
      }
    }
  }
};
export default config;
