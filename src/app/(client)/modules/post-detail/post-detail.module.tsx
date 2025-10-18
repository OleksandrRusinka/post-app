'use client'

import { ArrowLeft, Calendar, Edit, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { Button, Card, CardBody, CardHeader, Chip, Divider, Skeleton } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'

import { supabasePostByIdQueryOptions } from '@/entities/api/database'
import { postByIdQueryOptions } from '@/entities/api/posts'
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

  const isNumeric = !postId.includes('-') && !isNaN(parseInt(postId, 10))

  const { data: jsonPost, isLoading: isLoadingJson } = useQuery({
    ...postByIdQueryOptions({ id: parseInt(postId, 10) }),
    enabled: isNumeric,
  })

  const { data: supabasePost, isLoading: isLoadingSupabase } = useQuery({
    ...supabasePostByIdQueryOptions({ id: postId }),
    enabled: !isNumeric,
  })

  const post = isNumeric ? jsonPost : supabasePost

  const isLoading = isLoadingJson || isLoadingSupabase

  const { getPostType, handleDeletePost, deletePostMutation } = usePostActions()

  if (isLoading) {
    return (
      <ContainerComponent className='py-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <Card className='border-2 border-gray-100 p-2 shadow-lg'>

            <CardHeader className='flex-col gap-4 pb-4'>
              <Skeleton className='h-10 w-3/4 rounded-lg' />

              <div className='flex gap-4'>
                <Skeleton className='h-6 w-32 rounded-full' />
              </div>

            </CardHeader>

            <Divider />

            <CardBody className='gap-3 pt-6'>
              <Skeleton className='h-4 w-full rounded-lg' />
              <Skeleton className='h-4 w-full rounded-lg' />
              <Skeleton className='h-4 w-4/5 rounded-lg' />
              <Skeleton className='h-4 w-full rounded-lg' />
              <Skeleton className='h-4 w-3/4 rounded-lg' />
            </CardBody>

          </Card>

          <div className='flex flex-col items-center gap-3 border-t border-gray-200 pt-6'>
            <Skeleton className='h-12 w-48 rounded-lg' />
          </div>

        </div>
      </ContainerComponent>
    )
  }

  const postData = post as IPost

  const { isUserPost } = getPostType(postData)

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
          {isUserPost && (
            <div className='flex flex-wrap justify-center gap-3'>
              <Button
                as={Link}
                href='/supabase-posts'
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
            </div>
          )}

          <Button as={Link} href='/' color='primary' size='lg' className='flex items-center gap-2 px-8 font-semibold'>

            <ArrowLeft className='h-4 w-4' /> {t('back_to_posts')}

          </Button>
        </div>
      </div>
    </ContainerComponent>
  )
}

export default PostDetailModule
