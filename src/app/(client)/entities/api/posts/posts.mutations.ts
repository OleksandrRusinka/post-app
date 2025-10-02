import { useMemo } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreatePostDto, PostFilters } from '@/entities/models'
import { filterPosts, sortPosts } from '@/shared/utils'

import { createPost, deletePost, fetchSupabasePosts, updatePost } from './posts.api'
import { postByIdOptions, postsListOptions } from './posts.query'

const QUERY_KEYS = {
  supabasePosts: ['supabase-posts'] as const,
  posts: ['posts'] as const,
  postDetail: (id: number | string) => ['posts', 'detail', id] as const,
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.supabasePosts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Partial<CreatePostDto> }) => updatePost({ id, data }),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.supabasePosts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postDetail(updatedPost.id) })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => deletePost({ id }),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.supabasePosts })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.postDetail(deletedId) })
    },
  })
}

export const usePost = (id: string | number) => {
  const { data: supabasePosts = [], isLoading: isLoadingSupabase } = useSupabasePosts()

  const supabasePost = useMemo(() => supabasePosts.find((post) => String(post.id) === String(id)), [supabasePosts, id])

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
  const shouldFetchFakejson = !supabasePost && !isNaN(numericId)

  const fakejsonQuery = useQuery({
    ...postByIdOptions(numericId),
    enabled: shouldFetchFakejson,
  })

  return {
    data: supabasePost || fakejsonQuery.data,
    isLoading: isLoadingSupabase || (shouldFetchFakejson && fakejsonQuery.isLoading),
    isError: shouldFetchFakejson && fakejsonQuery.isError,
    error: fakejsonQuery.error,
  }
}

export const usePostBySlug = (slug: string) => usePost(slug)

export const useSupabasePosts = () =>
  useQuery({
    queryKey: QUERY_KEYS.supabasePosts,
    queryFn: fetchSupabasePosts,
    staleTime: 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

export const usePosts = (filters: PostFilters = {}) => {
  const {
    data: fakejsonPosts = [],
    isLoading: isLoadingFakejson,
    isError: isErrorFakejson,
    error: errorFakejson,
  } = useQuery(postsListOptions())
  const {
    data: supabasePosts = [],
    isLoading: isLoadingSupabase,
    isError: isErrorSupabase,
    error: errorSupabase,
  } = useSupabasePosts()

  const data = useMemo(() => {
    const filteredSupabasePosts = filterPosts(supabasePosts, filters)
    const filteredFakejsonPosts = filterPosts(fakejsonPosts, filters)
    const allPosts = [...filteredSupabasePosts, ...filteredFakejsonPosts]

    return sortPosts(allPosts)
  }, [fakejsonPosts, supabasePosts, filters])

  return {
    data,
    isLoading: isLoadingFakejson || isLoadingSupabase,
    isError: isErrorFakejson || isErrorSupabase,
    error: errorFakejson || errorSupabase,
  }
}
