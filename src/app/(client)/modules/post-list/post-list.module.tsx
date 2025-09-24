'use client'

import { FC, useState } from 'react'

import { Button, Pagination, useDisclosure } from '@heroui/react'

import type { Post } from '@/entities/models'
import { usePostsPaginated } from '@/shared/ui'

import { CreatePostModal, EditPostModal, PostCard } from '../../features'

// interface
interface IProps {}

const POSTS_PER_PAGE = 6

// component
const PostListModule: FC<IProps> = () => {
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

  if (isLoading) return <div className='py-16 text-center text-gray-500'>Loading posts...</div>

  if (currentPosts.length === 0 && !isLoading && currentPage === 1)
    return (
      <div className='flex min-h-[calc(100vh-300px)] items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>📝</div>
          <h3 className='mb-2 text-xl font-semibold text-gray-900'>No posts yet</h3>
          <p className='mb-6 text-gray-600'>Be the first to create a post!</p>
          <Button color='primary' onPress={onCreateOpen}>
            Create First Post
          </Button>
        </div>
        <CreatePostModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />
      </div>
    )

  return (
    <>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Latest Posts</h2>
          <Button color='primary' onPress={onCreateOpen}>
            ✏️ Create Post
          </Button>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {currentPosts.map((post: Post, index: number) => (
            <PostCard key={`post-${post.id}-${index}`} post={post} onEdit={handleEditPost} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page) => {
              setCurrentPage(page)
            }}
            className='z-0 mx-auto'
            size='sm'
            isDisabled={isLoading}
            color='primary'
            showControls
            isCompact
          />
        )}
      </div>

      <CreatePostModal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} />
      <EditPostModal isOpen={isEditOpen} onOpenChange={handleCloseEditModal} post={editingPost} />
    </>
  )
}

export default PostListModule
