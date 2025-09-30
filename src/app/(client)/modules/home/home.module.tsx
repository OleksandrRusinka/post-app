import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { PostListModule } from '@/modules/post-list'
import { ContainerComponent } from '@/shared/ui/container'

// interface
interface IProps {}

// component
const HomeModule: FC<IProps> = () => {
  const t = useTranslations()

  // return
  return (
    <ContainerComponent className='py-8'>
      <div className='space-y-8'>
        <div className='space-y-4 text-center'>
          <h1 className='text-4xl font-bold text-gray-900'>{t('home_title')}</h1>

          <p className='mx-auto max-w-2xl text-lg text-gray-600'>{t('home_subtitle')}</p>
        </div>
        <PostListModule />
      </div>
    </ContainerComponent>
  )
}

export default HomeModule
