'use client'

import { useTranslations } from 'next-intl'
import { type FC, useEffect } from 'react'

import { Button } from '@heroui/react'
import * as Sentry from '@sentry/nextjs'

// interface
interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

// component
const Error: FC<IProps> = (props) => {
  const { error, reset } = props
  const t = useTranslations()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  // return
  return (
    <div className='flex min-h-[calc(100vh-200px)] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='relative mx-auto max-w-lg space-y-8 rounded-3xl bg-white p-10 text-center shadow-xl'>
        <div className='absolute -top-10 -left-10 h-32 w-32 rounded-full bg-red-100 opacity-50 blur-3xl'></div>
        <div className='absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-orange-100 opacity-50 blur-3xl'></div>
        <div className='relative z-10'>
          <div className='mb-4 animate-bounce text-8xl'>⚠️</div>
          <h1 className='text-center text-4xl font-extrabold text-gray-900'>{t('error_title')}</h1>

          <p className='m-4 mx-auto max-w-xs text-lg leading-relaxed text-gray-600'>{t('error_description')}</p>

          <Button
            onPress={reset}
            color='primary'
            size='lg'
            className='mt-6 px-8 py-3 font-semibold shadow-md transition hover:shadow-lg'
          >
            {t('error_retry')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Error
