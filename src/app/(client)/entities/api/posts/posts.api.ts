import { notFound } from 'next/navigation'

import * as Sentry from '@sentry/nextjs'
import { QueryFunctionContext } from '@tanstack/react-query'

import type { IPost, IPostByIdQueryParams } from '@/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api/fetcher'

// fetch posts list
export const postsQueryApi = async (opt: QueryFunctionContext): Promise<IPost[]> => {
  try {
    const data = await restApiFetcher
      .get('posts', {
        signal: opt.signal,
      })
      .json<Omit<IPost, 'source'>[]>()

    if (!data) {
      throw new Error('Error occurred, posts not found')
    }

    return data.map((post) => ({
      ...post,
      source: 'fakejson' as const,
    }))
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'postsQueryApi')
      Sentry.captureException(error)
    })
    return notFound()
  }
}

// fetch post by id
export const postByIdQueryApi = async (
  opt: QueryFunctionContext,
  queryParams: IPostByIdQueryParams,
): Promise<IPost> => {
  const { id } = queryParams
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id

  try {
    const data = await restApiFetcher
      .get(`posts/${numericId}`, {
        signal: opt.signal,
      })
      .json<Omit<IPost, 'source'>>()

    if (!data) {
      throw new Error(`Post not found: id=${id}`)
    }

    return {
      ...data,
      source: 'fakejson' as const,
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'postByIdQueryApi')
      Sentry.captureException(error)
    })
    return notFound()
  }
}
