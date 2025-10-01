import type { NextPage } from 'next'

import { NotFoundComponent } from '@/client/shared/ui/not-found'

import { ContainerComponent } from '../../shared/ui/container'

// component
const NotFound: NextPage = () => {
  // return
  return (
    <ContainerComponent>
      <NotFoundComponent />
    </ContainerComponent>
  )
}

export default NotFound
