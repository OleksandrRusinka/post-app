import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { supabasePostByIdQueryOptions } from '@/entities/api/database'
import { postByIdQueryOptions } from '@/entities/api/posts'
import { PostDetailModule } from '@/modules/post-detail'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// generate static params
export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    slug: (i + 1).toString(),
  }))
}

// component
const PostPage: FC<Readonly<IProps>> = async (props) => {
  const { locale, slug } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(postByIdQueryOptions({ id: slug })),
    queryClient.prefetchQuery(supabasePostByIdQueryOptions({ id: slug })),
  ])

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModule postId={slug} />
    </HydrationBoundary>
  )
}

export default PostPage
