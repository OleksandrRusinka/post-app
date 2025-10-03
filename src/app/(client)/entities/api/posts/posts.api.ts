import { notFound } from 'next/navigation'

import * as Sentry from '@sentry/nextjs'

import type { CreatePostDto, Post } from '@/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api/fetcher'

// interface
interface ISupabasePost {
  id: string
  created_at: string
  title: string
  body: string
}

export const fetchSupabasePosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('/api/supabase/posts', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
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
    Sentry.captureException(error, {
      extra: { context: 'fetchSupabasePosts' },
    })
    return []
  }
}

export const fetchPostsList = async (): Promise<Post[]> => {
  try {
    const data = await restApiFetcher.get('posts').json<Omit<Post, 'source'>[]>()
    return data.map((post) => ({
      ...post,
      source: 'fakejson' as const,
    }))
  } catch (error) {
    Sentry.captureException(error, {
      extra: { context: 'fetchPostsList' },
    })
    notFound()
  }
}

export const fetchPostById = async (id: number): Promise<Post> => {
  try {
    const data = await restApiFetcher.get(`posts/${id}`).json<Omit<Post, 'source'>>()
    return {
      ...data,
      source: 'fakejson' as const,
    }
  } catch (error) {
    Sentry.captureException(error, {
      extra: { context: 'fetchPostById', id },
    })
    notFound()
  }
}

export const createPost = async (data: CreatePostDto): Promise<Post> => {
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
    Sentry.captureException(error, {
      extra: { context: 'createPost', data },
    })
    throw error
  }
}

export const updatePost = async (params: { id: number | string; data: Partial<CreatePostDto> }): Promise<Post> => {
  try {
    const { id, data } = params
    const response = await fetch('/api/supabase/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...data }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    return {
      ...result.post,
      source: 'user' as const,
    }
  } catch (error) {
    Sentry.captureException(error, {
      extra: { context: 'updatePost', id: params.id, data: params.data },
    })
    throw error
  }
}

export const deletePost = async (params: { id: number | string }): Promise<void> => {
  try {
    const { id } = params
    const response = await fetch(`/api/supabase/posts?id=${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    Sentry.captureException(error, {
      extra: { context: 'deletePost', id: params.id },
    })
    throw error
  }
}
