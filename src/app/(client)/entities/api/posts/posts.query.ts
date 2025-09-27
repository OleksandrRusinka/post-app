import { queryOptions, useQuery } from '@tanstack/react-query'

import { fetchPostById, fetchPostBySlug, fetchPostsList } from './posts.api'

export const postsListOptions = () =>
  queryOptions({
    queryKey: ['posts', 'list'] as const,
    queryFn: (opt) => fetchPostsList(opt),
  })

export const postByIdOptions = (id: number) =>
  queryOptions({
    queryKey: ['posts', 'detail', id] as const,
    queryFn: (opt) => fetchPostById(opt, { id }),
    enabled: id > 0,
  })

export const postBySlugOptions = (slug: string) => {
  const numericId = parseInt(slug, 10)
  return queryOptions({
    queryKey: ['posts', 'detail', numericId] as const,
    queryFn: (opt) => fetchPostBySlug(opt, { slug }),
    enabled: !!slug && !isNaN(numericId),
  })
}

export const usePostsQuery = () => {
  return useQuery(postsListOptions())
}
