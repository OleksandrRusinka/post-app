'use client'

import { ArrowLeft, Calendar, Edit, Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC } from 'react'

import { Button, Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react'

import { usePostBySlug } from '@/entities/api/posts'
import type { Post } from '@/entities/models'
import { usePostActions } from '@/shared/hooks'
import { ContainerComponent } from '@/shared/ui'

// interface
interface IProps {
  postId: string
}

// component
const PostDetailModule: FC<IProps> = (props) => {
  const { postId } = props

  const { data: post, isLoading, error } = usePostBySlug(postId)
  const { getPostType, handleToggleSave, handleDeletePost, deletePostMutation } = usePostActions()

  if (isLoading) {
    return (
      <ContainerComponent className='py-8'>
        <div className='mx-auto max-w-4xl text-center text-gray-500'>Loading post...</div>
      </ContainerComponent>
    )
  }

  if (error || !post) notFound()

  const postData = post as Post
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
                <span>{new Date().toLocaleDateString()}</span>
              </Chip>
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
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  size='sm'
                  onPress={handleDelete}
                  className='flex items-center gap-2 font-medium'
                >
                  <Trash2 className='h-4 w-4' /> Remove from Saved
                </Button>
              </>
            )}

            {isUserPost && (
              <>
                <Button
                  as={Link}
                  href='/saved'
                  color='warning'
                  variant='flat'
                  size='sm'
                  className='flex items-center gap-2 font-medium'
                >
                  <Edit className='h-4 w-4' /> Edit
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  size='sm'
                  onPress={handleDelete}
                  isLoading={deletePostMutation.isPending}
                  className='flex items-center gap-2 font-medium'
                >
                  <Trash2 className='h-4 w-4' /> Delete
                </Button>
              </>
            )}
          </div>

          <Button as={Link} href='/' color='primary' size='lg' className='flex items-center gap-2 px-8 font-semibold'>
            <ArrowLeft className='h-4 w-4' /> Back to All Posts
          </Button>
        </div>
      </div>
    </ContainerComponent>
  )
}

export default PostDetailModule
