import { notFound } from 'next/navigation'

import * as Sentry from '@sentry/nextjs'
import { QueryFunctionContext } from '@tanstack/react-query'

import type { ICreatePostDto, IPost, IPostByIdQueryParams, ISupabasePost, IUpdatePostDto } from '@/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api/fetcher'

// GET
export const supabasePostsQueryApi = async (opt: QueryFunctionContext): Promise<IPost[]> => {
  try {
    const data = await restApiFetcher
      .get('', {
        signal: opt.signal,
        cache: 'no-store',
        next: { revalidate: 30 },
      })
      .json<{ posts: ISupabasePost[] }>()

    return data.posts.map((post: ISupabasePost) => ({
      ...post,
      source: 'user' as const,
    }))
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'supabasePostsQueryApi')
      Sentry.captureException(error)
    })
    return notFound()
  }
}

// GET post by id
export const supabasePostByIdQueryApi = async (
  opt: QueryFunctionContext,
  queryParams: IPostByIdQueryParams,
): Promise<IPost> => {
  const { id } = queryParams

  try {
    const data = await restApiFetcher
      .get('', {
        signal: opt.signal,
        cache: 'no-store',
        next: { revalidate: 30 },
      })
      .json<{ posts: ISupabasePost[] }>()

    const post = data.posts.find((p) => p.id === String(id))

    if (!post) {
      throw new Error(`Post not found: id=${id}`)
    }

    return {
      ...post,
      source: 'user' as const,
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'supabasePostByIdQueryApi')
      Sentry.captureException(error)
    })
    return notFound()
  }
}

// POST
export const createPostMutationApi = async (data: ICreatePostDto): Promise<IPost> => {
  try {
    const result = await restApiFetcher
      .post('', {
        json: data,
      })
      .json<{ post: ISupabasePost }>()

    if (!result.post) {
      throw new Error('Post data is missing in the response')
    }

    return {
      ...result.post,
      source: 'user' as const,
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'createPostMutationApi')
      scope.setContext('data', { data })
      Sentry.captureException(error)
    })
    throw error
  }
}

// PUT
export const updatePostMutationApi = async (params: IUpdatePostDto): Promise<IPost> => {
  try {
    const { id, title, body } = params
    const result = await restApiFetcher
      .put('', {
        json: { id, title, body },
      })
      .json<{ post: ISupabasePost }>()

    if (!result.post) {
      throw new Error('Post data is missing')
    }

    return {
      ...result.post,
      source: 'user' as const,
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'updatePostMutationApi')
      scope.setContext('params', { id: params.id, title: params.title, body: params.body })
      Sentry.captureException(error)
    })
    throw error
  }
}

// DELETE
export const deletePostMutationApi = async (params: { id: number | string }): Promise<void> => {
  try {
    const { id } = params
    const result = await restApiFetcher
      .delete('', {
        searchParams: { id: String(id) },
      })
      .json<{ success: boolean }>()

    if (!result.success) {
      throw new Error('Failed to delete post')
    }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'deletePostMutationApi')
      scope.setContext('params', { id: params.id })
      Sentry.captureException(error)
    })
    throw error
  }
}
