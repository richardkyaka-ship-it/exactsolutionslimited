import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6600',
          light: '#ff8533',
          dark: '#cc5200',
        },
        dark: {
          DEFAULT: '#000000',
          light: '#0a0a0a',
          lighter: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
}
export default config
