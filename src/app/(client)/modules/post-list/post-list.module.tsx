'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { Pagination } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'

import { postsQueryOptions } from '@/entities/api/posts'
import type { IPost } from '@/entities/models'
import { usePostsPaginated } from '@/features/posts-pagination'
import { POSTS_PER_PAGE } from '@/shared/constants/common.constants'
import { PostCard } from '@/shared/ui/post-card'

// interface
interface IProps {
  isChangeText: boolean
}

// component
const PostListModule: FC<IProps> = (props) => {
  const { isChangeText } = props

  const t = useTranslations()

  const [currentPage, setCurrentPage] = useState(1)

  const { data: jsonPosts = [], isLoading } = useQuery(postsQueryOptions())

  const { data: paginatedPosts, totalPages } = usePostsPaginated({
    posts: jsonPosts,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  })

  if (isLoading) return <div className='py-16 text-center text-gray-500'>{t('loading_posts')}</div>

  if (paginatedPosts.length === 0 && !isLoading && currentPage === 1)
    return (
      <div className='flex min-h-[calc(100vh-300px)] items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>📝</div>

          <h3 className='mb-2 text-xl font-semibold text-gray-900'>{t('no_posts')}</h3>

          <p className='mb-6 text-gray-600'>{t('no_posts_description')}</p>
        </div>
      </div>
    )

  // return
  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>

        <h2 className='text-2xl font-bold'>{t('latest_posts')}</h2>

      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {paginatedPosts.map((post: IPost, index: number) => (
          <PostCard key={`post-${post.id}-${index}`} post={post} isChangeText={isChangeText} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center py-8'>
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page) => {
              setCurrentPage(page)
            }}
            size='lg'
            isDisabled={isLoading}
            color='primary'
            showControls
            variant='bordered'
            className='gap-2'
          />
        </div>
      )}
    </div>
  )
}

export default PostListModule
