import { Post, PostFilters } from '@/entities/models'

export const selectUserPosts = (savedPosts: Post[]): Post[] => savedPosts.filter((post) => post.source === 'user')

export const filterPosts = (posts: Post[], filters: PostFilters = {}): Post[] => {
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

export const sortPosts = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    if (a.id < 0 && b.id > 0) return -1
    if (a.id > 0 && b.id < 0) return 1
    return Math.abs(b.id) - Math.abs(a.id)
  })
}
