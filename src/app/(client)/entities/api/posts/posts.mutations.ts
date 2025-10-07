import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ICreatePostDto, IPostFilters, IUpdatePostDto } from '@/entities/models'
import { filterPosts, sortPosts } from '@/shared/utils'

import { createPostMutationApi, deletePostMutationApi, updatePostMutationApi } from './posts.api'
import { postByIdQueryOptions, postsQueryOptions, supabasePostsQueryOptions } from './posts.query'

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

export const usePost = (id: string | number) => {
  const supabaseQuery = useSupabasePosts()
  const supabasePosts = supabaseQuery.data || []
  const supabasePost = supabasePosts.find((post) => String(post.id) === String(id))

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
  const shouldFetchFakejson = !supabasePost && !supabaseQuery.isLoading && !isNaN(numericId)

  const fakejsonQuery = useQuery({
    ...postByIdQueryOptions({ id: numericId }),
    enabled: shouldFetchFakejson,
  })

  const post = supabasePost || fakejsonQuery.data
  const isLoading = supabaseQuery.isLoading || (shouldFetchFakejson && fakejsonQuery.isLoading)
  const isError = supabaseQuery.isError || (shouldFetchFakejson && fakejsonQuery.isError)
  const error = supabaseQuery.error || fakejsonQuery.error

  return {
    data: post,
    isLoading,
    isError,
    error,
    isPending: supabaseQuery.isPending || (shouldFetchFakejson && fakejsonQuery.isPending),
  }
}

export const usePostBySlug = (slug: string) => usePost(slug)

export const useSupabasePosts = () => {
  return useQuery(supabasePostsQueryOptions())
}

export const usePosts = (filters: IPostFilters = {}) => {
  const supabaseQuery = useQuery(supabasePostsQueryOptions())
  const fakejsonQuery = useQuery(postsQueryOptions())

  const supabasePosts = supabaseQuery.data || []
  const fakejsonPosts = fakejsonQuery.data || []

  const filteredSupabasePosts = filterPosts(supabasePosts, filters)
  const filteredFakejsonPosts = filterPosts(fakejsonPosts, filters)
  const allPosts = [...filteredSupabasePosts, ...filteredFakejsonPosts]
  const sortedPosts = sortPosts(allPosts)

  return {
    data: sortedPosts,
    isLoading: supabaseQuery.isLoading || fakejsonQuery.isLoading,
    isError: supabaseQuery.isError || fakejsonQuery.isError,
    error: supabaseQuery.error || fakejsonQuery.error,
    isPending: supabaseQuery.isPending || fakejsonQuery.isPending,
  }
}
