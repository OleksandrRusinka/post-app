'use client'

import { ArrowLeft, Calendar, Edit, Heart, Trash2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { Button, Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react'

import { usePostBySlug } from '@/entities/api/posts'
import type { IPost } from '@/entities/models'
import { usePostActions } from '@/features/post-actions'
import { Link } from '@/pkg/libraries/locale'
import { ContainerComponent } from '@/shared/ui/container'

// interface
interface IProps {
  postId: string
}

// component
const PostDetailModule: FC<IProps> = (props) => {
  const { postId } = props
  const t = useTranslations()

  const { data: post, isLoading, error } = usePostBySlug(postId)
  const { getPostType, handleToggleSave, handleDeletePost, deletePostMutation } = usePostActions()

  if (isLoading) {
    return (
      <>
        <ContainerComponent className='py-8'>
          <div className='mx-auto max-w-4xl text-center text-gray-500'>{t('loading_post')}</div>
        </ContainerComponent>
      </>
    )
  }

  if (error || !post) notFound()

  const postData = post as IPost
  const { isUserPost, isFakeJsonPost, isSaved } = getPostType(postData)

  const handleDelete = () => handleDeletePost(postData, { redirectTo: '/' })

  // return
  return (
    <ContainerComponent className='py-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <Card
          className={`border-2 p-2 shadow-lg ${isUserPost ? 'border-green-100 bg-green-50/30' : 'border-gray-100'}`}
        >
          <CardHeader className='justify-between pb-4'>
            <h1 className='p-2 text-center text-3xl font-bold text-gray-900 md:text-4xl'>{postData.title}</h1>

            <div className='mt-3 flex flex-wrap justify-center gap-4 text-sm text-gray-600'>
              <Chip size='sm' variant='flat' className='flex items-center gap-1 p-2'>
                <Calendar className='h-3 w-3' />
                <span>{new Date(postData.created_at).toLocaleDateString()}</span>
              </Chip>

              {isUserPost && (
                <Chip size='sm' variant='flat' color='success' className='flex items-center gap-1 p-2'>
                  {t('your_post')}
                </Chip>
              )}
            </div>
          </CardHeader>

          <Divider />

          <CardBody className='pt-6'>
            <div className='prose prose-lg prose-gray max-w-none'>
              <p className='whitespace-pre-wrap text-gray-700'>{postData.body}</p>
            </div>
          </CardBody>
        </Card>
        <div className='flex flex-col items-center gap-3 border-t border-gray-200 pt-6'>
          <div className='flex flex-wrap justify-center gap-3'>
            {isFakeJsonPost && (
              <>
                <Button
                  color={isSaved ? 'danger' : 'default'}
                  variant='flat'
                  size='sm'
                  onPress={() => handleToggleSave(postData)}
                  className='flex items-center gap-2 font-medium'
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? t('saved') : t('save')}
                </Button>

                <Button
                  color='danger'
                  variant='flat'
                  size='sm'
                  onPress={handleDelete}
                  className='flex items-center gap-2 font-medium'
                >
                  <Trash2 className='h-4 w-4' /> {t('remove_from_saved')}
                </Button>
              </>
            )}

            {isUserPost && (
              <>
                <Button
                  as={Link}
                  href='/posts/saved'
                  color='warning'
                  variant='flat'
                  size='sm'
                  className='flex items-center gap-2 font-medium'
                >
                  <Edit className='h-4 w-4' /> {t('edit')}
                </Button>

                <Button
                  color='danger'
                  variant='flat'
                  size='sm'
                  onPress={handleDelete}
                  isLoading={deletePostMutation.isPending}
                  className='flex items-center gap-2 font-medium'
                >
                  <Trash2 className='h-4 w-4' /> {t('delete')}
                </Button>
              </>
            )}
          </div>

          <Button as={Link} href='/' color='primary' size='lg' className='flex items-center gap-2 px-8 font-semibold'>
            <ArrowLeft className='h-4 w-4' /> {t('back_to_posts')}
          </Button>
        </div>
      </div>
    </ContainerComponent>
  )
}

export default PostDetailModule
