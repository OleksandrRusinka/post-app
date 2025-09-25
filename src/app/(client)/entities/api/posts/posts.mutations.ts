import React from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, PostFilters } from '@/entities/models'
import { usePostsStore } from '@/shared/store'
import { filterPosts, selectUserPosts, sortPosts } from '@/shared/utils'

import { postsMutationApi } from './posts.api'
import { postByIdOptions, postsListOptions } from './posts.query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: postsMutationApi.create,
    onSuccess: (newPost) => {
      store.addSavedPost(newPost)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostDto> }) => postsMutationApi.update({ id, data }),
    onSuccess: (updatedPost) => {
      if (updatedPost.source === 'user') {
        store.updateSavedPost(updatedPost.id, updatedPost)
      }
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts', 'detail', updatedPost.id] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const store = usePostsStore()

  return useMutation({
    mutationFn: async (id: number) => {
      const userPost = store.getSavedPost(id)
      if (userPost?.source === 'user') {
        store.removeSavedPost(id)
      }
      await postsMutationApi.delete({ id })
      return id
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.removeQueries({ queryKey: ['posts', 'detail', deletedId] })
    },
  })
}

export const usePost = (id: string | number) => {
  const store = usePostsStore()
  const userPost = store.getSavedPost(Number(id))

  const query = useQuery({
    ...postByIdOptions(Number(id)),
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

export const usePosts = (filters: PostFilters = {}) => {
  const store = usePostsStore()
  const query = useQuery(postsListOptions())

  const data = React.useMemo(() => {
    if (!query.data) return undefined

    const userPosts = selectUserPosts(store.savedPosts)
    const filteredUserPosts = filterPosts(userPosts, filters)
    const allPosts = [...filteredUserPosts, ...query.data]
    const filteredAllPosts = filterPosts(allPosts, filters)

    return sortPosts(filteredAllPosts)
  }, [query.data, store.savedPosts, filters])

  return {
    ...query,
    data,
  }
}
