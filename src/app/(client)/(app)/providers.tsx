'use client'

import { FC, ReactNode, useState } from 'react'

import { HeroUIProvider } from '@heroui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from '@/shared/lib/get-query-client'

// interface
interface IProps {
  children: ReactNode
}

// component
const Providers: FC<IProps> = (props) => {
  const { children } = props

  const [queryClient] = useState(() => getQueryClient())

  // return
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>{children}</HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
