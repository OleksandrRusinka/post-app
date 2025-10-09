import type { IPost } from '@/entities/models'

// interface
interface IProps {
  posts: IPost[]
  page?: number
  limit?: number
}

// hook
const usePostsPaginated = (props: IProps) => {
  const { posts, page = 1, limit = 6 } = props

  const uniquePosts = posts.filter(
    (post: IPost, index: number, arr: IPost[]) => arr.findIndex((p: IPost) => p.id === post.id) === index,
  )

  const totalCount = uniquePosts.length
  const totalPages = Math.ceil(totalCount / limit)

  const startIndex = (page - 1) * limit
  const paginatedPosts = uniquePosts.slice(startIndex, startIndex + limit)

  // return
  return {
    data: paginatedPosts,
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

export default usePostsPaginated
