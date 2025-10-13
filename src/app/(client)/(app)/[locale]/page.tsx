import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { supabasePostsQueryOptions } from '@/entities/api/database'
import { postsQueryOptions } from '@/entities/api/posts'
import { IPost } from '@/entities/models'
import { HomeModule } from '@/modules/home'
import { getFeatureValue } from '@/pkg/integration/growthbook'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    locale: string
    post: IPost
  }>
}

// component
const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const isChangeText = await getFeatureValue<boolean>('my-feature_text', false)

  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(postsQueryOptions()),
    queryClient.prefetchQuery(supabasePostsQueryOptions()),
  ])

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule isChangeText={isChangeText} />
    </HydrationBoundary>
  )
}

export default Page
