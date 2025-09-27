import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'

import { AnalyticTrackerComponent } from '@/app/(client)/shared/components/analytic-tracker'
import { fontClassNames } from '@/config/fonts/font'
import { LayoutModule } from '@/modules/layout'
import RestApiProvider from '@/pkg/libraries/rest-api/rest-api.provider'
import UiProvider from '@/pkg/libraries/ui/ui.provider'

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
      <body className={fontClassNames} suppressHydrationWarning>
        <UiProvider>
          <RestApiProvider>
            <AnalyticTrackerComponent />
            <LayoutModule>{children}</LayoutModule>
          </RestApiProvider>
        </UiProvider>
      </body>
    </html>
  )
}

export default RootLayout
