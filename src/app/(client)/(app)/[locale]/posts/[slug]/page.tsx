import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postBySlugOptions } from '@/entities/api/posts'
import { PostDetailModule } from '@/modules/post-detail'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    slug: (i + 1).toString(),
  }))

  return posts
}

// component
const PostPage: FC<Readonly<IProps>> = async (props) => {
  const { params } = props
  const { slug } = await params
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(postBySlugOptions(slug))

  // return
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetailModule postId={slug} />
      </HydrationBoundary>
    </>
  )
}

export default PostPage
