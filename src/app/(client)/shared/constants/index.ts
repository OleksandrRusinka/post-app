import { envClient } from '@/config/env'

export const POSTS_PER_PAGE = 6

export const API_BASE_URL = envClient.NEXT_PUBLIC_API_BASE_URL

export const CONFIRMATION_MESSAGES = {
  DELETE_USER_POST: 'Are you sure you want to delete this post?',
  REMOVE_FROM_SAVED: 'Are you sure you want to remove this post from saved posts?',
} as const

export const POST_SOURCES = {
  USER: 'user',
  FAKEJSON: 'fakejson',
} as const
