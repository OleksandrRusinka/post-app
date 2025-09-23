import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000, // 30 seconds - data considered fresh for 30s
          gcTime: 5 * 60 * 1000, // 5 minutes - cache garbage collection time
          refetchOnWindowFocus: false, // Don't refetch when window gets focus
          retry: 1, // Retry failed requests once
        },
        mutations: {
          retry: false, // Don't retry mutations automatically
        },
      },
    }),
)
