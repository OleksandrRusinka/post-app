import { queryOptions } from '@tanstack/react-query'

import { IPostByIdQueryParams } from '@/entities/models'

import { postByIdQueryApi, postsQueryApi, supabasePostsQueryApi } from './posts.api'

//supabase posts
export const supabasePostsQueryOptions = () => {
  return queryOptions({
    queryKey: ['supabase-posts'],
    queryFn: (params) => supabasePostsQueryApi(params),
  })
}

//posts list
export const postsQueryOptions = () => {
  return queryOptions({
    queryKey: ['posts', 'list'],
    queryFn: (params) => postsQueryApi(params),
  })
}

//post by id
export const postByIdQueryOptions = (queryParams: IPostByIdQueryParams) => {
  const { id } = queryParams
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
  const isValidId = !isNaN(numericId) && numericId > 0

  return queryOptions({
    queryKey: ['posts', 'detail', id],
    queryFn: (params) => postByIdQueryApi(params, queryParams),
    enabled: isValidId,
  })
}
