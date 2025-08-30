import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      redPrimary: '#c8102e',
      redLight: '#e06666',
      redDark: '#9e0d23',
      blackPrimary: '#1a1a1a',
      whitePrimary: '#ffffff',
      primary: '#c8102e',
      secondary: '#9e0d23',
      accent: '#e06666',
    },
    extend: {
      backgroundImage: {
        'founders-pattern': "url('/founderscrop.jpg')",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
export default config
