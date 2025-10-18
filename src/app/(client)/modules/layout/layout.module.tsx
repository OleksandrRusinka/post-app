import { type FC, type ReactNode } from 'react'

import { FooterComponent } from '@/widgets/footer'
import { HeaderComponent } from '@/widgets/header'

// interface
interface IProps {
  children: ReactNode
}

// component
const LayoutModule: FC<IProps> = (props) => {
  const { children } = props

  // return
  return (
    <>
      <HeaderComponent />

      <main className='flex-1 overflow-hidden'>{children}</main>

      <FooterComponent />
    </>
  )
}

export default LayoutModule
