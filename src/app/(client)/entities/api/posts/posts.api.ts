import ky from 'ky'

import type { CreatePostDto, Post } from '@/entities/models'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const api = ky.create({
  prefixUrl: BASE_URL,
})

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/posts`, {
      next: { revalidate: 30, tags: ['posts'] },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    const data = await response.json()
    return data.map((post: Omit<Post, 'source'>) => ({
      ...post,
      source: 'fakejson' as const,
    }))
  },

  getPostById: async (id: string | number): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      next: { revalidate: 30, tags: ['posts', `post-${id}`] },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}: ${response.status}`)
    }

    const data = await response.json()
    return {
      ...data,
      source: 'fakejson' as const,
    }
  },

  createPost: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post('posts', { json: data }).json<Omit<Post, 'source'>>()
    return {
      ...response,
      source: 'user' as const,
      id: -Date.now(),
    }
  },

  updatePost: async (id: number, data: Partial<CreatePostDto>): Promise<Post> => {
    if (id < 0) {
      return {
        id,
        userId: data.userId || 1,
        title: data.title || '',
        body: data.body || '',
        source: 'user' as const,
      }
    }

    const response = await api.put(`posts/${id}`, { json: data }).json<Omit<Post, 'source'>>()
    return {
      ...response,
      source: 'fakejson' as const,
    }
  },

  deletePost: async (id: number): Promise<void> => {
    if (id < 0) return

    await api.delete(`posts/${id}`)
  },
}
