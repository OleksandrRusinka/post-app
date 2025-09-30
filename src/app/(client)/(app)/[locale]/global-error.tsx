'use client'

import { useTranslations } from 'next-intl'
import { type FC, useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'

// interface
interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

// component
const GlobalError: FC<IProps> = (props) => {
  const t = useTranslations()
  const { error, reset } = props

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  // return
  return (
    <html lang='en'>
      <body>
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
          <div className='relative mx-auto max-w-lg space-y-8 rounded-3xl bg-white p-10 text-center shadow-xl'>
            <div className='absolute -top-10 -left-10 h-32 w-32 rounded-full bg-red-100 opacity-50 blur-3xl'></div>
            <div className='absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-orange-100 opacity-50 blur-3xl'></div>
            <div className='relative z-10'>
              <div className='mb-4 animate-bounce text-8xl'>⚠️</div>
              <h1 className='text-center text-4xl font-extrabold text-gray-900'>{t('error_title')}</h1>

              <p className='m-4 mx-auto max-w-xs text-lg leading-relaxed text-gray-600'>{t('error_description')}</p>

              <button
                onClick={reset}
                className='mt-6 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg'
              >
                {t('error_retry')}
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
