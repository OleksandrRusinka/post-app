import { type FC } from 'react'

import { ContainerComponent } from '@/shared/ui/container'

import AvailableTestsComponent from './elements/available-tests/available-tests.component'
import HowItWorksComponent from './elements/how-it-works/how-it-works'
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
      <HowItWorksComponent />
      <AvailableTestsComponent />
    </ContainerComponent>
  )
}

export default HomeModule
