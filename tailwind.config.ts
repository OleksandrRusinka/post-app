import type { Config } from 'tailwindcss'

import { heroui } from '@heroui/react'

// tailwind config
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { sm: '768px', md: '1024px', lg: '1360px' },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d766e',
          hover: '#0b6a63',
        },
        blue: {
          primary: '#007AFF',
          hover: '#005FCC',
          light: '#F0F7FF',
          default: '#006FEE',
        },
        base: {
          DEFAULT: '#2C3345',
          dark: '#2B2D42',
        },
        gray: {
          DEFAULT: '#454F69',
          dark: '#444F69',
        },
        background: {
          light: '#F6FBFF',
        },
        border: {
          light: '#E2E8F0',
          blue: '#D9E7FF',
          gray: '#E5EBFA',
        },
      },
      fontSize: {
        '2.7xl': ['28px', { lineHeight: '1.2' }],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        dividerWeight: '1px',
        disabledOpacity: 0.5,
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '1rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.75rem',
        },
        radius: {
          small: '6px',
          medium: '10px',
          large: '12px',
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#0d766e',
            },
          },
        },
      },
    }),
  ],
}

export default config
