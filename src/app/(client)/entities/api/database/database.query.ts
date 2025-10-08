import { queryOptions } from '@tanstack/react-query'

import { supabasePostsQueryApi } from './database.api'

// supabase posts
export const supabasePostsQueryOptions = () => {
  return queryOptions({
    queryKey: ['supabase-posts'],
    queryFn: (params) => supabasePostsQueryApi(params),
  })
}
