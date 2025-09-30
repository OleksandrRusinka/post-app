'use client'

import { useTranslations } from 'next-intl'
import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react'

import { useCreatePost } from '@/entities/api/posts'
import type { CreatePostDto } from '@/entities/models'

// interface
interface IProps {
  isOpen: boolean
  onOpenChange: () => void
}

// component
const CreatePostModal: FC<IProps> = (props) => {
  const { isOpen, onOpenChange } = props
  const t = useTranslations()

  const createPostMutation = useCreatePost()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostDto>({
    mode: 'onChange',
  })

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  const onSubmit = (data: CreatePostDto) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        reset()
        onOpenChange()
      },
    })
  }

  // return
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      size='2xl'
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
            <ModalHeader className='text-2xl font-bold text-gray-900'>{t('create_post_title')}</ModalHeader>

            <ModalBody>
              <div className='space-y-6'>
                <Controller
                  name='title'
                  control={control}
                  rules={{
                    required: t('title_required'),
                    minLength: { value: 5, message: t('title_min_length') },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t('post_title_placeholder')}
                      variant='bordered'
                      size='lg'
                      isInvalid={!!errors.title}
                      errorMessage={errors.title?.message}
                    />
                  )}
                />

                <Controller
                  name='body'
                  control={control}
                  rules={{
                    required: t('body_required'),
                    minLength: { value: 20, message: t('body_min_length') },
                  }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder={t('post_body_placeholder')}
                      variant='bordered'
                      size='lg'
                      minRows={6}
                      isInvalid={!!errors.body}
                      errorMessage={errors.body?.message}
                    />
                  )}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <div className='flex w-full flex-col gap-2'>
                {createPostMutation.isError && (
                  <p className='px-1 text-sm font-medium text-red-500'>{t('create_error')}</p>
                )}

                <div className='flex justify-end gap-2'>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}
                    size='lg'
                    isDisabled={createPostMutation.isPending}
                  >
                    {t('cancel')}
                  </Button>

                  <Button
                    color='primary'
                    type='submit'
                    size='lg'
                    isLoading={createPostMutation.isPending}
                    className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-blue-700'
                  >
                    {createPostMutation.isPending ? t('creating') : t('submit_create')}
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

export default CreatePostModal
