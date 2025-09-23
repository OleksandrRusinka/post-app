import { notFound } from 'next/navigation'
import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postsQueryOptions } from '@/entities/api/posts'
import { PostDetailModule } from '@/modules/post-detail'
import { getQueryClient } from '@/shared/lib/get-query-client'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    slug: string
  }>
}

// component
const PostPage: FC<Readonly<IProps>> = async (props) => {
  const { params } = props
  const { slug } = await params
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery(postsQueryOptions.byId(slug))
  } catch {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModule postId={slug} />
    </HydrationBoundary>
  )
}

export async function generateStaticParams() {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    slug: (i + 1).toString(),
  }))

  return posts
}

export default PostPage
