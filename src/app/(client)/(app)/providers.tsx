'use client'

import { FC, ReactNode, useState } from 'react'

import { HeroUIProvider } from '@heroui/react'
import { QueryClientProvider } from '@tanstack/react-query'

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
    </QueryClientProvider>
  )
}

export default Providers
