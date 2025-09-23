import React from 'react'

import { queryOptions, useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, Post } from '@/entities/models'
import { usePostsStore } from '@/shared/store'

import { postsApi } from './posts.api'

// interface
interface PostFilters {
  search?: string
  userId?: number
  source?: 'fakejson' | 'user'
}

export const postsQueryKeys = {
  root: ['posts'] as const,
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters: PostFilters = {}) => [...postsQueryKeys.lists(), filters] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...postsQueryKeys.details(), id] as const,
}

export const postsQueryOptions = {
  all: (filters: PostFilters = {}) =>
    queryOptions({
      queryKey: postsQueryKeys.list(filters),
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

export const useCreatePost = (options?: UseMutationOptions<Post, Error, CreatePostDto>) => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (data) => {
      store.addSavedPost(data)
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.root })
    },
    ...options,
  })
}

export const useUpdatePost = (
  options?: UseMutationOptions<Post, Error, { id: number; data: Partial<CreatePostDto> }>,
) => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostDto> }) => postsApi.updatePost(id, data),
    onSuccess: (data) => {
      if (data.source === 'user') {
        store.updateSavedPost(data.id, data)
      }
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.root })
    },
    ...options,
  })
}

export const useDeletePost = (options?: UseMutationOptions<void, Error, number>) => {
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
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.root })
    },
    ...options,
  })
}

const selectUserPosts = (savedPosts: Post[]) => savedPosts.filter((post) => post.source === 'user')

const filterPosts = (posts: Post[], filters: PostFilters) => {
  let filteredPosts = posts

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) => post.title.toLowerCase().includes(searchLower) || post.body.toLowerCase().includes(searchLower),
    )
  }

  if (filters.userId) {
    filteredPosts = filteredPosts.filter((post) => post.userId === filters.userId)
  }

  if (filters.source) {
    filteredPosts = filteredPosts.filter((post) => post.source === filters.source)
  }

  return filteredPosts
}

const sortPosts = (posts: Post[]) => {
  return posts.sort((a, b) => {
    if (a.id < 0 && b.id > 0) return -1
    if (a.id > 0 && b.id < 0) return 1
    return b.id - a.id
  })
}

export const usePosts = (filters: PostFilters = {}) => {
  const store = usePostsStore()
  const query = useQuery(postsQueryOptions.all())

  const data = React.useMemo(() => {
    if (!query.data) return undefined

    const userPosts = selectUserPosts(store.savedPosts)
    const allPosts = [...userPosts, ...query.data]
    const filteredPosts = filterPosts(allPosts, filters)

    return sortPosts(filteredPosts)
  }, [query.data, store.savedPosts, filters])

  return {
    ...query,
    data,
  }
}

export const usePost = (id: string | number) => {
  const store = usePostsStore()
  const userPost = store.getSavedPost(Number(id))

  const query = useQuery({
    ...postsQueryOptions.byId(id),
    enabled: !userPost || userPost.source !== 'user',
  })

  return userPost?.source === 'user'
    ? { ...query, data: userPost, isLoading: false, error: null, isError: false }
    : query
}
