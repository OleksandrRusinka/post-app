import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

// interface
interface IProps {
  isMobileMenuOpen: boolean
  handleCloseMobileMenu: () => void
}

// Animation
const mobileMenuVariant = {
  closed: {
    x: '100%',
    transition: { duration: 0.3, ease: 'easeInOut' as const },
  },
  opened: {
    x: 0,
    transition: { duration: 0.3, ease: 'easeInOut' as const },
  },
}

// component
const MobileMenuComponent: FC<IProps> = (props) => {
  const { isMobileMenuOpen, handleCloseMobileMenu } = props

  const t = useTranslations()

  // return
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            className='fixed inset-0 z-[90] lg:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseMobileMenu}
          />

          <motion.div
            className='fixed top-16 right-0 z-[95] flex h-[calc(100vh-4rem)] w-full max-w-full flex-col overflow-y-auto bg-white shadow-xl md:w-[384px] lg:hidden'
            variants={mobileMenuVariant}
            initial='closed'
            animate='opened'
            exit='closed'
          >
            <nav className='flex flex-col gap-2 px-6 py-6'>
              <Link
                href='/fake_posts'
                className='rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
                onClick={handleCloseMobileMenu}
              >
                {t('header_all_posts')}
              </Link>

              <Link
                href='/supabase-posts'
                className='rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
                onClick={handleCloseMobileMenu}
              >
                {t('header_supabase_posts')}
              </Link>

              <div className='my-2 border-t border-gray-200'></div>

              <Link
                href='/login'
                className='rounded-lg border border-[#0D766E] px-4 py-3 text-center  font-medium text-[#0D766E] transition-colors hover:bg-[#0D766E] hover:text-white'
                onClick={handleCloseMobileMenu}
              >
                Log In
              </Link>
              <Link
                href='/start'
                className='rounded-lg bg-[#0D766E] px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-[#0b6a63]'
                onClick={handleCloseMobileMenu}
              >
                Start Test
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenuComponent
