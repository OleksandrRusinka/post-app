import React from 'react'

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, Post } from '@/entities/models'
import { usePostsStore } from '@/shared/store'

import { postsApi } from './posts.api'

// interface
interface PostFilters {
  search?: string
  userId?: number
  source?: 'fakejson' | 'user'
}

export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters?: PostFilters) => [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...postsKeys.details(), { id }] as const,
}

export const postsOptions = {
  all: (filters: PostFilters = {}) =>
    queryOptions({
      queryKey: postsKeys.list(filters),
      queryFn: async () => {
        const posts = await postsApi.getAllPosts()
        return filterPosts(posts, filters)
      },
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    }),

  byId: (id: string | number) =>
    queryOptions({
      queryKey: postsKeys.detail(id),
      queryFn: () => postsApi.getPostById(id),
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    }),
}

export const usePost = (id: string | number) => {
  const store = usePostsStore()
  const userPost = store.getSavedPost(Number(id))

  const query = useQuery({
    ...postsOptions.byId(id),
    enabled: !userPost || userPost.source !== 'user',
  })

  return userPost?.source === 'user'
    ? {
        ...query,
        data: userPost,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
      }
    : query
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (newPost) => {
      store.addSavedPost(newPost)
      queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
  })
}

export const useUpdatePost = () => {
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostDto> }) => postsApi.updatePost(id, data),
    onSuccess: (updatedPost) => {
      if (updatedPost.source === 'user') {
        store.updateSavedPost(updatedPost.id, updatedPost)
      }
      queryClient.invalidateQueries({ queryKey: postsKeys.all })
      queryClient.invalidateQueries({ queryKey: postsKeys.detail(updatedPost.id) })
    },
  })
}

export const useDeletePost = () => {
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: async (id: number) => {
      const userPost = store.getSavedPost(id)
      if (userPost?.source === 'user') {
        store.removeSavedPost(id)
      }
      await postsApi.deletePost(id)
      return id
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all })
      queryClient.removeQueries({ queryKey: postsKeys.detail(deletedId) })
    },
  })
}

const filterPosts = (posts: Post[], filters: PostFilters = {}): Post[] => {
  let filteredPosts = [...posts]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase().trim()
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

const sortPosts = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    if (a.id < 0 && b.id > 0) return -1
    if (a.id > 0 && b.id < 0) return 1
    return Math.abs(b.id) - Math.abs(a.id)
  })
}

const selectUserPosts = (savedPosts: Post[]): Post[] => savedPosts.filter((post) => post.source === 'user')

export const usePosts = (filters: PostFilters = {}) => {
  const store = usePostsStore()
  const query = useQuery(postsOptions.all(filters))

  const data = React.useMemo(() => {
    if (!query.data) return undefined

    const userPosts = selectUserPosts(store.savedPosts)
    const filteredUserPosts = filterPosts(userPosts, filters)
    const allPosts = [...filteredUserPosts, ...query.data]

    return sortPosts(allPosts)
  }, [query.data, store.savedPosts, filters])

  return {
    ...query,
    data,
  }
}
