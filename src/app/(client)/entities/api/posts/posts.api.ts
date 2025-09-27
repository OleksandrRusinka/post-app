import { notFound } from 'next/navigation'

import type { QueryFunctionContext } from '@tanstack/react-query'

import type { CreatePostDto, Post } from '@/entities/models'
import { restApiFetcher } from '@/pkg/libraries/rest-api/fetcher'

export const fetchPostsList = async (opt: QueryFunctionContext): Promise<Post[]> => {
  try {
    const data = await restApiFetcher.get('posts').json<Omit<Post, 'source'>[]>()
    return data.map((post) => ({
      ...post,
      source: 'fakejson' as const,
    }))
  } catch {
    notFound()
  }
}

export const fetchPostById = async (opt: QueryFunctionContext, params: { id: number }): Promise<Post> => {
  try {
    const { id } = params
    const data = await restApiFetcher.get(`posts/${id}`).json<Omit<Post, 'source'>>()
    return {
      ...data,
      source: 'fakejson' as const,
    }
  } catch {
    notFound()
  }
}

export const fetchPostBySlug = async (opt: QueryFunctionContext, params: { slug: string }): Promise<Post> => {
  try {
    const { slug } = params
    const id = parseInt(slug, 10)
    if (isNaN(id)) {
      notFound()
    }
    const data = await restApiFetcher.get(`posts/${id}`).json<Omit<Post, 'source'>>()
    return {
      ...data,
      source: 'fakejson' as const,
    }
  } catch {
    notFound()
  }
}

export const createPost = async (data: CreatePostDto): Promise<Post> => {
  const response = await restApiFetcher.post('posts', { json: data }).json<Omit<Post, 'source'>>()
  return {
    ...response,
    source: 'user' as const,
    id: -Date.now(),
  }
}

export const updatePost = async (params: { id: number; data: Partial<CreatePostDto> }): Promise<Post> => {
  const { id, data } = params

  if (id < 0) {
    return {
      id,
      userId: data.userId || 1,
      title: data.title || '',
      body: data.body || '',
      source: 'user' as const,
    }
  }

  const response = await restApiFetcher.put(`posts/${id}`, { json: data }).json<Omit<Post, 'source'>>()
  return {
    ...response,
    source: 'fakejson' as const,
  }
}

export const deletePost = async (params: { id: number }): Promise<void> => {
  const { id } = params
  if (id < 0) return

  await restApiFetcher.delete(`posts/${id}`)
}
