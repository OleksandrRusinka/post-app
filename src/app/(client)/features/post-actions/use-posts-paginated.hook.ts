import { useMemo } from 'react'

import { usePosts } from '@/entities/api/posts'
import type { IPost } from '@/entities/models'
import { IPostFilters } from '@/entities/models'

// interface
interface IProps extends IPostFilters {
  page?: number
  limit?: number
}

// hook
const usePostsPaginated = (filters: IProps) => {
  const { page = 1, limit = 6, ...otherFilters } = filters

  const { data: allPosts, isLoading, isError, error } = usePosts(otherFilters)

  const paginatedData = useMemo(() => {
    if (!allPosts) return { posts: [], totalCount: 0, totalPages: 0 }

    const uniquePosts = allPosts.filter(
      (post: IPost, index: number, arr: IPost[]) => arr.findIndex((p: IPost) => p.id === post.id) === index,
    )

    const totalCount = uniquePosts.length
    const totalPages = Math.ceil(totalCount / limit)

    const startIndex = (page - 1) * limit
    const posts = uniquePosts.slice(startIndex, startIndex + limit)

    return {
      posts,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }
  }, [allPosts, page, limit])

  // return
  return {
    data: paginatedData.posts,
    totalCount: paginatedData.totalCount,
    totalPages: paginatedData.totalPages,
    currentPage: paginatedData.currentPage,
    hasNextPage: paginatedData.hasNextPage,
    hasPreviousPage: paginatedData.hasPreviousPage,
    isLoading,
    isError,
    error,
  }
}

export default usePostsPaginated
