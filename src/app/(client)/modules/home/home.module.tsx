import { type FC } from 'react'

import { ContainerComponent } from '@/shared/ui/container'

import IntroComponent from './elements/intro-result/intro-result.component'

// interface
interface IProps {
  isChangeText: boolean
}

// component
const HomeModule: FC<IProps> = () => {
  // return
  return (
    <ContainerComponent className='max-w-full'>
      <IntroComponent />
    </ContainerComponent>
  )
}

export default HomeModule
