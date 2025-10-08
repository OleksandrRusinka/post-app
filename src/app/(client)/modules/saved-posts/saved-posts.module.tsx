'use client'

import { useTranslations } from 'next-intl'
import { FC, useMemo, useState } from 'react'

import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react'

import { useSupabasePosts } from '@/entities/api/posts'
import type { IPost } from '@/entities/models'
import { EditPostModal } from '@/features/edit-post-modal'
import { Link } from '@/pkg/libraries/locale'
import { usePostActions } from '@/shared/hooks'
import { usePostsStore } from '@/shared/store'
import { ContainerComponent } from '@/shared/ui/container'

// interface
interface IProps {}

// component
const SavedPostsModule: FC<IProps> = () => {
  const t = useTranslations()
  const localSavedPosts = usePostsStore((state) => state.savedPosts)
  const { data: supabasePosts = [], isLoading } = useSupabasePosts()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [editingPost, setEditingPost] = useState<IPost | null>(null)

  const { handleDeletePost, deletePostMutation } = usePostActions()

  const savedPosts = useMemo(() => {
    const localPosts = localSavedPosts.filter((post) => post.source !== 'user')
    const allPosts = [...supabasePosts, ...localPosts]

    return allPosts.filter((post, index, arr) => arr.findIndex((p) => p.id === post.id) === index)
  }, [localSavedPosts, supabasePosts])

  const handleEdit = (post: IPost) => {
    setEditingPost(post)
    onOpen()
  }

  const handleDelete = (post: IPost) => handleDeletePost(post)

  const handleCloseEditModal = () => {
    setEditingPost(null)
    onOpenChange()
  }

  if (isLoading) {
    return (
      <ContainerComponent className='py-8'>
        <div className='py-16 text-center text-gray-500'>{t('loading_posts')}</div>
      </ContainerComponent>
    )
  }

  // return
  return (
    <ContainerComponent className='py-8'>
      <div className='space-y-8'>
        <div className='space-y-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900'>{t('saved_posts_title')}</h1>

          <p className='mx-auto max-w-2xl text-lg text-gray-600'>{t('saved_posts_subtitle')}</p>
        </div>

        {savedPosts.length === 0 ? (
          <div className='flex min-h-[calc(100vh-300px)] items-center justify-center'>
            <div className='text-center'>
              <div className='mb-4 text-6xl'>📝</div>

              <h3 className='mb-2 text-xl font-semibold text-gray-900'>{t('no_saved')}</h3>

              <p className='mb-6 text-gray-600'>{t('no_saved_description')}</p>

              <Button as={Link} href='/' color='primary'>
                {t('go_to_all_posts')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {savedPosts.map((post: IPost, index: number) => {
              const isUserPost = post.source === 'user' || (typeof post.id === 'number' && post.id < 0)

              return (
                <Card
                  key={`saved-post-${post.id}-${index}`}
                  className={`flex h-full flex-col border-2 p-2 ${
                    isUserPost ? 'border-green-100 bg-green-50/30' : 'border-blue-100 bg-blue-50/30'
                  }`}
                  shadow='none'
                >
                  <CardHeader className='pb-2'>
                    <div className='flex w-full items-start justify-between gap-3'>
                      <h3 className='line-clamp-2 flex-1 text-lg font-semibold text-gray-900'>{post.title}</h3>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                          isUserPost ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {isUserPost ? t('your_post') : t('saved')}
                      </span>
                    </div>
                  </CardHeader>

                  <CardBody className='flex flex-1 flex-col pt-0'>
                    <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600'>{post.body}</p>

                    <div className='mt-auto space-y-2 border-t border-gray-100 pt-2'>
                      <div className='flex gap-2 text-center'>
                        <Button
                          as={Link}
                          href={`/posts/${post.id}`}
                          size='sm'
                          color='primary'
                          variant='flat'
                          className='flex-1 font-medium'
                        >
                          {t('view')}
                        </Button>
                      </div>

                      {post.source === 'user' || (typeof post.id === 'number' && post.id < 0) ? (
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            color='warning'
                            variant='flat'
                            className='flex-1 font-medium'
                            onPress={() => handleEdit(post)}
                          >
                            {t('edit')}
                          </Button>

                          <Button
                            size='sm'
                            color='danger'
                            variant='flat'
                            className='flex-1 font-medium'
                            onPress={() => handleDelete(post)}
                            isLoading={deletePostMutation.isPending}
                          >
                            {t('delete')}
                          </Button>
                        </div>
                      ) : (
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            color='danger'
                            variant='flat'
                            className='flex-1 font-medium'
                            onPress={() => handleDelete(post)}
                          >
                            {t('remove_from_saved')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        )}

        <EditPostModal isOpen={isOpen} onOpenChange={handleCloseEditModal} post={editingPost} />
      </div>
    </ContainerComponent>
  )
}

export default SavedPostsModule
