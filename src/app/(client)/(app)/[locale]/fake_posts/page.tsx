import { setRequestLocale } from 'next-intl/server'
import React, { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postsQueryOptions } from '@/entities/api/posts'
import PostListModule from '@/modules/post-list/post-list.module'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const FakePostsPage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(postsQueryOptions())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListModule />
    </HydrationBoundary>
  )
}

export default FakePostsPage
