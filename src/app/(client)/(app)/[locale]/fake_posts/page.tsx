import { setRequestLocale } from 'next-intl/server'
import React, { FC } from 'react'

import PostListModule from '@/app/(client)/modules/post-list/post-list.module'

export const revalidate = 30

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const FakePostsPage: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  // return
  return <PostListModule />
}

export default FakePostsPage
