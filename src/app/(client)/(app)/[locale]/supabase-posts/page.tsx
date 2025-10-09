import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { supabasePostsQueryOptions } from '@/entities/api/database'
import { SupabasePostsModule } from '@/modules/supabase-posts'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    locale: string
  }>
}

// component
const SupabasePostsPage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(supabasePostsQueryOptions())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SupabasePostsModule />
    </HydrationBoundary>
  )
}

export default SupabasePostsPage
