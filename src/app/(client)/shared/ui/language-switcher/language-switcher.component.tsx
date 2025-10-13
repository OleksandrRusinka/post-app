'use client'

import { Check, ChevronDown, Globe } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FC } from 'react'

import { usePathname, useRouter } from '@/pkg/libraries/locale'

// interface
interface IProps {}

// languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' },
]

// component
const LanguageSwitcherComponent: FC<IProps> = () => {
  const router = useRouter()

  const pathname = usePathname()

  const { locale } = useParams()

  const currentLang = languages.find((lang) => lang.code === locale)

  const handleChange = (newLocale: string) => {
    if (newLocale !== locale) router.replace(pathname, { locale: newLocale })
  }

  // return
  return (
    <div className='group relative'>
      <button
        className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
        aria-label='Change language'
      >
        <Globe className='h-4 w-4' />

        <span className='hidden sm:inline'>{currentLang?.name}</span>

        <ChevronDown className='h-4 w-4 transition-transform group-hover:rotate-180' />
      </button>

      <div className='invisible absolute top-full right-0 z-50 mt-2 w-48 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
        <div className='rounded-lg border border-gray-200 bg-white py-1 shadow-lg'>
          {languages.map(({ code, name }) => {
            const isActive = locale === code
            return (
              <button
                key={code}
                onClick={() => handleChange(code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                  isActive ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700'
                }`}
              >
                <Globe className='h-4 w-4' />

                <span>{name}</span>

                {isActive && <Check className='ml-auto h-4 w-4' />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcherComponent
