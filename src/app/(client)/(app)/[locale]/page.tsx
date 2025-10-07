import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postsQueryOptions } from '@/entities/api/posts'
import { HomeModule } from '@/modules/home'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    locale: string
  }>
}

// component
const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(postsQueryOptions())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default Page
