import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'

import { AnalyticTrackerComponent } from '@/components/analytic-tracker'
import { LayoutModule } from '@/modules/layout'

import Providers from './(app)/providers'

import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
  description: 'Modern blog application built with Next.js',
  keywords: 'blog, nextjs, react, typescript',
}

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children } = props

  // return
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        <Providers>
          <AnalyticTrackerComponent />
          <LayoutModule>{children}</LayoutModule>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
