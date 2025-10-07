import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { IPost } from '@/entities/models'

// interface
interface IStore {
  savedPosts: IPost[]
  addSavedPost: (post: IPost) => void
  updateSavedPost: (id: number | string, updates: Partial<IPost>) => void
  removeSavedPost: (id: number | string) => void
  getSavedPost: (id: number | string) => IPost | undefined
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
