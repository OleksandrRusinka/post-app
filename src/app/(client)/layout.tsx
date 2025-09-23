import type { Metadata } from 'next'

import '@/config/styles/globals.css'
import { LayoutModule } from '@/modules/layout'
import { AnalyticTrackerComponent } from '@/components/analytic-tracker'

import Providers from './(app)/providers'
import { FC, ReactNode } from 'react'

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
