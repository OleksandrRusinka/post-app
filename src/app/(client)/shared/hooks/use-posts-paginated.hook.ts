import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { postsListOptions } from '@/entities/api/posts'
import { Post, PostFilters } from '@/entities/models'
import { usePostsStore } from '@/shared/store'
import { selectUserPosts, sortPosts } from '@/shared/utils'

// interface
interface IProps extends PostFilters {
  page?: number
  limit?: number
}

// hook
const usePostsPaginated = (filters: IProps) => {
  const store = usePostsStore()
  const query = useQuery(postsListOptions())

  const paginatedData = useMemo(() => {
    if (!query.data) return { posts: [], totalCount: 0, totalPages: 0 }

    const userPosts = selectUserPosts(store.savedPosts)

    const allPosts = [...userPosts, ...query.data]
    const sortedPosts = sortPosts(allPosts)

    const uniquePosts = sortedPosts.filter(
      (post: Post, index: number, arr: Post[]) => arr.findIndex((p: Post) => p.id === post.id) === index,
    )

    const totalCount = uniquePosts.length
    const page = filters.page || 1
    const limit = filters.limit || 6
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
  }, [query.data, store.savedPosts, filters])

  // return
  return {
    ...query,
    data: paginatedData.posts,
    totalCount: paginatedData.totalCount,
    totalPages: paginatedData.totalPages,
    currentPage: paginatedData.currentPage,
    hasNextPage: paginatedData.hasNextPage,
    hasPreviousPage: paginatedData.hasPreviousPage,
  }
}

export default usePostsPaginated
