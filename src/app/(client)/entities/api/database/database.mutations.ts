import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ICreatePostDto, IUpdatePostDto } from '@/entities/models'

import { createPostMutationApi, deletePostMutationApi, updatePostMutationApi } from './database.api'
import { supabasePostsQueryOptions } from './database.query'

// CREATE
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ICreatePostDto) => createPostMutationApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// UPDATE
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IUpdatePostDto) => updatePostMutationApi(data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts', 'detail', updatedPost.id] })
    },
  })
}

// DELETE
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deletePostMutationApi({ id }),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ['posts', 'detail', deletedId] })
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

// SUPABASE POSTS
export const useSupabasePosts = () => {
  return useQuery(supabasePostsQueryOptions())
}
