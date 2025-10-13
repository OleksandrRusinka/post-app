import { queryOptions } from '@tanstack/react-query'

import { IPostByIdQueryParams } from '@/entities/models'

import { postByIdQueryApi, postsQueryApi } from './posts.api'

// posts FakeJson
export const postsQueryOptions = () => {
  return queryOptions({
    queryKey: ['posts', 'list'],
    queryFn: (params) => postsQueryApi(params),
  })
}

// post by id
export const postByIdQueryOptions = (queryParams: IPostByIdQueryParams) => {
  const { id } = queryParams

  return queryOptions({
    queryKey: ['posts', 'detail', id],
    queryFn: (params) => postByIdQueryApi(params, queryParams),
  })
}
