'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { Button, useDisclosure } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'

import { supabasePostsQueryOptions } from '@/entities/api/database'
import type { IPost } from '@/entities/models'
import { CreatePostModal } from '@/features/create-post-modal'
import { EditPostModal } from '@/features/edit-post-modal'
import { ContainerComponent } from '@/shared/ui/container'
import { PostCard } from '@/shared/ui/post-card'

// interface
interface IProps {}

// component
const SupabasePostsModule: FC<IProps> = () => {
  const t = useTranslations()

  const [editingPost, setEditingPost] = useState<IPost | null>(null)

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure()

  const { data: supabasePosts = [], isLoading } = useQuery(supabasePostsQueryOptions())

  const handleEditPost = (post: IPost) => {
    setEditingPost(post)
    onEditOpen()
  }

  const handleCloseEditModal = () => {
    setEditingPost(null)
    onEditOpenChange()
  }

  if (isLoading) return <div className='py-16 text-center text-gray-500'>{t('loading_posts')}</div>

  if (supabasePosts.length === 0 && !isLoading)
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
      <ContainerComponent className='py-8'>
        <div className='space-y-8 pt-16'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>{t('supabase_posts_title')}</h2>

            <Button color='primary' onPress={onCreateOpen}>
              ✏️ {t('create_post_button')}
            </Button>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {supabasePosts.map((post: IPost) => (
              <PostCard key={post.id} post={post} onEdit={handleEditPost} isChangeText={false} />
            ))}
          </div>
        </div>

        <CreatePostModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />

        <EditPostModal isOpen={isEditOpen} onOpenChange={handleCloseEditModal} post={editingPost} />

      </ContainerComponent>
    </>
  )
}

export default SupabasePostsModule
