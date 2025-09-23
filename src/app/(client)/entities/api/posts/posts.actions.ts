'use server'

import { revalidateTag } from 'next/cache'

import type { CreatePostDto, Post } from '@/entities/models'
import { postsApi } from './posts.api'

export async function createPostAction(data: CreatePostDto): Promise<Post> {
  try {
    const post = await postsApi.createPost(data)

    revalidateTag('posts')

    return post
  } catch (error) {
    throw new Error('Failed to create post')
  }
}

export async function updatePostAction(id: number, data: Partial<CreatePostDto>): Promise<Post> {
  try {
    const post = await postsApi.updatePost(id, data)

    revalidateTag('posts')
    revalidateTag(`post-${id}`)

    return post
  } catch (error) {
    throw new Error('Failed to update post')
  }
}

export async function deletePostAction(id: number): Promise<void> {
  try {
    await postsApi.deletePost(id)

    revalidateTag('posts')
  } catch (error) {
    throw new Error('Failed to delete post')
  }
}
