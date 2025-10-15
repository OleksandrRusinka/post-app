import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { FC, ReactNode } from 'react'

import { fontClassNames } from '@/config/fonts/font'
import { LayoutModule } from '@/modules/layout'
import { MixpanelProvider } from '@/pkg/integration/mixpanel'
import { routing } from '@/pkg/libraries/locale'
import RestApiProvider from '@/pkg/libraries/rest-api/rest-api.provider'
import UiProvider from '@/pkg/libraries/ui/ui.provider'

import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// generate static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'nextJs Blog'
  const description = 'Modern blog application built with Next.js'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: description,
      siteName: title,
      type: 'website',
    },
  }
}

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props

  const { locale } = await params

  setRequestLocale(locale)

  // return
  return (
    <html lang={locale} className='overflow-x-hidden'>
      <body className={`${fontClassNames} overflow-x-hidden`} suppressHydrationWarning>
        <MixpanelProvider>
          <NextIntlClientProvider>
            <UiProvider>
              <RestApiProvider>
                <LayoutModule>{children}</LayoutModule>
              </RestApiProvider>
            </UiProvider>
          </NextIntlClientProvider>
        </MixpanelProvider>
      </body>
    </html>
  )
}

export default RootLayout
