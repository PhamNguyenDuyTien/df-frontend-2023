import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      boxShadow: {
        'theme-mode': "inset 0px 5px 15px rgba(0, 0, 0, 0.3), inset 0px -5px 15px rgba(255, 255, 255, 0.3)",
        'theme-after': "0 5px 10px rgba(0, 0, 0, 0.2)",
      }
    },
    colors: {
      "black": "#000",
      "black-1": "#242424",
      "white": "#fff",
      "gray": "#cdcdcd",
      "gray-2": "#777",
      "green": '#35b429',
      "blue": "#046ce4",
      "main": "#d3455a",
      "main-sub": "rgba(248, 210, 5, 0.3)",
      "overlay": "rgba(0, 0, 0, 0.5)",
      "linear-1": "linear-gradient(180deg, #777, #3a3a3a)",
    },
  },
  plugins: [],
}
export default config
