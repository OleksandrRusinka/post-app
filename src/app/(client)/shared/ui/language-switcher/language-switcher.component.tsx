'use client'

import { useParams } from 'next/navigation'
import { FC } from 'react'

import { usePathname, useRouter } from '@/pkg/libraries/locale'

// interface
interface IProps {}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
]

// component
const LanguageSwitcherComponent: FC<IProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = params.locale as string

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale })
  }

  // return
  return (
    <div className='group relative'>
      <button
        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
        aria-label='Change language'
      >
        <span className='text-lg'>{languages.find((lang) => lang.code === currentLocale)?.flag}</span>
        <span className='hidden sm:inline'>{languages.find((lang) => lang.code === currentLocale)?.name}</span>
        <svg
          className='h-4 w-4 transition-transform group-hover:rotate-180'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <div className='invisible absolute top-full right-0 z-50 mt-2 w-48 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
        <div className='rounded-lg border border-gray-200 bg-white py-1 shadow-lg'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                currentLocale === lang.code ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className='text-lg'>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLocale === lang.code && (
                <svg className='ml-auto h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcherComponent
