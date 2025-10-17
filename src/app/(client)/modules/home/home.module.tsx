import { type FC } from 'react'

import { ContainerComponent } from '@/shared/ui/container'

import { AvailableTestsComponent } from './elements/available-tests'
import { BoostAbilitiesComponent } from './elements/boost-abilities'
import { CommunityComponent } from './elements/community'
import { FaqsQuestionsComponent } from './elements/faqs-questions'
import { HowItWorksComponent } from './elements/how-it-works'
import { IntroResultComponent } from './elements/intro-result'
import { LatestResultsComponent } from './elements/latest-result'
import { PlanPricingComponent } from './elements/plan-pricing'
import { WhatYouGetComponent } from './elements/what-you-get'

// interface
interface IProps {
  isChangeText: boolean
}

// component
const HomeModule: FC<IProps> = () => {
  // return
  return (
    <ContainerComponent>
      <IntroResultComponent />

      <HowItWorksComponent />

      <AvailableTestsComponent />

      <BoostAbilitiesComponent />

      <WhatYouGetComponent />

      <CommunityComponent />

      <PlanPricingComponent />

      <FaqsQuestionsComponent />

      <LatestResultsComponent />
    </ContainerComponent>
  )
}

export default HomeModule
