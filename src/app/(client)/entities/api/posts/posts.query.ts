import React from 'react'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, Post } from '@/entities/models'
import { usePostsStore } from '@/shared/store'

import { postsApi } from './posts.api'

export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...postsQueryKeys.lists(), { filters }] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...postsQueryKeys.details(), id] as const,
}

export const postsQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: postsQueryKeys.lists(),
      queryFn: postsApi.getAllPosts,
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
    }),

  byId: (id: string | number) =>
    queryOptions({
      queryKey: postsQueryKeys.detail(id),
      queryFn: () => postsApi.getPostById(id),
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
    }),
}

export const usePosts = () => {
  const store = usePostsStore()
  const query = useQuery(postsQueryOptions.all())

  const data = React.useMemo(() => {
    if (!query.data) return undefined

    const userPosts = store.savedPosts.filter((p) => p.source === 'user')
    const apiPosts = query.data

    const allPosts = [...userPosts, ...apiPosts]
    return allPosts.sort((a, b) => {
      if (a.id < 0 && b.id > 0) return -1
      if (a.id > 0 && b.id < 0) return 1

      return b.id - a.id
    })
  }, [query.data, store.savedPosts])

  return {
    ...query,
    data,
  }
}

export const usePost = (id: string | number) => {
  const store = usePostsStore()

  const query = useQuery(postsQueryOptions.byId(id))

  const userPost = store.getSavedPost(Number(id))
  if (userPost && userPost.source === 'user') {
    return {
      ...query,
      data: userPost,
      isLoading: false,
      error: null,
      isError: false,
    }
  }

  return query
}

export const useCreatePost = (options?: { onSuccess?: (data: Post) => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: (data: CreatePostDto) => postsApi.createPost(data),
    onSuccess: (data) => {
      store.addSavedPost(data)

      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })

      options?.onSuccess?.(data)
    },
    onError: options?.onError,
  })
}

export const useUpdatePost = (options?: { onSuccess?: (data: Post) => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostDto> }) => postsApi.updatePost(id, data),
    onSuccess: (data) => {
      if (data.source === 'user') {
        store.updateSavedPost(data.id, data)
      }

      queryClient.invalidateQueries({ queryKey: postsQueryKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })

      options?.onSuccess?.(data)
    },
    onError: options?.onError,
  })
}

export const useDeletePost = (options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: async (id: number) => {
      const userPost = store.getSavedPost(id)
      if (userPost && userPost.source === 'user') {
        store.removeSavedPost(id)
      }

      await postsApi.deletePost(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })
      options?.onSuccess?.()
    },
    onError: options?.onError,
  })
}
