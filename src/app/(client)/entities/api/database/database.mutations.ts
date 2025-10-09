import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ICreatePostDto, IUpdatePostDto } from '@/entities/models'

import { createPostMutationApi, deletePostMutationApi, updatePostMutationApi } from './database.api'

// CREATE
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ICreatePostDto) => createPostMutationApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
    },
  })
}

// UPDATE
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IUpdatePostDto) => updatePostMutationApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
    },
  })
}

// DELETE
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deletePostMutationApi({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
    },
  })
}
