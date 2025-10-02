import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { Post } from '@/entities/models'

// interface
interface IStore {
  savedPosts: Post[]
  addSavedPost: (post: Post) => void
  updateSavedPost: (id: number | string, updates: Partial<Post>) => void
  removeSavedPost: (id: number | string) => void
  getSavedPost: (id: number | string) => Post | undefined
}

// store
export const usePostsStore = create<IStore>()(
  devtools(
    persist(
      (set, get) => ({
        savedPosts: [],

        addSavedPost: (post) =>
          set((state) => ({
            savedPosts: [post, ...state.savedPosts],
          })),

        updateSavedPost: (id, updates) =>
          set((state) => ({
            savedPosts: state.savedPosts.map((post) => (post.id === id ? { ...post, ...updates } : post)),
          })),

        removeSavedPost: (id) =>
          set((state) => ({
            savedPosts: state.savedPosts.filter((post) => post.id !== id),
          })),

        getSavedPost: (id) => get().savedPosts.find((post) => post.id === id),
      }),
      {
        name: 'posts-storage',
      },
    ),
    {
      name: 'posts-store',
    },
  ),
)
