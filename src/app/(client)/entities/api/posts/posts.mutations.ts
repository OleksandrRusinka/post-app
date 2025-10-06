import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, PostFilters } from '@/entities/models'
import { filterPosts, sortPosts } from '@/shared/utils'

import { createPost, deletePost, fetchSupabasePosts, updatePost } from './posts.api'
import { postByIdOptions, postsListOptions } from './posts.query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreatePostDto> }) => updatePost({ id, data }),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts', 'detail', updatedPost.id] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deletePost({ id }),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['supabase-posts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.removeQueries({ queryKey: ['posts', 'detail', deletedId] })
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
    ...postByIdOptions(numericId),
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
  return useQuery({
    queryKey: ['supabase-posts'],
    queryFn: fetchSupabasePosts,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export const usePosts = (filters: PostFilters = {}) => {
  const supabaseQuery = useQuery({
    queryKey: ['supabase-posts'],
    queryFn: fetchSupabasePosts,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  })

  const fakejsonQuery = useQuery(postsListOptions())

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
