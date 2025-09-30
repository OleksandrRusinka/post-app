'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { Button, Pagination, useDisclosure } from '@heroui/react'

import { PostCard } from '@/app/(client)/shared/ui/post-card'
import type { Post } from '@/entities/models'
import { CreatePostModal } from '@/features/create-post-modal'
import { EditPostModal } from '@/features/edit-post-modal'
import { POSTS_PER_PAGE } from '@/shared/constants'
import { usePostsPaginated } from '@/shared/hooks'

// interface
interface IProps {}

// component
const PostListModule: FC<IProps> = () => {
  const t = useTranslations()
  const [currentPage, setCurrentPage] = useState(1)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure()

  const { data: posts, isLoading, totalPages } = usePostsPaginated({ page: currentPage, limit: POSTS_PER_PAGE })

  const currentPosts = posts || []

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    onEditOpen()
  }

  const handleCloseEditModal = () => {
    setEditingPost(null)
    onEditOpenChange()
  }

  if (isLoading) return <div className='py-16 text-center text-gray-500'>{t('loading_posts')}</div>

  if (currentPosts.length === 0 && !isLoading && currentPage === 1)
    return (
      <div className='flex min-h-[calc(100vh-300px)] items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>📝</div>
          <h3 className='mb-2 text-xl font-semibold text-gray-900'>{t('no_posts')}</h3>

          <p className='mb-6 text-gray-600'>{t('no_posts_description')}</p>

          <Button color='primary' onPress={onCreateOpen}>
            {t('create_first_post')}
          </Button>
        </div>
        <CreatePostModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />
      </div>
    )

  // return
  return (
    <>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{t('latest_posts')}</h2>

          <Button color='primary' onPress={onCreateOpen}>
            ✏️ {t('create_post_button')}
          </Button>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {currentPosts.map((post: Post, index: number) => (
            <PostCard key={`post-${post.id}-${index}`} post={post} onEdit={handleEditPost} />
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
      <CreatePostModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />
      <EditPostModal isOpen={isEditOpen} onOpenChange={handleCloseEditModal} post={editingPost} />
    </>
  )
}

export default PostListModule
