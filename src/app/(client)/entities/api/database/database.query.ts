import { queryOptions } from '@tanstack/react-query'

import { IPostByIdQueryParams } from '@/entities/models'

import { supabasePostByIdQueryApi, supabasePostsQueryApi } from './database.api'

// supabase posts
export const supabasePostsQueryOptions = () => {
  return queryOptions({
    queryKey: ['supabase-posts'],
    queryFn: (params) => supabasePostsQueryApi(params),
  })
}

// supabase post by id
export const supabasePostByIdQueryOptions = (queryParams: IPostByIdQueryParams) => {
  const { id } = queryParams

  return queryOptions({
    queryKey: ['supabase-post', id],
    queryFn: (params) => supabasePostByIdQueryApi(params, queryParams),
  })
}
