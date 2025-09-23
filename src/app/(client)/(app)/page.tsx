import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postsOptions } from '@/entities/api/posts'
import { HomeModule } from '@/modules/home'
import { getQueryClient } from '@/shared/lib/get-query-client'

export const revalidate = 30

// interface
interface IProps {}

// component
const Page: FC<Readonly<IProps>> = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(postsOptions.all())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default Page
