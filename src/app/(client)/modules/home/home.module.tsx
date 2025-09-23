'use client'

import { type FC } from 'react'

import { PostListModule } from '@/modules/post-list'
import { ContainerComponent } from '@/shared/ui'

// interface
interface IProps {}

// component
const HomeModule: FC<IProps> = () => {
  // return
  return (
    <ContainerComponent className='py-8'>
      <div className='space-y-8'>
        <div className='space-y-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900'>Blog Posts</h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>Discover our collection of articles and insights</p>
        </div>

        <PostListModule />
      </div>
    </ContainerComponent>
  )
}

export default HomeModule
