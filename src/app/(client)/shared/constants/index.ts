export const POSTS_PER_PAGE = 6

export const CONFIRMATION_MESSAGES = {
  DELETE_USER_POST: 'Are you sure you want to delete this post?',
  REMOVE_FROM_SAVED: 'Are you sure you want to remove this post from saved posts?',
} as const

export const POST_SOURCES = {
  USER: 'user',
  FAKEJSON: 'fakejson',
} as const
