'use client'

import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react'

import { useUpdatePost } from '@/entities/api/posts'
import type { CreatePostDto, Post } from '@/entities/models'

// interface
interface IProps {
  isOpen: boolean
  onOpenChange: () => void
  post: Post | null
}

// component
const EditPostModal: FC<IProps> = (props) => {
  const { isOpen, onOpenChange, post } = props

  const updatePostMutation = useUpdatePost()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostDto>({
    mode: 'onChange',
  })

  useEffect(() => {
    if (isOpen && post) {
      reset({
        title: post.title,
        body: post.body,
        userId: post.userId,
      })
    }
    if (!isOpen) reset()
  }, [isOpen, post, reset])

  const onSubmit = (data: CreatePostDto) => {
    if (!post) return
    updatePostMutation.mutate(
      { id: post.id, data },
      {
        onSuccess: () => {
          onOpenChange()
          reset()
        },
      },
    )
  }

  // return
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      size='2xl'
      isDismissable
      backdrop='blur'
      shouldBlockScroll
      classNames={{
        backdrop: 'backdrop-blur-md bg-black/60 !z-[9998]',
        wrapper:
          'flex items-center justify-center min-h-screen w-full h-full !z-[9999] fixed top-0 left-0 right-0 bottom-0',
        base: 'max-w-2xl w-full mx-4 !z-[10000] bg-white rounded-xl shadow-2xl border border-gray-200/50',
        header: 'bg-transparent border-b border-gray-200/60 px-6 py-5',
        body: 'bg-transparent px-6 py-6',
        footer: 'bg-transparent border-t border-gray-200/60 px-6 py-5',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)} className='bg-transparent'>
            <ModalHeader className='text-2xl font-bold text-gray-900'>Edit Post</ModalHeader>

            <ModalBody>
              <div className='space-y-6'>
                <Controller
                  name='title'
                  control={control}
                  rules={{
                    required: 'Title is required',
                    minLength: { value: 5, message: 'Title must be at least 5 characters' },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Enter your post title...'
                      variant='bordered'
                      size='lg'
                      isInvalid={!!errors.title}
                      errorMessage={errors.title?.message}
                      classNames={{
                        inputWrapper:
                          'border-2 border-gray-300/70 hover:border-blue-400 focus-within:border-blue-500 bg-gray-50/50 rounded-lg px-4 py-3 data-[invalid=true]:border-red-400',
                        input: 'text-gray-900 text-base placeholder-gray-500 font-medium outline-none',
                      }}
                    />
                  )}
                />

                <Controller
                  name='body'
                  control={control}
                  rules={{
                    required: 'Content is required',
                    minLength: { value: 20, message: 'Content must be at least 20 characters' },
                  }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder='Write your post content here...'
                      variant='bordered'
                      size='lg'
                      minRows={6}
                      isInvalid={!!errors.body}
                      errorMessage={errors.body?.message}
                      classNames={{
                        inputWrapper:
                          'border-2 border-gray-300/70 hover:border-blue-400 focus-within:border-blue-500 bg-gray-50/50 rounded-lg px-4 py-3 w-full data-[invalid=true]:border-red-400',
                        input:
                          'text-gray-900 text-base placeholder-gray-500 font-medium resize-none leading-relaxed outline-none',
                      }}
                    />
                  )}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <div className='flex w-full flex-col gap-2'>
                {updatePostMutation.isError && (
                  <p className='px-1 text-sm font-medium text-red-500'>Failed to update post. Please try again.</p>
                )}

                <div className='flex justify-end gap-3'>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}
                    size='lg'
                    isDisabled={updatePostMutation.isPending}
                    className='px-6 font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600'
                  >
                    Cancel
                  </Button>

                  <Button
                    color='primary'
                    type='submit'
                    size='lg'
                    isLoading={updatePostMutation.isPending}
                    className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-blue-700'
                  >
                    {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditPostModal
