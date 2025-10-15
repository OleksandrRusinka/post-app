import { type FC } from 'react'

import { ContainerComponent } from '@/shared/ui/container'

import AvailableTestsComponent from './elements/available-tests/available-tests.component'
import { BoostAbilitiesComponent } from './elements/boost-abilities'
import { CommunityComponent } from './elements/community'
import HowItWorksComponent from './elements/how-it-works/how-it-works'
import IntroComponent from './elements/intro-result/intro-result.component'
import { ExplorePlansComponent } from './elements/plan-pricing'
import TrustedByPeopleComponent from './elements/trusted-by-people/trusted-by-people.component'
import { WhatYouGetComponent } from './elements/what-you-get'

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
      <BoostAbilitiesComponent />
      <WhatYouGetComponent />
      <TrustedByPeopleComponent />
      <CommunityComponent />
      <ExplorePlansComponent />
    </ContainerComponent>
  )
}

export default HomeModule
