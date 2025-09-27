import { Inter, Poppins, Roboto_Mono } from 'next/font/google'

// main font
export const mainFont = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const headingFont = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
})

export const monoFont = Roboto_Mono({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-roboto-mono',
})

export const fontClassNames = `${mainFont.variable} ${headingFont.variable} ${monoFont.variable}`

export const fontVariables = {
  '--font-inter': mainFont.style.fontFamily,
  '--font-poppins': headingFont.style.fontFamily,
  '--font-roboto-mono': monoFont.style.fontFamily,
} as const
