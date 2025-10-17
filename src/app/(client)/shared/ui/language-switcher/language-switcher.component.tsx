'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FC } from 'react'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'

import { usePathname, useRouter } from '@/pkg/libraries/locale'

// interfaces
interface IProps {
  className?: string
}

// constants
const languages = [
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' },
]

// component
const LanguageSwitcherComponent: FC<Readonly<IProps>> = (props) => {
  const { className = '' } = props

  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0]

  const handleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale })
    }
  }

  // return
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Button
          variant='bordered'
          className={`flex items-center gap-2 rounded-xl border border-[#5a6b82] bg-[#0b2239] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-gray-400 hover:text-gray-300 ${className}`}
        >
          {currentLang.name}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label='Change language' onAction={(key) => handleChange(String(key))} className='bg-white'>
        {languages.map(({ code, name }) => (
          <DropdownItem
            key={code}
            endContent={locale === code ? <Check className='h-4 w-4 text-blue-500' /> : null}
            className={`text-sm ${locale === code ? 'font-semibold text-blue-600' : 'text-gray-800'}`}
          >
            {name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LanguageSwitcherComponent
