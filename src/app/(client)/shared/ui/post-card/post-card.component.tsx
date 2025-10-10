'use client'

import { Edit, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { Button, Card, CardBody, CardHeader } from '@heroui/react'

import type { IPost } from '@/entities/models'
import { usePostActions } from '@/features/post-actions'
import { trackPostViewed } from '@/pkg/integration/mixpanel'
import { Link } from '@/pkg/libraries/locale'

// interface
interface IProps {
  post: IPost
  onEdit?: (post: IPost) => void
  isChangeText: boolean
}

// component
const PostCard: FC<IProps> = (props) => {
  const { post, onEdit, isChangeText } = props

  const t = useTranslations()

  // Different text for A/B test
  const readMoreButtonText = isChangeText ? t('view_details') : t('read_more')

  const { getPostType, handleDeletePost, deletePostMutation } = usePostActions()
  const { isUserPost } = getPostType(post)

  const handleDelete = () => handleDeletePost(post)

  const handleReadMore = () => {
    trackPostViewed({
      post_id: post.id,
      title: post.title,
      variant: isChangeText ? 'text_variant' : 'control',
    })
  }

  // return
  return (
    <Card
      className={`flex h-full flex-col border-2 p-2 ${
        isUserPost ? 'border-green-100 bg-green-50/30' : 'border-gray-100'
      }`}
      shadow='none'
    >
      <CardHeader className='pb-2'>
        <div className='flex w-full items-start justify-between gap-3'>
          <h3 className='line-clamp-2 flex-1 text-lg font-semibold text-gray-900'>{post.title}</h3>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs ${
              isUserPost ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {isUserPost ? t('your_post') : `#${post.id}`}
          </span>
        </div>
      </CardHeader>

      <CardBody className='flex flex-1 flex-col pt-0'>
        <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600'>{post.body}</p>

        <div className='mt-auto border-t border-gray-100 pt-3'>
          <div className='flex items-center justify-between gap-2'>
            <Button
              as={Link}
              href={`/posts/${post.id}`}
              size='sm'
              color='secondary'
              variant='flat'
              className='font-medium'
              onPress={handleReadMore}
            >
              {readMoreButtonText}
            </Button>

            {isUserPost && onEdit && (
              <div className='flex items-center gap-2'>
                <Button
                  isIconOnly
                  size='sm'
                  variant='flat'
                  color='warning'
                  className='h-8 min-w-8'
                  onPress={() => onEdit(post)}
                  title={t('edit_post')}
                >
                  <Edit className='h-3 w-3' />
                </Button>

                <Button
                  isIconOnly
                  size='sm'
                  variant='flat'
                  color='danger'
                  className='h-8 min-w-8'
                  onPress={handleDelete}
                  isLoading={deletePostMutation.isPending}
                  title={t('delete_post')}
                >
                  <Trash2 className='h-3 w-3' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default PostCard
