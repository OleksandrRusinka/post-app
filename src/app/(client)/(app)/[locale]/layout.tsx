import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { FC, ReactNode } from 'react'

import { AnalyticTrackerComponent } from '@/app/(client)/shared/components/analytic-tracker'
import { fontClassNames } from '@/config/fonts/font'
import { LayoutModule } from '@/modules/layout'
import { routing } from '@/pkg/libraries/locale'
import RestApiProvider from '@/pkg/libraries/rest-api/rest-api.provider'
import UiProvider from '@/pkg/libraries/ui/ui.provider'

import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// metadata
export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
  description: 'Modern blog application built with Next.js',
  keywords: 'blog, nextjs, react, typescript',
}

// generate static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'uk' | 'de')) {
    notFound()
  }

  const messages = await getMessages()

  // return
  return (
    <html lang={locale}>
      <body className={fontClassNames} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <UiProvider>
            <RestApiProvider>
              <AnalyticTrackerComponent />
              <LayoutModule>{children}</LayoutModule>
            </RestApiProvider>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
