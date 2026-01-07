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
        black: '#1a1a1a',
        primary: {
          DEFAULT: '#ff6600',
          light: '#ff8533',
          dark: '#cc5200',
        },
        dark: {
          DEFAULT: '#1a1a1a',      // Deep black base - smoother than #2e2e2e
          light: '#252525',        // Subtle elevation - flows from DEFAULT
          lighter: '#2f2f2f',      // Medium elevation - natural progression
          lightest: '#3a3a3a',     // Highest elevation - smooth top
          'text-primary': '#f5f5f5',   // Softer white - less harsh
          'text-secondary': '#d4d4d4', // Warm gray - better flow
          'text-muted': '#a3a3a3',      // Balanced muted - not too dark
          'text-subtle': '#737373',    // Subtle but readable
          border: '#3a3a3a',           // Matches lightest for harmony
          'border-subtle': '#2f2f2f',  // Matches lighter for consistency
        },
        light: {
          DEFAULT: '#f8f6f3',
          light: '#f5f3ef',
          lighter: '#f2f0eb',
          lightest: '#efede8',
          border: '#e8e6e1',
          'border-subtle': '#f0eee9',
          text: '#1c1b18',
          'text-muted': '#6b675f',
          'text-subtle': '#9a968d',
          surface: '#ffffff',
          'surface-elevated': '#fcfbf9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
