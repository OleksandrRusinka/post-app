import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { SavedPostsModule } from '@/modules/saved-posts'

// interface
interface IProps {
  params: Promise<{
    locale: string
  }>
}

// component
const SavedPosts: FC<IProps> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  // return
  return <SavedPostsModule />
}

export default SavedPosts
