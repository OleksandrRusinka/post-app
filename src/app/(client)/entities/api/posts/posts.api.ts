import ky from 'ky'

import type { CreatePostDto, Post } from '@/entities/models'

const api = ky.create({
  prefixUrl: 'https://jsonplaceholder.typicode.com',
})

const ENDPOINTS = {
  POSTS: 'posts',
  POST_BY_ID: (id: string | number) => `posts/${id}`,
} as const

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 30, tags: ['posts'] },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    return data.map((post: Post) => ({ ...post, source: 'fakejson' as const }))
  },

  getPostById: async (id: string | number): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 30, tags: ['posts', `post-${id}`] },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }

    const data = await response.json()
    return { ...data, source: 'fakejson' as const }
  },

  createPost: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post(ENDPOINTS.POSTS, { json: data }).json<Post>()
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

    const response = await api.put(ENDPOINTS.POST_BY_ID(id), { json: data }).json<Post>()
    return { ...response, source: 'fakejson' as const }
  },

  deletePost: async (id: number): Promise<void> => {
    if (id < 0) {
      return Promise.resolve()
    }

    await api.delete(ENDPOINTS.POST_BY_ID(id))
  },
}
