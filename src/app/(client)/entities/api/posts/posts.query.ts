import { queryOptions } from '@tanstack/react-query'

import { fetchPostById, fetchPostsList } from './posts.api'

export const postsListOptions = () =>
  queryOptions({
    queryKey: ['posts', 'list'] as const,
    queryFn: fetchPostsList,
  })

export const postByIdOptions = (id: string | number) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
  const isValidId = !isNaN(numericId) && numericId > 0

  return queryOptions({
    queryKey: ['posts', 'detail', id] as const,
    queryFn: () => fetchPostById(numericId),
    enabled: isValidId,
  })
}
