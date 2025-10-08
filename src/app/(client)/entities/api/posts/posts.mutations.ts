import { useQuery } from '@tanstack/react-query'

import type { IPostFilters } from '@/entities/models'
import { filterPosts, sortPosts } from '@/shared/utils'

import { postByIdQueryOptions, postsQueryOptions } from './posts.query'

import { useSupabasePosts } from '../database'

// POST
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

// POSTS
export const usePosts = (filters: IPostFilters = {}) => {
  const supabaseQuery = useSupabasePosts()
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
