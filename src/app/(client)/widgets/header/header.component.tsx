'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { type FC, useEffect, useState } from 'react'

import { MobileMenuComponent } from '@/widgets/mobile-menu'

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
            <Image src='/icons/main-logo.svg' alt='logo' width={100} height={100} />
          </Link>

          <div className='flex items-center gap-2 sm:gap-3'>
            <nav className='hidden items-center space-x-1 lg:flex'>
              <Link
                href='/fake_posts'
                className='rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
              >
                {t('header_all_posts')}
              </Link>

              <Link
                href='/supabase-posts'
                className='rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
              >
                {t('header_supabase_posts')}
              </Link>
            </nav>

            <div className='hidden items-center gap-3 lg:flex'>
              <Link
                href='/login'
                className='border-primary text-primary hover:bg-primary rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:text-white'
              >
                {t('btn_login')}
              </Link>

              <Link
                href='/start'
                className='bg-primary hover:bg-primary-hover rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors'
              >
                {t('btn_start_test')}
              </Link>
            </div>

            <button
              onClick={handleToggleMobileMenu}
              className='flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenuComponent isMobileMenuOpen={isMobileMenuOpen} handleCloseMobileMenu={handleCloseMobileMenu} />
    </>
  )
}

export default HeaderComponent
