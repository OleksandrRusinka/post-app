'use client'

import { Brain, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

import ModalMenuComponent from '@/app/(client)/shared/components/modal-menu/modal-menu-components'
import { LanguageSwitcherComponent } from '@/shared/ui/language-switcher'

// interface
interface IProps {}

// component
const HeaderComponent: FC<IProps> = () => {
  const t = useTranslations()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCloseMobileMenu = (): void => setIsMobileMenuOpen(false)
  const handleToggleMobileMenu = (): void => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'visible'
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isMobileMenuOpen])

  // return
  return (
    <>
      <header className='fixed top-0 right-0 left-0 z-[100] w-full border-b border-gray-200 bg-white shadow-sm'>
        <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8'>
          <Link href='/' className='flex shrink-0 items-center gap-1.5 transition-opacity hover:opacity-80 sm:gap-2'>
            <Brain size={24} className='sm:h-7 sm:w-7' />
            <span className='text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl'>myIQ</span>
          </Link>

          <nav className='hidden items-center space-x-1 lg:flex'>
            <Link
              href='/fake_posts'
              className='rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
            >
              {t('header_all_posts')}
            </Link>

            <Link
              href='/supabase-posts'
              className='rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
            >
              {t('header_supabase_posts')}
            </Link>

            <div className='ml-2'>
              <LanguageSwitcherComponent />
            </div>
          </nav>

          <div className='hidden items-center gap-3 lg:flex'>
            <Link
              href='/login'
              className='rounded-lg border border-[#0D766E] px-4 py-2 text-sm font-medium whitespace-nowrap text-[#0D766E] transition-colors hover:bg-[#0D766E] hover:text-white'
            >
              Log In
            </Link>

            <Link
              href='/start'
              className='rounded-lg bg-[#0D766E] px-6 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#0b6a63]'
            >
              Start Test
            </Link>
          </div>

          <button
            onClick={handleToggleMobileMenu}
            className='flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <ModalMenuComponent isMobileMenuOpen={isMobileMenuOpen} handleCloseMobileMenu={handleCloseMobileMenu} />

      <div className='h-16' />
    </>
  )
}

export default HeaderComponent
