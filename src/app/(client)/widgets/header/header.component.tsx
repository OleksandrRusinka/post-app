'use client'

import { useTranslations } from 'next-intl'
import { FC, useMemo } from 'react'

import { useSupabasePosts } from '@/entities/api/posts'
import { Link } from '@/pkg/libraries/locale'
import { usePostsStore } from '@/shared/store'
import { LanguageSwitcherComponent } from '@/shared/ui/language-switcher'

// interface
interface IProps {}

// component
const HeaderComponent: FC<IProps> = () => {
  const t = useTranslations()
  const localSavedPosts = usePostsStore((state) => state.savedPosts)
  const { data: supabasePosts = [] } = useSupabasePosts()

  const savedPostsCount = useMemo(() => {
    const localPosts = localSavedPosts.filter((post) => post.source !== 'user')
    const allPosts = [...supabasePosts, ...localPosts]

    const uniquePosts = allPosts.filter((post, index, arr) => arr.findIndex((p) => p.id === post.id) === index)

    return uniquePosts.length
  }, [localSavedPosts, supabasePosts])

  // return
  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <Link
            href='/'
            className='flex items-center space-x-2 font-bold text-gray-900 transition-colors hover:text-blue-600'
          >
            <span className='text-2xl'>📝</span>

            <span className='text-xl'>{t('header_blog_title')}</span>
          </Link>

          <nav className='flex items-center space-x-6'>
            <Link
              href='/'
              className='rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
            >
              {t('header_all_posts')}
            </Link>

            <Link
              href='/posts/saved'
              className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
            >
              {t('header_saved_posts')}
              {savedPostsCount > 0 && (
                <span className='rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800'>
                  {savedPostsCount}
                </span>
              )}
            </Link>

            <LanguageSwitcherComponent />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent
