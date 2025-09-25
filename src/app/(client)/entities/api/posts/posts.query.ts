import { queryOptions, useQuery } from '@tanstack/react-query'

import { postsQueryApi } from './posts.api'

export const postsListOptions = () =>
  queryOptions({
    queryKey: ['posts', 'list'] as const,
    queryFn: (opt) => postsQueryApi.list(opt),
  })

export const postByIdOptions = (id: number) =>
  queryOptions({
    queryKey: ['posts', 'detail', id] as const,
    queryFn: (opt) => postsQueryApi.byId(opt, { id }),
    enabled: !!id && id > 0,
  })

export const postBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: ['posts', 'slug', slug] as const,
    queryFn: (opt) => postsQueryApi.bySlug(opt, { slug }),
    enabled: !!slug,
  })

export const usePostsQuery = () => {
  return useQuery(postsListOptions())
}

export const usePostQuery = (id: number) => {
  return useQuery(postByIdOptions(id))
}

export const usePostBySlugQuery = (slug: string) => {
  return useQuery(postBySlugOptions(slug))
}
