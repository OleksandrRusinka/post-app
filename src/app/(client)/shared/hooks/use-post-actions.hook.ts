'use client'

import { useRouter } from 'next/navigation'

import { useDeletePost } from '@/entities/api/posts'
import type { Post } from '@/entities/models'
import { CONFIRMATION_MESSAGES, POST_SOURCES } from '@/shared/constants'
import { usePostsStore } from '@/shared/store'

// hook
const usePostActions = () => {
  const router = useRouter()
  const deletePostMutation = useDeletePost()

  const savedPosts = usePostsStore((state) => state.savedPosts)
  const addSavedPost = usePostsStore((state) => state.addSavedPost)
  const removeSavedPost = usePostsStore((state) => state.removeSavedPost)

  const getPostType = (post: Post) => ({
    isUserPost: post.source === POST_SOURCES.USER || post.id < 0,
    isFakeJsonPost: post.source === POST_SOURCES.FAKEJSON || post.id > 0,
    isSaved: savedPosts.some((p) => p.id === post.id),
  })

  const handleToggleSave = (post: Post) => {
    const { isSaved } = getPostType(post)
    if (isSaved) {
      removeSavedPost(post.id)
    } else {
      addSavedPost(post)
    }
  }

  const handleDeletePost = async (post: Post, options?: { redirectTo?: string }) => {
    const { isFakeJsonPost } = getPostType(post)

    const confirmMessage = isFakeJsonPost
      ? CONFIRMATION_MESSAGES.REMOVE_FROM_SAVED
      : CONFIRMATION_MESSAGES.DELETE_USER_POST

    if (!window.confirm(confirmMessage)) return

    if (isFakeJsonPost) {
      removeSavedPost(post.id)
      if (options?.redirectTo) {
        router.push(options.redirectTo)
      }
    } else {
      await deletePostMutation.mutateAsync(post.id)
      if (options?.redirectTo) {
        router.push(options.redirectTo)
      }
    }
  }

  // return
  return {
    getPostType,
    handleToggleSave,
    handleDeletePost,
    deletePostMutation,
  }
}

export default usePostActions
