'use client'

import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'

import { Button, Card, Skeleton, useDisclosure } from '@heroui/react'
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

  if (isLoading)
    return (
      <ContainerComponent className='py-8'>
        <div className='min-h-[calc(100vh-300px)] space-y-8 pt-16'>

          <div className='flex items-center justify-between'>
            <Skeleton className='h-8 w-48 rounded-lg' />

            <Skeleton className='h-10 w-36 rounded-lg' />
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (

              <Card key={i} className='space-y-5 p-4' radius='lg'>
                <Skeleton className='rounded-lg'>
                  <div className='bg-default-300 h-24 rounded-lg'></div>
                </Skeleton>

                <div className='space-y-3'>
                  <Skeleton className='w-3/5 rounded-lg'>
                    <div className='bg-default-200 h-3 w-3/5 rounded-lg'></div>
                  </Skeleton>

                  <Skeleton className='w-4/5 rounded-lg'>
                    <div className='bg-default-200 h-3 w-4/5 rounded-lg'></div>
                  </Skeleton>

                  <Skeleton className='w-2/5 rounded-lg'>
                    <div className='bg-default-300 h-3 w-2/5 rounded-lg'></div>
                  </Skeleton>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </ContainerComponent>
    )

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
