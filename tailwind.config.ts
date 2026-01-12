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
          DEFAULT: '#e8e4de',      // Softer, dimmer base - reduced from #f8f6f3
          light: '#e3dfd9',        // Subtle elevation - flows from DEFAULT
          lighter: '#dedad4',       // Medium elevation - natural progression
          lightest: '#d9d5cf',      // Highest elevation - smooth top
          border: '#d4d0ca',       // More visible but still subtle
          'border-subtle': '#e0dcd6', // Matches lighter for consistency
          text: '#2a2824',          // Softer than pure black - easier on eyes
          'text-muted': '#6b675f',   // Balanced muted - unchanged
          'text-subtle': '#9a968d', // Subtle but readable - unchanged
          surface: '#f0ece6',       // Dimmer white - warmer tone
          'surface-elevated': '#ede9e3', // Elevated surface - softer
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
