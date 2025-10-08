import * as Sentry from '@sentry/nextjs'
import { QueryFunctionContext } from '@tanstack/react-query'

import type { ICreatePostDto, IPost, ISupabasePost, IUpdatePostDto } from '@/entities/models'

// fetch supabase posts
export const supabasePostsQueryApi = async (opt: QueryFunctionContext): Promise<IPost[]> => {
  try {
    const response = await fetch('/api/supabase/posts', {
      signal: opt.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data.posts.map((post: ISupabasePost) => ({
      ...post,
      source: 'user' as const,
    }))
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('api', 'supabasePostsQueryApi')
      Sentry.captureException(error)
    })
    return []
  }
}

// create post
export const createPostMutationApi = async (data: ICreatePostDto): Promise<IPost> => {
  try {
    const response = await fetch('/api/supabase/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

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

// update post
export const updatePostMutationApi = async (params: IUpdatePostDto): Promise<IPost> => {
  try {
    const { id, title, body } = params
    const response = await fetch('/api/supabase/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, body }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

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

// delete post
export const deletePostMutationApi = async (params: { id: number | string }): Promise<void> => {
  try {
    const { id } = params
    const response = await fetch(`/api/supabase/posts?id=${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

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
