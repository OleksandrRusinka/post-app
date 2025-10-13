import { useRouter } from 'next/navigation'

import { useDeletePost } from '@/entities/api/database'
import type { IPost } from '@/entities/models'
import { CONFIRMATION_MESSAGES, POST_SOURCES } from '@/shared/constants/common.constants'

// interface
interface IProps {}

// hook
const usePostActions = () => {
  const router = useRouter()

  const deletePostMutation = useDeletePost()

  const getPostType = (post: IPost) => ({
    isUserPost: post.source === POST_SOURCES.USER || (typeof post.id === 'number' && post.id < 0),
    isFakeJsonPost: post.source === POST_SOURCES.FAKEJSON || (typeof post.id === 'number' && post.id > 0),
  })

  const handleDeletePost = async (post: IPost, options?: { redirectTo?: string }) => {
    if (!window.confirm(CONFIRMATION_MESSAGES.DELETE_USER_POST)) return

    await deletePostMutation.mutateAsync(post.id)
    if (options?.redirectTo) {
      router.push(options.redirectTo)
    }
  }

  // return
  return {
    getPostType,
    handleDeletePost,
    deletePostMutation,
  }
}

export default usePostActions
