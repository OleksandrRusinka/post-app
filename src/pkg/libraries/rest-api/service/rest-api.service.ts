import { cache } from 'react'

import { keepPreviousData, QueryClient } from '@tanstack/react-query'

// get query client
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          gcTime: 5 * 60 * 1000,
          placeholderData: keepPreviousData,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    }),
)
