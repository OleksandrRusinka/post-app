import { IPost, IPostFilters } from '@/entities/models'

export const selectUserPosts = (savedPosts: IPost[]): IPost[] => savedPosts.filter((post) => post.source === 'user')

export const filterPosts = (posts: IPost[], filters: IPostFilters = {}): IPost[] => {
  let filteredPosts = [...posts]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase().trim()
    filteredPosts = filteredPosts.filter(
      (post) => post.title.toLowerCase().includes(searchLower) || post.body.toLowerCase().includes(searchLower),
    )
  }

  if (filters.source) {
    filteredPosts = filteredPosts.filter((post) => post.source === filters.source)
  }

  return filteredPosts
}

export const sortPosts = (posts: IPost[]): IPost[] => {
  return [...posts].sort((a, b) => {
    if (a.source === 'user' && b.source !== 'user') return -1
    if (a.source !== 'user' && b.source === 'user') return 1

    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return dateB - dateA
  })
}
