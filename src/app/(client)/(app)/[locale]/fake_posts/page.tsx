import { setRequestLocale } from 'next-intl/server'
import React, { FC } from 'react'

import PostListModule from '@/app/(client)/modules/post-list/post-list.module'

// interface
interface IProps {
  params: Promise<{ locale: string }>
  isChangeText: boolean
}

// component
const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  const { isChangeText } = props

  setRequestLocale(locale)

  // return
  return <PostListModule isChangeText={isChangeText} />
}

export default Page
