import { setRequestLocale } from 'next-intl/server'
import { type FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { postBySlugOptions } from '@/entities/api/posts'
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
  const posts = Array.from({ length: 10 }, (_, i) => ({
    slug: (i + 1).toString(),
  }))

  return posts
}

// component
const PostPage: FC<Readonly<IProps>> = async (props) => {
  const { locale, slug } = await props.params

  setRequestLocale(locale)

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
