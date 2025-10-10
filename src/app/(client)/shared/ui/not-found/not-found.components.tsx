'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { Button } from '@heroui/react'

import { Link } from '@/pkg/libraries/locale'

// interface
interface IProps {}

// component
const NotFoundComponent: FC<IProps> = () => {
  const t = useTranslations()

  // return
  return (
    <div className='relative mx-auto max-w-lg space-y-8 rounded-3xl bg-white p-10 text-center shadow-xl'>
      <div className='absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-100 opacity-50 blur-3xl'></div>
      <div className='absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-100 opacity-50 blur-3xl'></div>
      <div className='relative z-10'>
        <div className='mb-4 animate-bounce text-8xl'>🔍</div>

        <h1 className='text-center text-4xl font-extrabold text-gray-900'>{t('not_found_title')}</h1>

        <p className='m-4 mx-auto max-w-xs text-lg leading-relaxed text-gray-600'>{t('not_found_description')}</p>

        <Button
          as={Link}
          href='/'
          color='primary'
          size='lg'
          className='mt-6 px-8 py-3 font-semibold shadow-md transition hover:shadow-lg'
        >
          {t('not_found_button')}
        </Button>
      </div>
    </div>
  )
}

export default NotFoundComponent
